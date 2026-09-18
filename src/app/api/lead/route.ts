import { NextResponse } from "next/server";

/**
 * Lead intake endpoint.
 *
 * The redesign ships with no third-party CRM baked in. Set
 * `LEAD_WEBHOOK_URL` (and optionally `LEAD_WEBHOOK_TOKEN`) in the environment
 * and every submission is forwarded there — HubSpot, Zapier, Make, a Slack
 * workflow, or a CRM of your choice. Without it, the payload is logged so the
 * form still behaves correctly in preview and no lead is silently lost.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const required = ["name", "phone", "email"];
  const missing = required.filter((k) => !payload[k]);
  if (missing.length) {
    return NextResponse.json({ ok: false, error: `Missing required fields: ${missing.join(", ")}` }, { status: 422 });
  }

  const record = {
    ...payload,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (error) {
      console.error("[lead] webhook delivery failed", error);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.info("[lead] captured (no webhook configured)", record);
  }

  return NextResponse.json({ ok: true });
}
