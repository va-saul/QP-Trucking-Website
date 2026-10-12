import { NextResponse } from "next/server";

/**
 * Lead intake endpoint.
 *
 * Every submission is delivered through up to two channels:
 *  1. CRM webhook  - `LEAD_WEBHOOK_URL` (Momentum / GoHighLevel inbound webhook)
 *  2. Email        - Resend (`RESEND_API_KEY`) to `LEAD_NOTIFY_EMAIL`
 *                    (default marketing@qpfactoring.com)
 * A lead is accepted if at least one channel succeeds. If none is configured the
 * endpoint returns 503 so a form never reports success for a lost lead.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const isIntake = payload.formType === "insurance-intake";
  const firstName = (payload.firstName || payload["First name"] || "") as string;
  const lastName = (payload.lastName || payload["Last name"] || "") as string;
  const derivedName = payload.name || [firstName, lastName].filter(Boolean).join(" ");

  if (isIntake) {
    const missing: string[] = [];
    if (!firstName && !payload.name) missing.push("First name");
    if (!payload.phone) missing.push("Phone");
    if (!payload.email) missing.push("Email");

    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
        { status: 422 }
      );
    }
  } else {
    const required = ["name", "phone", "email"];
    const missing = required.filter((k) => !payload[k]);
    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
        { status: 422 }
      );
    }
  }

  const record = {
    ...payload,
    name: derivedName || payload.name || undefined,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  // Flatten nested intake data so GoHighLevel / Momentum can map every field.
  const flat: Record<string, unknown> = { ...record };
  if (payload.formData && typeof payload.formData === "object") {
    Object.assign(flat, payload.formData as Record<string, unknown>);
    delete flat.formData;
  }

  const notifyTo = process.env.LEAD_NOTIFY_EMAIL || "marketing@qpfactoring.com";
  const notifyFrom = process.env.LEAD_FROM_EMAIL || "QP Website <leads@qpfactoring.com>";
  const label = String(payload.formType || payload.source || "website form");
  const rows = Object.entries(flat)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
    .join("\n");

  // Two independent channels: CRM webhook (Momentum / GHL) and direct email.
  // The lead is accepted if at least one succeeds, so nothing is silently lost.
  const channels: Array<{ name: string; run: () => Promise<void> }> = [];

  if (process.env.LEAD_WEBHOOK_URL) {
    channels.push({
      name: "crm-webhook",
      run: async () => {
        const res = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}),
          },
          body: JSON.stringify(flat),
        });
        if (!res.ok) throw new Error(`CRM webhook responded ${res.status}`);
      },
    });
  }

  if (process.env.RESEND_API_KEY) {
    channels.push({
      name: "email",
      run: async () => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: notifyFrom,
            to: [notifyTo],
            ...(typeof payload.email === "string" && payload.email ? { reply_to: payload.email } : {}),
            subject: `New website lead: ${record.name ?? "Unknown"} (${label})`,
            text: rows,
          }),
        });
        if (!res.ok) throw new Error(`Email responded ${res.status}: ${await res.text()}`);
      },
    });
  }

  if (channels.length === 0) {
    console.error("[lead] NO DELIVERY CHANNEL CONFIGURED - set LEAD_WEBHOOK_URL and/or RESEND_API_KEY", record);
    return NextResponse.json({ ok: false, error: "Delivery not configured" }, { status: 503 });
  }

  const results = await Promise.allSettled(channels.map((c) => c.run()));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] ${channels[i].name} failed`, r.reason);
  });
  if (results.every((r) => r.status === "rejected")) {
    console.error("[lead] all channels failed", record);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
