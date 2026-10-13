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
 *
 * Optional documents (insurance intake only): multipart/form-data with a `payload`
 * JSON part and up to MAX_ATTACHMENTS `files` parts (PDF/JPG/PNG). Files are held
 * in memory for this request only and are sent as email attachments to the agent
 * inbox. They are never written to disk, a public directory, or the webhook. Because
 * documents need email delivery, a document submission is refused (503) unless
 * RESEND_API_KEY is configured.
 *
 * Log lines carry channel names and error statuses only, never the lead body, so
 * DOB, license and other intake details do not reach server logs.
 */

const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;
// Vercel Functions reject request bodies over 4.5 MB; leave headroom for form overhead.
const MAX_TOTAL_ATTACHMENT_BYTES = 3.5 * 1024 * 1024;
const MAX_REQUEST_BYTES = 4 * 1024 * 1024;

type Attachment = { filename: string; contentType: string; bytes: Uint8Array };

const startsWith = (bytes: Uint8Array, sig: number[]) => sig.every((b, i) => bytes[i] === b);

/** Detects the real file type from its signature. The browser-supplied MIME type is not trusted. */
function sniffType(bytes: Uint8Array): { contentType: string; ext: string } | null {
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46])) return { contentType: "application/pdf", ext: "pdf" };
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return { contentType: "image/jpeg", ext: "jpg" };
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { contentType: "image/png", ext: "png" };
  return null;
}

/** Keeps a readable name, drops any path and unsafe characters, and forces the detected extension. */
function safeFilename(raw: string, ext: string): string {
  const base = raw.split(/[\\/]/).pop() ?? "";
  const stem = base.replace(/\.[^.]*$/, "").replace(/[^A-Za-z0-9 _-]+/g, "_").replace(/\s+/g, " ").trim();
  return `${(stem || "document").slice(0, 80)}.${ext}`;
}

function jsonError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

type Intake = { payload: Record<string, unknown>; attachments: Attachment[] } | { error: NextResponse };

async function readIntake(request: Request): Promise<Intake> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    try {
      return { payload: (await request.json()) as Record<string, unknown>, attachments: [] };
    } catch {
      return { error: jsonError(400, "Invalid JSON body") };
    }
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_REQUEST_BYTES) {
    return { error: jsonError(413, "Documents are too large. Attach up to 3 files totaling 3.5 MB, or email larger files to us.") };
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return { error: jsonError(400, "Invalid form submission") };
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(String(form.get("payload") ?? "{}")) as Record<string, unknown>;
  } catch {
    return { error: jsonError(400, "Invalid intake data") };
  }

  const parts = form.getAll("files").filter((v): v is File => typeof v !== "string" && v.size > 0);
  if (parts.length > MAX_ATTACHMENTS) {
    return { error: jsonError(422, `Attach no more than ${MAX_ATTACHMENTS} files.`) };
  }

  const attachments: Attachment[] = [];
  let total = 0;
  for (const part of parts) {
    if (part.size > MAX_ATTACHMENT_BYTES) {
      return { error: jsonError(422, "Each file must be 2 MB or smaller.") };
    }
    total += part.size;
    if (total > MAX_TOTAL_ATTACHMENT_BYTES) {
      return { error: jsonError(422, "Attached files total more than 3.5 MB. Remove a file or email it to us.") };
    }
    const bytes = new Uint8Array(await part.arrayBuffer());
    const kind = sniffType(bytes);
    if (!kind) {
      return { error: jsonError(422, "Only PDF, JPG or PNG files can be attached.") };
    }
    attachments.push({ filename: safeFilename(part.name, kind.ext), contentType: kind.contentType, bytes });
  }

  return { payload, attachments };
}

export async function POST(request: Request) {
  const intake = await readIntake(request);
  if ("error" in intake) return intake.error;
  const { payload, attachments } = intake;

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

  if (attachments.length && !process.env.RESEND_API_KEY) {
    console.error("[lead] documents received but RESEND_API_KEY is not set; refusing the submission");
    return jsonError(
      503,
      "Document upload is not available right now. Remove the files and submit again, or call our insurance desk."
    );
  }

  const record = {
    ...payload,
    name: derivedName || payload.name || undefined,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? undefined,
    ...(attachments.length
      ? { documents: attachments.map((a) => ({ name: a.filename, type: a.contentType, bytes: a.bytes.byteLength })) }
      : {}),
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

  const sendWebhook = async () => {
    const res = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify(flat),
    });
    if (!res.ok) throw new Error(`CRM webhook responded ${res.status}`);
  };

  const sendEmail = async () => {
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
        text: attachments.length
          ? `${rows}\n\nAttached for agent review (not parsed automatically): ${attachments.map((a) => a.filename).join(", ")}`
          : rows,
        ...(attachments.length
          ? {
              attachments: attachments.map((a) => ({
                filename: a.filename,
                content: Buffer.from(a.bytes).toString("base64"),
              })),
            }
          : {}),
      }),
    });
    // Resend errors do not echo the message body, so the status is enough for logs.
    if (!res.ok) throw new Error(`Email responded ${res.status}`);
  };

  // Documents: email must succeed first, so a failed attachment never reaches the CRM
  // without its files and the applicant can retry without duplicating the lead.
  if (attachments.length) {
    try {
      await sendEmail();
    } catch (err) {
      console.error("[lead] email with documents failed", (err as Error).message);
      return jsonError(
        502,
        "Your documents could not be delivered, so the intake was not submitted. Please try again, or call our insurance desk."
      );
    }
    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        await sendWebhook();
      } catch (err) {
        console.error("[lead] crm-webhook failed", (err as Error).message);
      }
    }
    return NextResponse.json({ ok: true });
  }

  // Two independent channels: CRM webhook (Momentum / GHL) and direct email.
  // The lead is accepted if at least one succeeds, so nothing is silently lost.
  const channels: Array<{ name: string; run: () => Promise<void> }> = [];
  if (process.env.LEAD_WEBHOOK_URL) channels.push({ name: "crm-webhook", run: sendWebhook });
  if (process.env.RESEND_API_KEY) channels.push({ name: "email", run: sendEmail });

  if (channels.length === 0) {
    console.error("[lead] NO DELIVERY CHANNEL CONFIGURED - set LEAD_WEBHOOK_URL and/or RESEND_API_KEY");
    return NextResponse.json({ ok: false, error: "Delivery not configured" }, { status: 503 });
  }

  const results = await Promise.allSettled(channels.map((c) => c.run()));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] ${channels[i].name} failed`, (r.reason as Error)?.message);
  });
  if (results.every((r) => r.status === "rejected")) {
    console.error(`[lead] all channels failed (${label})`);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
