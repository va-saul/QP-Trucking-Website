"use client";

import { useRef, useState } from "react";
import { INSURED_STATES } from "@/components/InsuranceCoverageMap";
import {
  INITIAL_RECORD_COUNTS,
  RECORD_FIELDS,
  RECORD_LIMITS,
  addRecordCount,
  collectRecords,
  mergeFmcsaFields,
  mergeFmcsaPolicies,
  pruneRecordValues,
  removeRecordAt,
  type FieldValues,
  type RecordCounts,
  type RecordKind,
  type TaggedFields,
} from "@/lib/insurance-intake";

type FieldDef = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  note?: string;
  example?: string;
};

type GroupDef = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  fields: FieldDef[];
};

type FmcsaSourceRow = {
  status: "ok" | "empty" | "error";
  rows?: number;
  via?: string;
  docketTried?: boolean;
  docketError?: string;
};

type FmcsaReport = {
  legalName: string;
  dotNumber: string;
  filled: number;
  sources: Record<string, FmcsaSourceRow>;
  insurance: { bipdOnFile?: string; bipdRequired?: string; cargoOnFile?: string; bondOnFile?: string };
  policies: { found: number; loaded: number; duplicates: number; overflow: number; omitted: number; skippedNote: string };
  priorFilings: { total: number; cancelled: number };
  authority: string;
  driverCount: number | null;
  powerUnitCount: number | null;
};

const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 3.5 * 1024 * 1024;
const ATTACHMENT_NAME = /\.(pdf|jpe?g|png)$/i;
const ATTACHMENT_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const formatBytes = (n: number) =>
  n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

const RECORD_NOUN: Record<RecordKind, string> = { driver: "Driver", vehicle: "Vehicle", policy: "Policy" };

/** Lookup outcome per category. Each row says what loaded and what still needs the applicant. */
function FmcsaReportPanel({ report }: { report: FmcsaReport }) {
  const src = (name: string) => report.sources[name];
  const ins = report.insurance;
  const p = report.policies;
  type Tone = "ok" | "warn" | "error" | "manual";
  const rows: Array<{ label: string; tone: Tone; text: string }> = [];

  rows.push({
    label: "Carrier & contact",
    tone: report.filled > 0 ? "ok" : "warn",
    text: report.filled > 0
      ? `${report.filled} field${report.filled === 1 ? "" : "s"} filled from FMCSA and Motus, each tagged FMCSA. Blank fields were not on record.`
      : "No new fields were available. Fields you already typed were kept.",
  });

  const carrierSrc = src("motusCarrier");
  if (!carrierSrc || carrierSrc.status === "error") {
    rows.push({ label: "Insurance on file", tone: "error", text: "Motus carrier data is unavailable. Retry the lookup or enter coverage manually." });
  } else if (carrierSrc.status === "empty") {
    rows.push({ label: "Insurance on file", tone: "warn", text: "No insurance-on-file record for this DOT. Confirm coverage with the applicant." });
  } else {
    rows.push({
      label: "Insurance on file",
      tone: "ok",
      text: `BI&PD ${ins.bipdOnFile || "not reported"}${ins.bipdRequired ? ` (required ${ins.bipdRequired})` : ""} · Cargo on file ${ins.cargoOnFile || "not reported"} · Bond on file ${ins.bondOnFile || "not reported"}.`,
    });
  }

  const insurSrc = src("motusInsur");
  if (!insurSrc || insurSrc.status === "error") {
    rows.push({ label: "Existing policies", tone: "error", text: "The Motus insurance source is unavailable, so no filings loaded. Retry the lookup or enter policies manually." });
  } else if (p.found === 0) {
    rows.push({
      label: "Existing policies",
      tone: "warn",
      text: `No current or pending insurance filings found for this DOT or MC docket${insurSrc.docketError ? ", and the MC docket retry failed, so the result may be incomplete" : ""}. Enter policies manually from the applicant's declarations.`,
    });
  } else if (p.loaded === 0) {
    rows.push({ label: "Existing policies", tone: "ok", text: `All ${p.found} current filing${p.found === 1 ? " is" : "s are"} already on policy cards.` });
  } else {
    rows.push({
      label: "Existing policies",
      tone: p.skippedNote ? "warn" : "ok",
      text: `${p.loaded} current filing${p.loaded === 1 ? "" : "s"} loaded as policy card${p.loaded === 1 ? "" : "s"}${p.duplicates ? `; ${p.duplicates} already on a card` : ""}.${p.overflow + p.omitted ? ` ${p.overflow + p.omitted} more filing${p.overflow + p.omitted === 1 ? "" : "s"} not shown (limit ${RECORD_LIMITS.policy} policy cards).` : ""} A filing shows carrier, policy number, limit and effective date only. Premium, agent and term dates come from the policy document.${p.skippedNote ? ` ${p.skippedNote}` : ""}`,
    });
  }

  const histSrc = src("motusInsHist");
  if (!histSrc || histSrc.status === "error") {
    rows.push({ label: "Prior insurance", tone: "error", text: "The prior-filings source is unavailable. Enter prior insurance manually." });
  } else if (histSrc.status === "empty") {
    rows.push({ label: "Prior insurance", tone: "ok", text: "No prior or cancelled filings on record." });
  } else {
    rows.push({
      label: "Prior insurance",
      tone: "ok",
      text: `${report.priorFilings.total} prior filing${report.priorFilings.total === 1 ? "" : "s"} on record, ${report.priorFilings.cancelled} cancelled. Filled into Section 05.`,
    });
  }

  const authSrc = src("motusAuthHist");
  if (!authSrc || authSrc.status === "error") {
    rows.push({ label: "Authority history", tone: "error", text: "The authority-history source is unavailable." });
  } else if (authSrc.status === "empty") {
    rows.push({ label: "Authority history", tone: "warn", text: "No operating-authority history found for this DOT or docket." });
  } else {
    rows.push({ label: "Authority history", tone: "ok", text: report.authority || "Authority history loaded." });
  }

  rows.push({
    label: "Drivers",
    tone: "manual",
    text: `Not in public FMCSA records; individual drivers are not published. ${report.driverCount != null ? `FMCSA reports ${report.driverCount} driver${report.driverCount === 1 ? "" : "s"} as a count only.` : "FMCSA reports no driver count."} Add one card per driver in Section 06.`,
  });
  rows.push({
    label: "Vehicles",
    tone: "manual",
    text: `Not in public FMCSA records; no VINs or unit details are published. ${report.powerUnitCount != null ? `FMCSA reports ${report.powerUnitCount} power unit${report.powerUnitCount === 1 ? "" : "s"} as a count only.` : ""} Add one card per vehicle in Section 07.`,
  });
  rows.push({
    label: "Declarations & fleet schedule",
    tone: "manual",
    text: "Optional upload in Section 08 for agent review. Nothing is read or parsed automatically.",
  });

  const TONE: Record<Tone, { label: string; className: string }> = {
    ok: { label: "Loaded", className: "bg-emerald-100 text-emerald-800" },
    warn: { label: "Check", className: "bg-amber-100 text-amber-800" },
    error: { label: "Unavailable", className: "bg-rose-100 text-rose-800" },
    manual: { label: "Manual entry", className: "bg-navy-900 text-white" },
  };

  return (
    <div className="mt-3 rounded-[0.8rem] border border-steel-200 bg-white p-3.5 sm:p-4">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-500">
        Lookup report — what loaded and what still needs you
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex gap-2.5 rounded-[0.6rem] border border-steel-200 bg-bone px-3 py-2.5 text-[0.8rem] leading-relaxed text-steel-700"
          >
            <span
              className={`mt-0.5 h-fit shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.56rem] font-bold uppercase tracking-wider ${TONE[row.tone].className}`}
            >
              {TONE[row.tone].label}
            </span>
            <span>
              <strong className="text-navy-900">{row.label}.</strong> {row.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InsuranceIntakeDetails() {
  const [formData, setFormData] = useState<Record<string, string>>({
    mailingCountry: "United States",
  });
  const latestFormData = useRef(formData);
  const [fmcsaTagged, setFmcsaTagged] = useState<Record<string, boolean>>({});
  const latestTagged = useRef<TaggedFields>({});
  const [recordCounts, setRecordCounts] = useState<RecordCounts>(INITIAL_RECORD_COUNTS);
  const latestCounts = useRef<RecordCounts>(INITIAL_RECORD_COUNTS);
  // Bumped on every add/remove so an in-flight lookup never places policies onto shifted cards.
  const recordsVersion = useRef(0);
  const [fmcsaLoading, setFmcsaLoading] = useState(false);
  const [fmcsaStatus, setFmcsaStatus] = useState<{
    type: "idle" | "success" | "error" | "info";
    message: string;
  }>({ type: "idle", message: "" });
  const [fmcsaReport, setFmcsaReport] = useState<FmcsaReport | null>(null);
  const [recordNotice, setRecordNotice] = useState<{ kind: RecordKind; text: string } | null>(null);

  const [mvrAuthorized, setMvrAuthorized] = useState(false);

  const [expandAll, setExpandAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");

  /** Single write path: keeps the ref (read by async work) and the rendered state in step. */
  const commit = (values: FieldValues, tagged: TaggedFields) => {
    latestFormData.current = values;
    latestTagged.current = tagged;
    setFormData(values);
    setFmcsaTagged(tagged);
  };

  const handleChange = (id: string, value: string) => {
    // An edited value is no longer the value verified by the lookup.
    commit({ ...latestFormData.current, [id]: value }, { ...latestTagged.current, [id]: false });
  };

  const addRecord = (kind: RecordKind) => {
    const before = latestCounts.current[kind];
    const after = addRecordCount(before, kind);
    if (after === before) {
      setRecordNotice({ kind, text: `Limit of ${RECORD_LIMITS[kind]} reached. For larger fleets, upload a schedule in Section 08 or call our desk.` });
      return;
    }
    setRecordNotice(null);
    latestCounts.current = { ...latestCounts.current, [kind]: after };
    recordsVersion.current++;
    setRecordCounts(latestCounts.current);
  };

  const removeRecord = (kind: RecordKind, index: number) => {
    const count = latestCounts.current[kind];
    const values = latestFormData.current;
    const hasEntries = RECORD_FIELDS[kind].some((f) => {
      const v = values[`${kind}_${index}_${f.key}`];
      return typeof v === "string" && v.trim() !== "";
    });
    if (hasEntries && !window.confirm(`Remove ${RECORD_NOUN[kind].toLowerCase()} ${index}? Its entered values will be deleted.`)) {
      return;
    }
    const result = removeRecordAt(values, latestTagged.current, kind, index, count);
    commit(result.values, result.tagged);
    setRecordNotice(null);
    latestCounts.current = { ...latestCounts.current, [kind]: result.count };
    recordsVersion.current++;
    setRecordCounts(latestCounts.current);
  };

  const handleFmcsaLookup = async () => {
    const cleanDot = (latestFormData.current["dotNumber"] || "").replace(/\D/g, "");

    if (!cleanDot) {
      setFmcsaStatus({
        type: "error",
        message: "Please enter a valid DOT number first.",
      });
      return;
    }

    const recordsAtStart = recordsVersion.current;
    setFmcsaLoading(true);
    setFmcsaStatus({ type: "idle", message: "" });
    setFmcsaReport(null);

    try {
      const res = await fetch(`/api/fmcsa?dot=${encodeURIComponent(cleanDot)}`);
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 503) {
          setFmcsaStatus({
            type: "info",
            message:
              "FMCSA auto-fill unavailable — service not configured. Every field remains fully editable manually.",
          });
        } else {
          setFmcsaStatus({
            type: "error",
            message:
              json.error || "FMCSA lookup failed. You can complete the form manually.",
          });
        }
        return;
      }

      // Ignore a result if the applicant changed the DOT while the request ran.
      if ((latestFormData.current.dotNumber || "").replace(/\D/g, "") !== cleanDot) {
        setFmcsaStatus({ type: "info", message: "DOT number changed during lookup. Look up the new number to pre-fill its details." });
        return;
      }

      if (json.ok && json.data) {
        const d = json.data;
        const src: Record<string, FmcsaSourceRow> = json.sources || {};

        // Scalar fields: fill only empty ones; anything the applicant typed stays.
        const scalar = mergeFmcsaFields(latestFormData.current, latestTagged.current, json.fields || {});
        let values = scalar.values;
        let tagged = scalar.tagged;

        let policyLoaded = 0;
        let policyStats = { found: Number(d.policyCount) || 0, loaded: 0, duplicates: 0, overflow: 0, skippedNote: "" };
        if (recordsVersion.current === recordsAtStart) {
          const merged = mergeFmcsaPolicies(values, tagged, latestCounts.current.policy, d.policies || []);
          values = merged.values;
          tagged = merged.tagged;
          policyLoaded = merged.loaded;
          policyStats = { ...policyStats, loaded: merged.loaded, duplicates: merged.duplicates, overflow: merged.overflow };
          if (merged.count !== latestCounts.current.policy) {
            latestCounts.current = { ...latestCounts.current, policy: merged.count };
            setRecordCounts(latestCounts.current);
          }
        } else {
          policyStats.skippedNote = "Policy cards changed during the lookup, so the FMCSA filings were not placed. Run the lookup again to load them.";
        }

        commit(values, tagged);

        const ins = d.insurance || {};
        const auth = d.authority || {};
        const report: FmcsaReport = {
          legalName: d.legalName || "",
          dotNumber: String(d.dotNumber || cleanDot),
          filled: scalar.filled.length,
          sources: src,
          insurance: {
            bipdOnFile: ins.bipdOnFile,
            bipdRequired: ins.bipdRequired,
            cargoOnFile: ins.cargoOnFile,
            bondOnFile: ins.bondOnFile,
          },
          policies: { ...policyStats, omitted: Number(d.policiesOmitted) || 0 },
          priorFilings: {
            total: Number(d.priorFilings?.total) || 0,
            cancelled: Number(d.priorFilings?.cancelled) || 0,
          },
          authority: auth.status
            ? `Authority ${auth.status}${auth.type ? ` (${auth.type})` : ""}${auth.reason ? ` — ${auth.reason}` : ""}${auth.date ? `, as of ${auth.date}` : ""}.`
            : "",
          driverCount: typeof d.driverCount === "number" ? d.driverCount : null,
          powerUnitCount: typeof d.powerUnitCount === "number" ? d.powerUnitCount : null,
        };
        setFmcsaReport(report);

        const docketNote = d.mcPending
          ? " The MC shown is an application docket, not granted authority."
          : "";
        const mailNote = d.mailUndeliverable
          ? " FMCSA marks the mailing address undeliverable — confirm it with the applicant."
          : "";
        setFmcsaStatus({
          type: "success",
          message: `FMCSA + Motus data loaded for ${d.legalName || "carrier"} (DOT #${d.dotNumber}). ${scalar.filled.length} field${scalar.filled.length === 1 ? "" : "s"} pre-filled and tagged "FMCSA"${policyLoaded ? ` and ${policyLoaded} insurance filing${policyLoaded === 1 ? "" : "s"} placed on policy cards` : ""}.${docketNote}${mailNote} Vehicles and drivers are not in public FMCSA records, so enter them manually. All fields remain editable.`,
        });
      }
    } catch {
      setFmcsaStatus({
        type: "info",
        message:
          "Could not reach FMCSA service. Please enter details manually.",
      });
    } finally {
      setFmcsaLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    const next = [...attachments, ...picked];
    const total = next.reduce((sum, f) => sum + f.size, 0);
    const problem =
      next.length > MAX_ATTACHMENTS ? `Attach no more than ${MAX_ATTACHMENTS} files.`
      : next.some((f) => !ATTACHMENT_NAME.test(f.name) || (f.type && !ATTACHMENT_TYPES.includes(f.type)))
        ? "Only PDF, JPG or PNG files can be attached."
      : next.some((f) => f.size > MAX_ATTACHMENT_BYTES) ? "Each file must be 2 MB or smaller."
      : total > MAX_TOTAL_ATTACHMENT_BYTES ? "Attached files total more than 3.5 MB. Remove a file or email it to us."
      : "";
    if (problem) {
      setAttachmentError(problem);
      return;
    }
    setAttachmentError("");
    setAttachments(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: "idle", message: "" });

    const firstName = (latestFormData.current["firstName"] || "").trim();
    const phone = (latestFormData.current["phone"] || "").trim();
    const email = (latestFormData.current["email"] || "").trim();

    if (!firstName || !phone || !email) {
      const missing: string[] = [];
      if (!firstName) missing.push("First name");
      if (!phone) missing.push("Phone");
      if (!email) missing.push("Email");

      setSubmitStatus({
        type: "error",
        message: `Please complete required fields in Section 01: ${missing.join(
          ", "
        )}.`,
      });

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        (contactSection as HTMLDetailsElement).open = true;
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const counts = latestCounts.current;
      const tagged = latestTagged.current;
      // Every card on screen is sent, in order. Blank cards are dropped, and so are stale values past the visible count.
      const values = pruneRecordValues(latestFormData.current, counts);
      const drivers = collectRecords(values, tagged, "driver", counts.driver);
      const vehicles = collectRecords(values, tagged, "vehicle", counts.vehicle);
      const existingPolicies = collectRecords(values, tagged, "policy", counts.policy);
      const lastName = values["lastName"] || "";

      const payload = {
        formType: "insurance-intake",
        name: [firstName, lastName].filter(Boolean).join(" ") || firstName,
        firstName,
        lastName,
        phone,
        email,
        dotNumber: values["dotNumber"] || "",
        driverCount: drivers.length,
        vehicleCount: vehicles.length,
        existingPolicyCount: existingPolicies.length,
        drivers,
        vehicles,
        existingPolicies,
        // Scalar fields still carrying an unedited FMCSA value (provenance for the CRM).
        fmcsaFilledFields: Object.keys(tagged).filter((k) => tagged[k] && (values[k] || "").trim() !== ""),
        formData: {
          ...values,
          mvrAuthorized,
        },
      };

      const withDocuments = attachments.length > 0;
      const res = withDocuments
        ? await fetch("/api/lead", {
            method: "POST",
            body: (() => {
              const form = new FormData();
              form.append("payload", JSON.stringify(payload));
              attachments.forEach((file) => form.append("files", file, file.name));
              return form;
            })(),
          })
        : await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const json = await res.json().catch(() => ({} as { ok?: boolean; error?: string }));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || `Server responded ${res.status}`);
      }

      setAttachments([]);
      setSubmitStatus({
        type: "success",
        message: `Intake submitted successfully!${withDocuments ? ` ${attachments.length} document${attachments.length === 1 ? " was" : "s were"} sent to our agents for manual review.` : ""} A licensed agent has received your information and will begin quoting your policy immediately. We will contact you at ${phone} or ${email}.`,
      });
    } catch (err: any) {
      setSubmitStatus({
        type: "error",
        message:
          err.message ||
          "Failed to submit intake. Please try again or call our insurance desk.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldInput = (field: FieldDef) => {
    const isTagged = fmcsaTagged[field.id];
    const isStateSelect =
      field.type === "state-select" ||
      field.id === "mailingState" ||
      field.id.endsWith("dlState") ||
      field.id.endsWith("_state");

    return (
      <div
        key={field.id}
        className="rounded-[0.85rem] border border-steel-200 bg-paper p-3.5 shadow-sm transition-all focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500"
      >
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={field.id}
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-steel-600"
          >
            {field.label}
            {field.required ? (
              <span className="ml-1.5 rounded-full bg-brand-500 px-1.5 py-0.5 text-[0.55rem] font-bold text-white">
                REQUIRED
              </span>
            ) : null}
          </label>
          {isTagged ? (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[0.58rem] font-bold tracking-wider text-emerald-800">
              FMCSA
            </span>
          ) : null}
        </div>

        {isStateSelect ? (
          <select
            id={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="mt-1.5 w-full cursor-pointer border-none bg-transparent p-0 font-display text-[0.92rem] font-semibold text-navy-900 focus:outline-none"
          >
            <option value="">Select state (44 insured states)</option>
            {INSURED_STATES.map((st) => (
              <option key={st.code} value={st.code}>
                {st.code} — {st.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.id}
            type={field.type || "text"}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || "— —"}
            className="mt-1.5 w-full border-none bg-transparent p-0 font-display text-[0.92rem] font-semibold text-navy-900 placeholder:text-steel-400 focus:outline-none"
          />
        )}

        {field.note ? (
          <p className="mt-1 text-[0.72rem] text-steel-500">{field.note}</p>
        ) : null}
      </div>
    );
  };

  // Section 01 fields (Field #1 is DOT Number with FMCSA lookup button, opt-in checkbox removed)
  const contactFields: FieldDef[] = [
    { id: "firstName", label: "First name", placeholder: "— —", required: true },
    { id: "lastName", label: "Last name", placeholder: "— —" },
    { id: "businessName", label: "Business Name", placeholder: "— —" },
    { id: "mcNumber", label: "MC Number", placeholder: "— —" },
    { id: "datePosted", label: "Date Posted", placeholder: "— —" },
    { id: "phone", label: "Phone", placeholder: "— —", required: true, type: "tel" },
    { id: "email", label: "Email", placeholder: "— —", required: true, type: "email" },
    { id: "contactSource", label: "Contact source", placeholder: "— —" },
    { id: "contactType", label: "Contact type", placeholder: "— —" },
    { id: "lead", label: "Lead", placeholder: "— —", required: true },
    { id: "secondOwnerFirstName", label: "2nd Owner First Name", placeholder: "— —" },
    { id: "secondOwnerLastName", label: "2nd Owner Last Name", placeholder: "— —" },
    { id: "typeOfContact", label: "Type of Contact", placeholder: "— —" },
  ];

  const newAuthorityFields: FieldDef[] = [
    {
      id: "bindCoverageDate",
      label: "Question 1 — When are you looking to Bind Coverage or when would you like policy to start?",
      placeholder: "— —",
    },
    {
      id: "receivedQuotesWithWho",
      label: "Question 2 — So I don't double quote you. Have you received any insurance quotes yet? With who?",
      placeholder: "— —",
    },
    {
      id: "downPaymentAvailable",
      label: "Question 3 — Insurance Down Payments are usually between $3000-$6000 do you have that available before that date?",
      placeholder: "— —",
    },
    { id: "companyRep", label: "Company Rep", placeholder: "— —" },
    { id: "referReason", label: "Refer Reason", placeholder: "— —" },
  ];

  const generalInfoFields: FieldDef[] = [
    { id: "generalBusinessName", label: "Business name", placeholder: "— —", required: true },
    { id: "relatedContacts", label: "2 related contacts", placeholder: "— —" },
    { id: "dateBusinessStarted", label: "Date Business Started", placeholder: "Sep 18, 2026", example: "Sep 18, 2026" },
    { id: "mailingStreet", label: "Mailing Address — Street address", placeholder: "— —" },
    { id: "mailingCity", label: "Mailing Address — City", placeholder: "— —" },
    { id: "mailingCountry", label: "Mailing Address — Country", placeholder: "United States" },
    { id: "mailingState", label: "Mailing Address — State", type: "state-select", placeholder: "— —" },
    { id: "mailingZip", label: "Mailing Address — Postal code", placeholder: "— —" },
    { id: "eldProvider", label: "Who is your ELD provider?", placeholder: "— —" },
    { id: "dob", label: "Date of birth", placeholder: "— —" },
    { id: "ein", label: "Company EIN", placeholder: "— —" },
    { id: "ownerDlNumber", label: "Owner's Driver License Number", placeholder: "— —" },
    { id: "ownerSsn", label: "Owner's Social Security Number", placeholder: "— —" },
    { id: "ownerMaritalStatus", label: "Owner Married Or Single?", placeholder: "— —" },
    { id: "ownerCdlClass", label: "Does Owner have class A, B, or C CDL", placeholder: "— —" },
    { id: "ownerCdlYears", label: "How long has owner had CDL?", placeholder: "— —" },
    { id: "ownerInvolvement", label: "If the owner does not drive — What is the owners involvement in this venture?", placeholder: "— —" },
    { id: "ownerExperienceYears", label: "How many years of experience does the owner have in trucking?", placeholder: "— —" },
    { id: "hazmat", label: "Do you haul Hazardous substances or materials?", placeholder: "— —" },
    { id: "commodities", label: "List Commodities", placeholder: "— —" },
    { id: "commodityPercentages", label: "% of loads for each Commodity", placeholder: "— —" },
    { id: "averageValue", label: "Average Value", placeholder: "— —" },
    { id: "maxValue", label: "Max Value", placeholder: "— —" },
    {
      id: "hiringPlans",
      label: "Does the applicant plan on hiring any additional owner/operators in the next 12 months? If yes, how many and who and how will they hire them?",
      placeholder: "— —",
    },
    { id: "secondOwnerDob", label: "2nd Owner DOB", placeholder: "— —" },
    { id: "secondOwnerSsn", label: "2nd Owner Social", placeholder: "— —" },
    { id: "businessStructure", label: "What is business Structure (LLC, Corporation, sole prop?)", placeholder: "— —" },
    { id: "dba", label: "Do you have a DBA?", placeholder: "— —" },
    { id: "businessDescription", label: "Describe Business", placeholder: "— —" },
    { id: "primaryBusiness", label: "Is this your primary business?", placeholder: "— —" },
    { id: "primaryBusinessExplanation", label: "If no, Explain", placeholder: "— —" },
    { id: "filedBankruptcy", label: "Have you ever filed bankruptcy?", placeholder: "— —" },
    { id: "hireVehicles", label: "Do you hire any vehicles?", placeholder: "— —" },
    { id: "hireVehiclesExplanation", label: "If Yes, Explain", placeholder: "— —" },
    { id: "insuredId", label: "Insured ID", placeholder: "— —" },
    { id: "grossReceipts", label: "Gross Receipts expected for this coming year?", placeholder: "— —" },
    { id: "multiStateOperation", label: "Do you operate in more than one state?", placeholder: "— —" },
    { id: "annualMileage", label: "Annual Mileage", placeholder: "— —" },
    { id: "totalPowerUnits", label: "Total Power Units", placeholder: "— —" },
  ];

  const operationFields: FieldDef[] = [
    { id: "carrierType", label: "Are you a common carrier or contract hauler?", placeholder: "— —" },
    { id: "regularRoute", label: "Do you operate over a regular route?", placeholder: "— —" },
    { id: "doubleTripleTrailers", label: "Do you pull Double or Triple Trailers?", placeholder: "— —" },
    { id: "brokerageAuthority", label: "Does the insured have brokerage authority?", placeholder: "— —" },
    { id: "rentLeaseToOthers", label: "Do you rent or lease your vehicles to others?", placeholder: "— —" },
    { id: "filingsRequired", label: "Filings Required (State/Federal)", placeholder: "— —" },
    { id: "rangeOfTransport", label: "Range of Transport (Interstate or Intrastate?)", placeholder: "— —" },
    { id: "estimatedMileage", label: "Estimated Total Annual Mileage?", placeholder: "— —" },
    { id: "timeZone", label: "Time zone", placeholder: "— —" },
    { id: "website", label: "Website", placeholder: "— —", required: true },
  ];

  const renewalFields: FieldDef[] = [
    { id: "currentPolicyEndDate", label: "When does the current policy End?", placeholder: "— —" },
    { id: "changedOperatingName", label: "Have you ever changed your operating name?", placeholder: "— —" },
    { id: "isSubsidiary", label: "Do you operate as a subsidiary of another company?", placeholder: "— —" },
    { id: "subsidiaryName", label: "If yes — Which subsidiary?", placeholder: "— —" },
    { id: "otherOperations", label: "Do you own or manage any other transportation operations that are not covered?", placeholder: "— —" },
    { id: "otherOperationsDetails", label: "If yes — Which operations?", placeholder: "— —" },
    { id: "leaseAuthority", label: "Do you lease your authority?", placeholder: "— —" },
    { id: "appointAgentsOrContractors", label: "Do you appoint agents or hire independent contractors to operate on your behalf?", placeholder: "— —" },
    { id: "authorityChangesPast3Years", label: "Have you purchased, sold or applied for authority over the past 3 years?", placeholder: "— —" },
    {
      id: "authorityWithdrawnOrProbation",
      label: "Have you ever lost or had authority withdrawn or have you been/are under probation by any regulatory authority (FHWA, PUC, etc.)?",
      placeholder: "— —",
    },
    { id: "interchangeAgreements", label: "Do you have agreements with other carriers for interchange of equipment or transportation of loads?", placeholder: "— —" },
    { id: "priorInsuranceCompany", label: "Have you ever had insurance under this business before? If so what company?", placeholder: "— —" },
    { id: "cancelledOrNonRenewed", label: "Has insured been cancelled or non-renewed? If yes, provide details", placeholder: "— —" },
    { id: "yearsPriorInsurance", label: "Years of Prior Insurance under this name?", placeholder: "— —" },
    { id: "unitsInsured", label: "# of units insured", placeholder: "— —" },
    { id: "priorAmountPaid", label: "Amount Paid", placeholder: "— —" },
    { id: "priorCoverType", label: "Cover Type", placeholder: "— —" },
    { id: "numberOfLosses", label: "# of losses", placeholder: "— —" },
  ];

  /** Repeatable record cards (drivers, vehicles, policies) with add and remove controls. */
  const renderRecords = (kind: RecordKind) => {
    const count = recordCounts[kind];
    const noun = RECORD_NOUN[kind];
    const fields = RECORD_FIELDS[kind];
    const notice = recordNotice?.kind === kind ? recordNotice.text : "";
    return (
      <div className="grid gap-4">
        {Array.from({ length: count }, (_, i) => i + 1).map((index) => {
          const autoFilled = fields.some((f) => fmcsaTagged[`${kind}_${index}_${f.key}`]);
          return (
            <div key={`${kind}-${index}`} className="rounded-[1rem] border border-steel-200 bg-bone p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[0.98rem] font-bold text-navy-900">
                    {noun} {index}
                  </span>
                  {autoFilled ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[0.58rem] font-bold tracking-wider text-emerald-800">
                      FMCSA filing
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => removeRecord(kind, index)}
                  className="rounded-full border border-steel-300 bg-white px-3.5 py-1.5 text-[0.8rem] font-semibold text-steel-700 transition hover:border-rose-400 hover:text-rose-700"
                >
                  Remove {noun.toLowerCase()} {index}
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {fields.map((f) =>
                  renderFieldInput({
                    id: `${kind}_${index}_${f.key}`,
                    label: `${f.label} — ${noun} ${index}`,
                    placeholder: "— —",
                    type: f.type,
                  })
                )}
              </div>
            </div>
          );
        })}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => addRecord(kind)}
            disabled={count >= RECORD_LIMITS[kind]}
            className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add {noun.toLowerCase()}
          </button>
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-steel-500">
            {count} of {RECORD_LIMITS[kind]} cards
          </span>
          {notice ? <span className="text-[0.82rem] font-semibold text-amber-800">{notice}</span> : null}
        </div>
      </div>
    );
  };

  const limitsNotice = (
    <div className="mb-6 rounded-[1rem] border border-steel-200 bg-white p-4 sm:p-5">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-500">
        What the FMCSA lookup can and cannot fill
      </p>
      <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[0.84rem] leading-relaxed text-steel-700">
        <li>
          <strong className="text-navy-900">Auto-filled:</strong> legal and DBA name, address, phone, MC docket, operating authority, cargo, BI&amp;PD / cargo / bond on file, current insurance filings and prior-insurance history.
        </li>
        <li>
          <strong className="text-navy-900">Not public:</strong> individual vehicles (VIN, year, make, model, values) and drivers (names, dates of birth, license numbers, MVR). FMCSA publishes totals only, so these are entered by hand in Sections 06 and 07.
        </li>
        <li>
          <strong className="text-navy-900">Not a declarations page:</strong> an FMCSA filing does not show premium, agent or term dates. Upload your declarations or fleet schedule in Section 08 for agent review.
        </li>
      </ul>
    </div>
  );

  return (
    <section
      id="intake-checklist"
      className="relative border-t border-steel-200 bg-bone py-12 sm:py-16 lg:py-20"
    >
      <div id="intake-form" className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-500">Below the quote form — complete intake</p>
          <h2 className="mt-3 font-display text-display-md text-navy-900">
            Every field we track to bind your policy right the first time
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-steel-700">
            Fill the quick quote above or complete this full intake form directly. Start with
            your <strong>DOT Number</strong> in Section 01 and click <strong>“Look up on FMCSA”</strong> to
            auto-fill verified carrier details. All state fields use our 44 insured states dropdown.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setExpandAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-5 py-2.5 text-[0.88rem] font-semibold text-white transition hover:bg-navy-800"
            >
              {expandAll ? "Collapse all sections" : "Expand all sections"}
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-full border border-steel-300 bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-navy-900 transition hover:border-navy-900"
            >
              Back to quote form
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M10 14L5 9l1.4-1.4L10 11.1l3.6-3.5L15 9z" fill="currentColor" />
              </svg>
            </a>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500">
              Editable CRM form · 44 insured state dropdowns · FMCSA pre-fill
            </span>
          </div>
        </div>

        {/* Quick jump chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            { id: "contact", label: "01 Contact & DOT" },
            { id: "new-authority-questions", label: "02 New Authority" },
            { id: "general-info", label: "03 General Info" },
            { id: "operation-info", label: "04 Operations" },
            { id: "renewal", label: "05 Renewal" },
            { id: "drivers", label: "06 Drivers" },
            { id: "vehicles", label: "07 Vehicles" },
            { id: "existing-policies", label: "08 Existing Policies" },
            { id: "mvr-auth", label: "09 MVR Authorization" },
          ].map((chip) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              className="rounded-full border border-steel-200 bg-white px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-steel-600 transition hover:border-brand-300 hover:text-brand-600"
            >
              {chip.label}
            </a>
          ))}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
          {/* Section 01: Contact */}
          <details
            id="contact"
            open={expandAll || true}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 01</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold leading-tight text-navy-900 sm:text-[1.28rem]">
                  Contact & FMCSA DOT Pre-fill
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Enter your DOT number and click Look up on FMCSA to auto-fill your verified business details.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              {/* Field 1: DOT Number + FMCSA Lookup Button */}
              <div className="mb-6 rounded-[1rem] border-2 border-brand-500/20 bg-brand-50/40 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label
                      htmlFor="dotNumber"
                      className="flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-navy-900"
                    >
                      Field #1 — USDOT Number
                      {fmcsaTagged["dotNumber"] ? (
                        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[0.58rem] font-bold text-white">
                          FMCSA VERIFIED
                        </span>
                      ) : null}
                    </label>
                    <input
                      id="dotNumber"
                      type="text"
                      value={formData["dotNumber"] || ""}
                      onChange={(e) => handleChange("dotNumber", e.target.value)}
                      placeholder="e.g. 1234567"
                      className="mt-1.5 w-full rounded-[0.7rem] border border-steel-300 bg-white px-3.5 py-2.5 font-display text-[1rem] font-bold text-navy-900 shadow-sm placeholder:text-steel-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleFmcsaLookup}
                    disabled={fmcsaLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-[0.7rem] bg-brand-600 px-5 py-2.5 text-[0.88rem] font-bold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
                  >
                    {fmcsaLoading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Looking up...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="9" r="6" />
                          <path d="M13.5 13.5L18 18" strokeLinecap="round" />
                        </svg>
                        Look up on FMCSA
                      </>
                    )}
                  </button>
                </div>

                {fmcsaStatus.message ? (
                  <div
                    className={`mt-3 rounded-[0.6rem] px-3.5 py-2 text-[0.82rem] leading-relaxed ${
                      fmcsaStatus.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : fmcsaStatus.type === "error"
                        ? "bg-rose-50 text-rose-800 border border-rose-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {fmcsaStatus.message}
                  </div>
                ) : null}
              </div>

              {fmcsaReport ? (
                <div className="mb-6">
                  <FmcsaReportPanel report={fmcsaReport} />
                </div>
              ) : null}
              {limitsNotice}

              {/* Remaining Section 01 fields */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {contactFields.map((f) => renderFieldInput(f))}
              </div>
            </div>
          </details>

          {/* Section 02: New Authority Questions */}
          <details
            id="new-authority-questions"
            open={expandAll || true}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 02</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold leading-tight text-navy-900 sm:text-[1.28rem]">
                  Insured Information Needed — New Authority Questions
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Three qualification questions every new authority is asked before we shop markets.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {newAuthorityFields.map((f) => renderFieldInput(f))}
              </div>
            </div>
          </details>

          {/* Section 03: General Info */}
          <details
            id="general-info"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 03</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold leading-tight text-navy-900 sm:text-[1.28rem]">
                  General Info
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Business, ownership and operating basics. Verified FMCSA fields are automatically tagged. State fields use 44 insured states.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {generalInfoFields.map((f) => renderFieldInput(f))}
              </div>
            </div>
          </details>

          {/* Section 04: Operation Info */}
          <details
            id="operation-info"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 04</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold leading-tight text-navy-900 sm:text-[1.28rem]">
                  Operation Information
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Operational scope, filings and carrier classification.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {operationFields.map((f) => renderFieldInput(f))}
              </div>
            </div>
          </details>

          {/* Section 05: Renewal */}
          <details
            id="renewal"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 05</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold leading-tight text-navy-900 sm:text-[1.28rem]">
                  Renewal Quote Business Information
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Only if you’re renewing or switching. New authorities skip to Drivers.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {renewalFields.map((f) => renderFieldInput(f))}
              </div>
            </div>
          </details>

          {/* Section 06: Drivers. Manual entry: FMCSA publishes a driver COUNT only. */}
          <details
            id="drivers"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 06</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">
                  Driver — Please list all Drivers including relisting owners
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  One card per driver. FMCSA public records do not list individual drivers, so this section is never auto-filled.
                </p>
                <span className="mt-3 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-amber-800">
                  Manual entry required
                </span>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="mb-4 rounded-[0.8rem] border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-amber-900">
                {fmcsaReport
                  ? fmcsaReport.driverCount != null
                    ? `FMCSA reports ${fmcsaReport.driverCount} driver${fmcsaReport.driverCount === 1 ? "" : "s"} for this carrier. That is a count only: names, license numbers, dates of birth and MVR details must be entered by hand.`
                    : "FMCSA does not report a driver count for this carrier. Enter each driver's details by hand."
                  : "Look up your DOT number to see FMCSA's driver count. Names, dates of birth and license numbers are not public, so enter them here."}
              </div>
              {renderRecords("driver")}
            </div>
          </details>

          {/* Section 07: Vehicles. Manual entry: no VIN or unit list is published. */}
          <details
            id="vehicles"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 07</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">
                  Vehicle
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  One card per tractor or trailer to insure. VIN, stated value and safety equipment affect premium. FMCSA publishes no VIN or unit list, so this section is never auto-filled.
                </p>
                <span className="mt-3 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-amber-800">
                  Manual entry required
                </span>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="mb-4 rounded-[0.8rem] border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-amber-900">
                {fmcsaReport?.powerUnitCount != null
                  ? `FMCSA reports ${fmcsaReport.powerUnitCount} power unit${fmcsaReport.powerUnitCount === 1 ? "" : "s"} as a count only. VINs, years, makes, models and values are not public, so enter each vehicle here. The unit count is filled in Section 03 and Section 05.`
                  : "VINs, years, makes, models and values are not in public FMCSA records. Enter each vehicle here after you look up your DOT number."}
              </div>
              {renderRecords("vehicle")}
            </div>
          </details>

          {/* Section 08: Existing Policies. FMCSA insurance filings load as cards; they are not declarations pages. */}
          <details
            id="existing-policies"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 08</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">
                  Existing Policies
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Current and pending insurance filings from FMCSA load here as cards. A filing shows the carrier, policy number, limit and effective date. It is not a declarations page, so premium, agent and term dates come from the policy document.
                </p>
                <span className="mt-3 inline-flex items-center rounded-full bg-steel-100 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-steel-700">
                  FMCSA filings + manual entry
                </span>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="mb-4 rounded-[0.8rem] border border-steel-200 bg-bone px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-steel-700">
                Cards marked <strong>FMCSA filing</strong> came from the public record and can be corrected. Anything you type is kept when the lookup runs again.
              </div>
              {renderRecords("policy")}

              {/* Optional documents: held in memory for this request, emailed to agents, never stored on the site. */}
              <div className="mt-6 rounded-[1rem] border border-dashed border-steel-300 bg-white p-4 sm:p-5">
                <p className="eyebrow text-brand-500">Optional — documents for agent review</p>
                <h4 className="mt-1 font-display text-[1rem] font-bold text-navy-900">
                  Upload your declarations page or fleet schedule
                </h4>
                <p className="mt-1.5 text-[0.84rem] leading-relaxed text-steel-600">
                  Agents review uploads by hand; nothing is read or parsed automatically. Files are emailed to our licensed agents and are not stored on this website. PDF, JPG or PNG · up to {MAX_ATTACHMENTS} files · 3.5 MB total.
                </p>
                <input
                  id="intake-documents"
                  type="file"
                  multiple
                  accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className="mt-3 block w-full text-[0.85rem] text-steel-700 file:mr-3 file:rounded-full file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-navy-800"
                />
                {attachments.length ? (
                  <ul className="mt-3 grid gap-2">
                    {attachments.map((file, i) => (
                      <li
                        key={`${file.name}-${i}`}
                        className="flex items-center justify-between gap-3 rounded-[0.6rem] border border-steel-200 bg-bone px-3 py-2 text-[0.82rem] text-steel-700"
                      >
                        <span className="min-w-0 truncate">
                          {file.name} <span className="text-steel-500">· {formatBytes(file.size)}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setAttachments((prev) => prev.filter((_, j) => j !== i))}
                          className="shrink-0 font-semibold text-steel-700 hover:text-rose-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {attachmentError ? (
                  <p className="mt-2 text-[0.82rem] font-semibold text-rose-700">{attachmentError}</p>
                ) : null}
              </div>
            </div>
          </details>

          {/* Section 09: MVR Authorization & Driver Records */}
          <details
            id="mvr-auth"
            open={expandAll || true}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 09</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">
                  MVR Authorization & Driver License Details
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  MVR authorization checkbox reveals driver license and hire details required for carrier underwriting.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              {/* Authorization Checkbox */}
              <div className="rounded-[0.95rem] border border-steel-200 bg-bone p-4 sm:p-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={mvrAuthorized}
                    onChange={(e) => setMvrAuthorized(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-steel-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="font-display text-[0.95rem] font-bold text-navy-900">
                      I authorize QP Trucking Insurance to request and pull Motor Vehicle Records (MVR) for listed drivers
                    </span>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-steel-600">
                      Checking this authorization unlocks the required driver license fields below so our licensed agents can shop multiple insurance markets without delays.
                    </p>
                  </div>
                </label>
              </div>

              {/* Revealed Driver License Fields */}
              {mvrAuthorized ? (
                <div className="mt-5 space-y-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-600 font-bold">
                    ✓ Driver License & Hire Details (Unlocked by Authorization)
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {renderFieldInput({
                      id: "mvr_driver_1_dl",
                      label: "Driver 1 — License Number",
                      placeholder: "— —",
                    })}
                    {renderFieldInput({
                      id: "mvr_driver_1_state",
                      label: "Driver 1 — License State",
                      type: "state-select",
                      placeholder: "— —",
                    })}
                    {renderFieldInput({
                      id: "mvr_driver_1_hireDate",
                      label: "Driver 1 — Date of Hire",
                      placeholder: "— —",
                    })}
                    {renderFieldInput({
                      id: "mvr_driver_1_dob",
                      label: "Driver 1 — Date of Birth",
                      placeholder: "— —",
                    })}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {renderFieldInput({
                      id: "mvr_driver_2_dl",
                      label: "Driver 2 — License Number",
                      placeholder: "— —",
                    })}
                    {renderFieldInput({
                      id: "mvr_driver_2_state",
                      label: "Driver 2 — License State",
                      type: "state-select",
                      placeholder: "— —",
                    })}
                    {renderFieldInput({
                      id: "mvr_driver_2_hireDate",
                      label: "Driver 2 — Date of Hire",
                      placeholder: "— —",
                    })}
                    {renderFieldInput({
                      id: "mvr_driver_2_dob",
                      label: "Driver 2 — Date of Birth",
                      placeholder: "— —",
                    })}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-[0.82rem] italic text-steel-500">
                  Check the authorization box above to reveal driver license entry fields.
                </p>
              )}
            </div>
          </details>

          {/* Form Submit & Status Card */}
          <div className="mt-6 rounded-[1.2rem] border border-steel-200 bg-white p-6 shadow-md sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-display text-[1.15rem] font-bold text-navy-900">
                  Ready to submit your complete insurance intake?
                </h4>
                <p className="mt-1 text-[0.88rem] text-steel-600">
                  Required: <strong>First name</strong>, <strong>Phone</strong>, and <strong>Email</strong> (Section 01). All other fields optional but expedite your quote.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-[0.95rem] font-bold text-white shadow-md transition hover:bg-brand-700 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting intake...
                  </>
                ) : (
                  <>
                    Submit insurance intake
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 10h12m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {submitStatus.message ? (
              <div
                className={`mt-4 rounded-[0.8rem] p-4 text-[0.9rem] leading-relaxed ${
                  submitStatus.type === "success"
                    ? "border border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border border-rose-300 bg-rose-50 text-rose-900"
                }`}
              >
                {submitStatus.message}
              </div>
            ) : null}
          </div>
        </form>

        {/* Footer help */}
        <div className="mt-8 rounded-[1.1rem] border border-steel-200 bg-navy-950 px-6 py-6 text-white sm:px-8 sm:py-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold-400">Don’t want to type it all?</p>
              <h3 className="mt-2 font-display text-[1.25rem] font-bold leading-tight sm:text-[1.4rem]">
                Send your DOT or declarations page — we’ll fill the rest
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">
                Our team pulls SAFER, FMCSA and prior-carrier data so you don’t re-type it. The intake above is what we verify back with you.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-[0.95rem] font-bold text-navy-900 transition hover:bg-steel-100"
              >
                Start with quick quote
              </a>
              <a
                href="tel:8337623464"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[0.95rem] font-bold text-white transition hover:bg-white/10"
              >
                Talk to an agent
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-400">
          Editable CRM order · FMCSA pre-fills empty fields only · Submits to QP licensed transportation agents via secure POST /api/lead
        </p>
      </div>
    </section>
  );
}
