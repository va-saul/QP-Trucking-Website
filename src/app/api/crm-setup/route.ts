import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  DEFAULT_MOMENTUM_LOCATION_ID,
  buildSampleLeadPayload,
  sendToMomentumCrm,
  syncCustomFieldsSchema,
} from "../../../lib/momentum-crm";

/**
 * Browser-accessible Momentum CRM Setup & Verification endpoint (`/crm-setup`).
 *
 * Designed specifically so administrators do NOT need bash, Node, or a local repo checkout.
 * Every request MUST carry `Authorization: Bearer <GHL_PRIVATE_INTEGRATION_TOKEN>` matching
 * the exact token saved in Vercel Environment Variables (verified with SHA-256 constant-time
 * `crypto.timingSafeEqual`). The token is never logged or echoed back.
 */

function tokensMatchConstantTime(candidate: string, expected: string): boolean {
  const a = createHash("sha256").update(candidate, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const configuredToken = (process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "").trim();
  const locationId = (process.env.GHL_LOCATION_ID || "").trim() || DEFAULT_MOMENTUM_LOCATION_ID;

  if (!configuredToken) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error:
          "GHL_PRIVATE_INTEGRATION_TOKEN is not active on this server yet. Add it under Vercel → Settings → Environment Variables, then click Redeploy under Deployments.",
      },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization") || "";
  const supplied = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!supplied || !tokensMatchConstantTime(supplied, configuredToken)) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        error:
          "The pasted token does not match the GHL_PRIVATE_INTEGRATION_TOKEN saved in Vercel Environment Variables.",
      },
      { status: 401 }
    );
  }

  let body: { action?: string } = {};
  try {
    body = (await request.json()) as { action?: string };
  } catch {
    body = {};
  }

  const action = body.action || "inspect";

  try {
    if (action === "inspect") {
      const report = await syncCustomFieldsSchema({
        token: configuredToken,
        locationId,
        createMissing: false,
      });
      return NextResponse.json({
        ok: true,
        action,
        locationId: report.locationId,
        totalCatalogFields: report.totalCatalogFields,
        matchedCount: report.matchedCount,
        missingCount: report.missingCount,
        createdCount: 0,
        missingFieldNames: report.missing.map((m) => `${m.folder} → ${m.name}`),
      });
    }

    if (action === "create-missing") {
      const report = await syncCustomFieldsSchema({
        token: configuredToken,
        locationId,
        createMissing: true,
      });
      return NextResponse.json({
        ok: true,
        action,
        locationId: report.locationId,
        totalCatalogFields: report.totalCatalogFields,
        matchedCount: report.matchedCount + report.createdCount,
        missingCount: report.missingCount,
        createdCount: report.createdCount,
        missingFieldNames: report.missing.map((m) => `${m.folder} → ${m.name}`),
      });
    }

    if (action === "send-test") {
      const result = await sendToMomentumCrm(buildSampleLeadPayload());
      return NextResponse.json({
        ok: true,
        action,
        locationId,
        contactId: result.contactId,
        mappedCustomFieldCount: result.mappedCustomFieldCount,
      });
    }

    return NextResponse.json({ ok: false, error: "Unknown setup action" }, { status: 400 });
  } catch (err) {
    console.error("[crm-setup] action failed", (err as Error)?.message);
    return NextResponse.json(
      {
        ok: false,
        error:
          (err as Error)?.message ||
          "Could not connect to Momentum CRM. Confirm all required Private Integration scopes are enabled.",
      },
      { status: 502 }
    );
  }
}
