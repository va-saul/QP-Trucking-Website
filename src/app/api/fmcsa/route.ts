import { NextResponse } from "next/server";

/**
 * DOT pre-fill lookup.
 *
 * Sources (all public FMCSA data):
 *  - QCMobile API (needs FMCSA_API_KEY): carrier record, cargo carried,
 *    MC docket number.
 *  - Motus open datasets on data.transportation.gov (no key):
 *    Motus Carrier (authority + BI&PD/cargo/bond on file),
 *    Motus Insur (current policies), Motus InsHist (prior/cancelled policies).
 *
 * Returns `fields`: a map of intake form field ids -> values. The client only
 * fills empty fields and tags them "FMCSA". Personal data (SSN, DOB, driver
 * license, MVR) is intentionally never looked up or returned.
 */

const QC_BASE = "https://mobile.fmcsa.dot.gov/qc/services";
const SOCRATA_BASE = "https://data.transportation.gov/resource";
const MOTUS_CARRIER = "inys-ebih"; // Motus Carrier - All With History
const MOTUS_INSUR = "c5y8-a4uz"; // Motus Insur - All With History
const MOTUS_INSHIST = "xe5s-wca7"; // Motus InsHist - All With History

const TIMEOUT_MS = 10000;
const POLICY_SLOTS = 5;

type Row = Record<string, any>;

function errorResponse(status: number, error: string, code: string) {
  return NextResponse.json({ ok: false, error, code }, { status });
}

/* ----------------------------- QCMobile helpers ----------------------------- */

async function qcFetch(path: string, apiKey: string) {
  return fetch(`${QC_BASE}${path}?webKey=${encodeURIComponent(apiKey)}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

/** Unwrap QCMobile list responses: `{content: [...]}`, `{content: {...}}` or a bare array. */
function listFrom(json: any): Row[] {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.content)) return json.content;
  if (json?.content && typeof json.content === "object") return [json.content];
  return [];
}

async function qcList(path: string, apiKey: string): Promise<Row[]> {
  const res = await qcFetch(path, apiKey);
  if (!res.ok) throw new Error(`QCMobile ${path} responded ${res.status}`);
  return listFrom(await res.json());
}

/* ------------------------------- Motus helpers ------------------------------ */

async function motusRows(dataset: string, dot: string): Promise<Row[]> {
  const url = `${SOCRATA_BASE}/${dataset}.json?usdot_number=${encodeURIComponent(
    dot
  )}&$limit=500`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Motus ${dataset} responded ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

/* ------------------------------ value helpers ------------------------------- */

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v).trim());

function yesNo(v: unknown): string | undefined {
  if (v === true) return "Yes";
  if (v === false) return "No";
  const s = str(v);
  if (/^(y|yes|true)$/i.test(s)) return "Yes";
  if (/^(n|no|false)$/i.test(s)) return "No";
  return undefined;
}

const isActiveStatus = (v: unknown) => /^active$/i.test(str(v));

function usd(thousands: unknown): string {
  const n = Number(thousands);
  if (!n || Number.isNaN(n)) return "";
  return `$${(n * 1000).toLocaleString("en-US")}`;
}

/** Motus/Socrata dates are text; ISO dates are shown as MM/DD/YYYY to match the form. */
function fmtDate(s: unknown): string {
  const v = str(s);
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  return iso ? `${iso[2]}/${iso[3]}/${iso[1]}` : v;
}

function parseDate(s: unknown): Date | null {
  const v = str(s);
  if (!v) return null;
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  const d = iso ? new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])) : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

const uniq = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

const LOB_BY_TYPE: Record<string, string> = {
  "1": "BI&PD",
  "2": "Cargo",
  "3": "Bond",
  "4": "Trust fund",
};
const LOB_CLASS: Record<string, string> = { P: "Primary", E: "Excess" };

/* ---------------------------------- GET ------------------------------------ */

export async function GET(request: Request) {
  // Trim: a key pasted into Vercel with a trailing space/newline is rejected upstream.
  const apiKey = process.env.FMCSA_API_KEY?.trim();

  if (!apiKey) {
    return errorResponse(503, "FMCSA API key not configured", "not_configured");
  }

  const { searchParams } = new URL(request.url);
  const dotParam = searchParams.get("dot");
  if (!dotParam) {
    return errorResponse(400, "DOT number is required", "missing_dot");
  }

  const dot = dotParam.replace(/\D/g, "");
  if (!dot) {
    return errorResponse(400, "Invalid DOT number", "invalid_dot");
  }

  try {
    /* 1. Core carrier record (required). */
    const carrierRes = await qcFetch(`/carriers/${encodeURIComponent(dot)}`, apiKey);

    if (!carrierRes.ok) {
      console.error(`[fmcsa] QCMobile responded ${carrierRes.status} for DOT ${dot}`);
      if (carrierRes.status === 401 || carrierRes.status === 403) {
        return errorResponse(
          502,
          "FMCSA rejected the web key. Check that FMCSA_API_KEY in Vercel is the exact WebKey from the FMCSA QCMobile developer portal, then redeploy.",
          "invalid_key"
        );
      }
      if (carrierRes.status === 404) {
        return errorResponse(404, "Carrier not found for this DOT number", "not_found");
      }
      return errorResponse(
        502,
        `FMCSA upstream responded with status ${carrierRes.status}`,
        "upstream_error"
      );
    }

    const json = await carrierRes.json();
    const carrier: Row | undefined = json?.content?.carrier ?? json?.carrier ?? json;

    if (!carrier || (!carrier.dotNumber && !carrier.legalName)) {
      return errorResponse(404, "Carrier not found for this DOT number", "not_found");
    }

    /* 2. Supplemental sources. Each one is optional: a failure only drops its fields. */
    const [cargoR, docketR, carrierMotusR, insurMotusR, histMotusR] =
      await Promise.allSettled([
        qcList(`/carriers/${dot}/cargo-carried`, apiKey),
        qcList(`/carriers/${dot}/docket-numbers`, apiKey),
        motusRows(MOTUS_CARRIER, dot),
        motusRows(MOTUS_INSUR, dot),
        motusRows(MOTUS_INSHIST, dot),
      ]);

    const settle = <T,>(r: PromiseSettledResult<T[]>): T[] => {
      if (r.status === "fulfilled") return r.value;
      console.warn("[fmcsa] supplemental source unavailable:", r.reason?.message ?? r.reason);
      return [];
    };

    const cargoRows = settle(cargoR);
    const docketRows = settle(docketR);
    const carrierMotus = settle(carrierMotusR);
    const insurMotus = settle(insurMotusR);
    const histMotus = settle(histMotusR);

    /* 3. Derive values. */
    const legalName = str(carrier.legalName);
    const dbaName = str(carrier.dbaName) || str(carrierMotus.find((r) => r.dba_name)?.dba_name);

    const docket = docketRows
      .map((d) => d?.docket ?? d)
      .find((d) => str(d?.prefix).toUpperCase() === "MC");
    const mc = docket
      ? `MC${str(docket.docketNumber)}`
      : str(carrier.docketNumber || carrier.mcNumber);

    const cargo = uniq(
      cargoRows.map((c) => str(c?.cargoClassDesc ?? c?.cargoClass?.cargoClassDesc))
    );

    const carrierOperation = str(
      carrier.carrierOperation?.carrierOperationDesc ?? carrier.carrierOperation
    );
    const isInterstate = /interstate/i.test(carrierOperation) && !/intrastate/i.test(carrierOperation);
    const isIntrastate = /intrastate/i.test(carrierOperation);

    const common = isActiveStatus(carrier.commonAuthorityStatus);
    const contract = isActiveStatus(carrier.contractAuthorityStatus);
    const carrierType = common && contract
      ? "Common & contract carrier"
      : common
      ? "Common carrier"
      : contract
      ? "Contract hauler"
      : "";

    const brokerStatus = str(carrier.brokerAuthorityStatus);
    const brokerage = brokerStatus ? (isActiveStatus(brokerStatus) ? "Yes" : "No") : "";

    const einDigits = str(carrier.ein).replace(/\D/g, "");
    const ein = einDigits && Number(einDigits) > 0 ? einDigits.padStart(9, "0") : "";

    const hazmat = yesNo(carrier.hazmat ?? carrier.hmFlag);
    const mileage = str(carrier.carrierMileage || carrier.mcs150Mileage);
    const powerUnits = Number(carrier.totalPowerUnits) > 0 ? String(carrier.totalPowerUnits) : "";

    // Motus carrier row: amounts on file (thousands of dollars) and authority status.
    const motusBipd = Math.max(0, ...carrierMotus.map((r) => Number(r.bipd_file) || 0));
    const motusMinBipd = Math.max(0, ...carrierMotus.map((r) => Number(r.min_cov_amount) || 0));
    const cargoOnFile =
      yesNo(carrierMotus.find((r) => yesNo(r.cargo_file) === "Yes")?.cargo_file) ??
      yesNo(carrier.cargoInsuranceOnFile);
    const bondOnFile =
      yesNo(carrierMotus.find((r) => yesNo(r.bond_file) === "Yes")?.bond_file) ??
      yesNo(carrier.bondInsuranceOnFile);
    const bipdOnFile = motusBipd ? usd(motusBipd) : yesNo(carrier.bipdInsuranceOnFile) ?? "";
    const bipdRequired = motusMinBipd ? usd(motusMinBipd) : str(carrier.bipdRequiredAmount);

    // Current policies (Motus Insur): one row per filing, BI&PD primary first.
    const seenPolicies = new Set<string>();
    const policies = insurMotus
      .filter((r) => {
        const key = `${str(r.policy_no)}|${str(r.ins_type_code)}`;
        if (!str(r.policy_no) || seenPolicies.has(key)) return false;
        seenPolicies.add(key);
        return true;
      })
      .sort((a, b) => Number(a.ins_type_code || 9) - Number(b.ins_type_code || 9))
      .slice(0, POLICY_SLOTS)
      .map((r) => ({
        number: str(r.policy_no),
        carrier: str(r.insurance_company_name),
        lob: LOB_BY_TYPE[str(r.ins_type_code)] ?? "",
        lobClass: LOB_CLASS[str(r.ins_class_code)] ?? "",
        effectiveDate: fmtDate(r.effective_date),
      }));

    // Prior and cancelled policies (Motus InsHist).
    const priorCompanies = uniq([
      ...histMotus.map((r) => str(r.insurance_company_name)),
      ...insurMotus.map((r) => str(r.insurance_company_name)),
    ]);
    const cancelled = histMotus.filter((r) => /cancel/i.test(str(r.filing_status_reason)));
    const cancelledText = cancelled.length
      ? `Yes — cancelled${cancelled
          .map((r) => (r.cancl_effective_date ? ` ${fmtDate(r.cancl_effective_date)}` : ""))
          .join(",")}`
      : histMotus.length
      ? "No"
      : "";
    const priorTypes = uniq(histMotus.map((r) => str(r.ins_type_desc)));
    const earliest = [...histMotus, ...insurMotus]
      .map((r) => parseDate(r.effective_date))
      .filter((d): d is Date => d !== null)
      .sort((a, b) => a.getTime() - b.getTime())[0];
    const yearsPrior = earliest
      ? String(Math.floor((Date.now() - earliest.getTime()) / (365.25 * 24 * 3600 * 1000)))
      : "";

    /* 4. Form field map (ids match InsuranceIntakeDetails.tsx). */
    const fields: Record<string, string> = {};
    const set = (id: string, value: unknown) => {
      const v = str(value);
      if (v) fields[id] = v;
    };

    // Section 01 - Contact
    set("businessName", legalName);
    set("mcNumber", mc);
    set("phone", carrier.telephone);

    // Section 03 - General info
    set("generalBusinessName", legalName);
    set("dba", dbaName);
    set("ein", ein);
    set("mailingStreet", carrier.mailingStreet || carrier.phyStreet);
    set("mailingCity", carrier.mailingCity || carrier.phyCity);
    set("mailingState", str(carrier.mailingState || carrier.phyState).toUpperCase());
    set("mailingZip", carrier.mailingZipcode || carrier.mailingZip || carrier.phyZip || carrier.phyZipcode);
    set("commodities", cargo.join(", "));
    set("hazmat", hazmat);
    set("multiStateOperation", isInterstate ? "Yes" : isIntrastate ? "No" : "");
    set("totalPowerUnits", powerUnits);

    // Section 04 - Operation
    set("carrierType", carrierType);
    set("brokerageAuthority", brokerage);
    set("rangeOfTransport", isInterstate ? "Interstate" : isIntrastate ? "Intrastate" : "");
    set("estimatedMileage", mileage);

    // Section 05 - Renewal / prior insurance
    set("unitsInsured", powerUnits);
    set("annualMileage", mileage);
    set("priorInsuranceCompany", priorCompanies.join(", "));
    set("cancelledOrNonRenewed", cancelledText);
    set("yearsPriorInsurance", yearsPrior);
    set("priorCoverType", priorTypes.join(", "));

    // Section 08 - Existing policies
    policies.forEach((p, i) => {
      const n = i + 1;
      set(`policy_${n}_number`, p.number);
      set(`policy_${n}_carrier`, p.carrier);
      set(`policy_${n}_lob`, p.lob);
      set(`policy_${n}_lobClass`, p.lobClass);
      set(`policy_${n}_effectiveDate`, p.effectiveDate);
    });

    const data = {
      dotNumber: String(carrier.dotNumber || dot),
      legalName,
      dba: dbaName,
      mc,
      street: str(carrier.phyStreet),
      city: str(carrier.phyCity),
      state: str(carrier.phyState).toUpperCase(),
      zip: str(carrier.phyZip || carrier.phyZipcode),
      phone: str(carrier.telephone),
      commodities: cargo.join(", "),
      hazmat: hazmat ?? "",
      mileage,
      powerUnits,
      authorityStatus: str(carrier.statusCode),
      insurance: {
        bipdOnFile,
        bipdRequired,
        cargoOnFile: cargoOnFile ?? "",
        bondOnFile: bondOnFile ?? "",
      },
      policyCount: policies.length,
    };

    return NextResponse.json({ ok: true, data, fields });
  } catch (err: any) {
    console.error("[fmcsa] lookup error:", err);
    return errorResponse(
      502,
      "Failed to connect to FMCSA service",
      "upstream_failure"
    );
  }
}
