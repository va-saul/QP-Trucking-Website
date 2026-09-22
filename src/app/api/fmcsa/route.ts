import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.FMCSA_API_KEY;

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
  const dotParam = searchParams.get("dot");
  if (!dotParam) {
    return NextResponse.json(
      {
        ok: false,
        error: "DOT number is required",
        code: "missing_dot",
      },
      { status: 400 }
    );
  }

  const dot = dotParam.replace(/\D/g, "");
  if (!dot) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid DOT number",
        code: "invalid_dot",
      },
      { status: 400 }
    );
  }

  try {
    const fmcsaUrl = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(
      dot
    )}?webKey=${encodeURIComponent(apiKey)}`;

    const response = await fetch(fmcsaUrl, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          {
            ok: false,
            error: "Carrier not found for this DOT number",
            code: "not_found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          ok: false,
          error: `FMCSA upstream responded with status ${response.status}`,
          code: "upstream_error",
        },
        { status: 502 }
      );
    }

    const json = await response.json();
    const carrier = json?.content?.carrier ?? json?.carrier ?? json;

    if (!carrier || (!carrier.dotNumber && !carrier.legalName)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Carrier not found for this DOT number",
          code: "not_found",
        },
        { status: 404 }
      );
    }

    // Format commodities
    let commodities = "";
    if (Array.isArray(carrier.cargoCarried)) {
      commodities = carrier.cargoCarried
        .map((c: any) => (typeof c === "string" ? c : c?.cargoName || c?.desc || ""))
        .filter(Boolean)
        .join(", ");
    } else if (typeof carrier.cargoCarried === "string") {
      commodities = carrier.cargoCarried;
    }

    const data = {
      dotNumber: String(carrier.dotNumber || dot),
      legalName: String(carrier.legalName || "").trim(),
      dba: String(carrier.dbaName || "").trim(),
      mc: String(carrier.docketNumber || carrier.mcNumber || "").trim(),
      street: String(carrier.phyStreet || carrier.mailingStreet || "").trim(),
      city: String(carrier.phyCity || carrier.mailingCity || "").trim(),
      state: String(carrier.phyState || carrier.mailingState || "").trim().toUpperCase(),
      zip: String(carrier.phyZipcode || carrier.mailingZipcode || "").trim(),
      phone: String(carrier.telephone || "").trim(),
      commodities,
      hazmat: carrier.hazmat === "Y" || carrier.hazmat === true ? "Yes" : "No",
      mileage: carrier.carrierMileage || carrier.mcs150Mileage ? String(carrier.carrierMileage || carrier.mcs150Mileage) : "",
      powerUnits: carrier.totalPowerUnits ? String(carrier.totalPowerUnits) : "",
    };

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    console.error("[fmcsa] lookup error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to connect to FMCSA SAFER service",
        code: "upstream_failure",
      },
      { status: 502 }
    );
  }
}
