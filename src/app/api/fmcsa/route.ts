import { NextResponse } from "next/server";

type FmcsaObject = Record<string, unknown>;

function asObject(value: unknown): FmcsaObject | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as FmcsaObject)
    : null;
}

function firstValue(...values: unknown[]): unknown {
  return values.find((value) => value !== null && value !== undefined && value !== "");
}

function asText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  return "";
}

function unwrapCarrier(response: unknown): FmcsaObject | null {
  const root = asObject(response);
  if (!root) return null;

  const content = root.content;
  if (Array.isArray(content)) {
    const firstEntry = asObject(content[0]);
    return asObject(firstEntry?.carrier) ?? firstEntry;
  }

  const contentObject = asObject(content);
  return asObject(contentObject?.carrier) ?? contentObject ?? asObject(root.carrier) ?? root;
}

function formatCommodities(value: unknown): string {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        const object = asObject(item);
        return asText(firstValue(object?.cargoName, object?.desc, object?.commodity));
      })
      .filter(Boolean)
      .join(", ");
  }
  return typeof value === "string" ? value : "";
}

function isYes(value: unknown): boolean {
  return value === true || ["y", "yes", "true", "1"].includes(asText(value).toLowerCase());
}

export async function GET(request: Request) {
  const apiKey = process.env.FMCSA_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "FMCSA API key not configured",
        code: "not_configured",
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const dotDigits = (searchParams.get("dot") || "").replace(/\D/g, "");
  if (!dotDigits) {
    return NextResponse.json(
      {
        ok: false,
        error: "DOT number is required",
        code: "missing_dot",
      },
      { status: 400 }
    );
  }
  if (dotDigits.length > 8) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid USDOT number (up to 8 digits)", code: "invalid_dot" },
      { status: 400 }
    );
  }

  try {
    const fmcsaUrl = new URL(
      `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(dotDigits)}`
    );
    fmcsaUrl.searchParams.set("webKey", apiKey);

    const response = await fetch(fmcsaUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status === 404) {
      return NextResponse.json(
        { ok: false, error: "Carrier not found for this DOT number", code: "not_found" },
        { status: 404 }
      );
    }
    if (response.status === 401 || response.status === 403) {
      return NextResponse.json(
        {
          ok: false,
          error: "FMCSA rejected the API key. Check the FMCSA_API_KEY value in Vercel.",
          code: "invalid_api_key",
        },
        { status: 502 }
      );
    }
    if (response.status === 429) {
      return NextResponse.json(
        { ok: false, error: "FMCSA lookup is temporarily rate-limited. Please try again shortly.", code: "rate_limited" },
        { status: 503 }
      );
    }
    if (!response.ok) {
      console.error(`[fmcsa] upstream responded with status ${response.status}`);
      return NextResponse.json(
        { ok: false, error: "FMCSA lookup is temporarily unavailable", code: "upstream_error" },
        { status: 502 }
      );
    }

    const json: unknown = await response.json();
    const carrier = unwrapCarrier(json);
    if (!carrier || (!carrier.dotNumber && !carrier.legalName)) {
      return NextResponse.json(
        { ok: false, error: "Carrier not found for this DOT number", code: "not_found" },
        { status: 404 }
      );
    }

    const jsonObject = asObject(json);
    const firstContent = Array.isArray(jsonObject?.content)
      ? asObject(jsonObject.content[0])
      : asObject(jsonObject?.content);
    const cargoData = firstValue(
      carrier.cargoCarried,
      carrier.cargoCarriedList,
      firstContent?.cargoCarried,
      jsonObject?.cargoCarried
    );

    const data = {
      dotNumber: asText(firstValue(carrier.dotNumber, carrier.usDot, dotDigits)),
      legalName: asText(firstValue(carrier.legalName, carrier.name)),
      dba: asText(firstValue(carrier.dbaName, carrier.dba)),
      mc: asText(firstValue(carrier.docketNumber, carrier.mcNumber, carrier.mc)),
      street: asText(
        firstValue(carrier.phyStreet, carrier.physicalStreet, carrier.mailingStreet)
      ),
      city: asText(firstValue(carrier.phyCity, carrier.physicalCity, carrier.mailingCity)),
      state: asText(firstValue(carrier.phyState, carrier.physicalState, carrier.mailingState)).toUpperCase(),
      zip: asText(
        firstValue(carrier.phyZip, carrier.phyZipcode, carrier.physicalZip, carrier.mailingZip)
      ),
      phone: asText(firstValue(carrier.telephone, carrier.phone)),
      commodities: formatCommodities(cargoData),
      hazmat: isYes(firstValue(carrier.hmFlag, carrier.hazmat)) ? "Yes" : "No",
      mileage: asText(firstValue(carrier.carrierMileage, carrier.mcs150Mileage)),
      powerUnits: asText(firstValue(carrier.totalPowerUnits, carrier.powerUnits, carrier.nbrPowerUnit)),
    };

    return NextResponse.json({ ok: true, data });
  } catch {
    // Do not log the exception: upstream URLs include the API webKey as a query parameter.
    console.error("[fmcsa] lookup request failed");
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to connect to FMCSA. Please check the API key and try again.",
        code: "upstream_failure",
      },
      { status: 502 }
    );
  }
}
