import { NextResponse } from "next/server";

const DEFAULT_LEAD_EMAIL = "marketing@qpfactoring.com";
const DEFAULT_INSURANCE_EMAIL = "insurance@qpfactoring.com";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";

type LeadRecord = Record<string, unknown> & {
  name?: string;
  email?: string;
  phone?: string;
  formType?: string;
  source?: string;
  service?: string;
  page?: string;
  receivedAt?: string;
  userAgent?: string;
};

function textValue(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isInsuranceSubmission(payload: LeadRecord): boolean {
  const service = textValue(payload.service).toLowerCase();
  const page = textValue(payload.page).toLowerCase();
  const form = textValue(payload.form).toLowerCase();

  return (
    payload.formType === "insurance-intake" ||
    payload.source === "quote" ||
    service.includes("insurance") ||
    page.startsWith("/insurance") ||
    form.includes("insurance")
  );
}

function parseRecipients(value: string): string[] {
  return value
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "(not provided)";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value, null, 2) ?? "(not provided)";
}

function formatEmailBody(record: LeadRecord): string {
  const lines = [
    "New form submission from qpfactoring.com",
    "",
    `Received: ${textValue(record.receivedAt) || new Date().toISOString()}`,
    `Form: ${textValue(record.form) || textValue(record.formType) || textValue(record.source) || "Website inquiry"}`,
    `Page: ${textValue(record.page) || "Not provided"}`,
    "",
    "Submitted information",
    "---------------------",
  ];

  for (const [key, value] of Object.entries(record)) {
    if (key === "receivedAt" || key === "userAgent") continue;
    const label = key
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .replace(/^./, (character) => character.toUpperCase());
    lines.push(`${label}:`, formatValue(value), "");
  }

  if (record.userAgent) lines.push(`Browser: ${textValue(record.userAgent)}`);
  return lines.join("\n");
}

async function sendNotificationEmail(record: LeadRecord, recipients: string[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    throw new Error("email_not_configured");
  }

  const email = textValue(record.email);
  const name = textValue(record.name);
  const formName = textValue(record.form) || textValue(record.formType) || textValue(record.source) || "Website inquiry";
  const safeSubject = `[QP Website] ${formName} — ${name || "New submission"}`
    .replace(/[\r\n]+/g, " ")
    .slice(0, 180);

  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject: safeSubject,
      text: formatEmailBody(record),
      ...(isValidEmail(email) ? { reply_to: email } : {}),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    // Do not log the submitted data or provider response; forms may contain sensitive information.
    console.error(`[lead] email provider responded with status ${response.status}`);
    throw new Error("email_delivery_failed");
  }
}

/**
 * Lead intake endpoint.
 *
 * Every submission is emailed through Resend. Insurance quotes and full
 * insurance applications go to the insurance inbox; all other forms go to
 * marketing. An optional webhook can additionally forward the same record to
 * a CRM or automation service.
 */
export async function POST(request: Request) {
  let payload: LeadRecord;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "Invalid form submission" }, { status: 400 });
    }
    payload = body as LeadRecord;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const isIntake = payload.formType === "insurance-intake";
  const firstName = textValue(payload.firstName ?? payload["First name"]);
  const lastName = textValue(payload.lastName ?? payload["Last name"]);
  const name = textValue(payload.name) || [firstName, lastName].filter(Boolean).join(" ");
  const phone = textValue(payload.phone);
  const email = textValue(payload.email);

  const missing: string[] = [];
  if (!name && isIntake) missing.push("First name");
  else if (!name) missing.push("Name");
  if (!phone) missing.push("Phone");
  if (!email) missing.push("Email");

  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
      { status: 422 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address" }, { status: 422 });
  }

  const record: LeadRecord = {
    ...payload,
    name: name || undefined,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  const configuredRecipients = isInsuranceSubmission(record)
    ? process.env.INSURANCE_EMAIL_TO || DEFAULT_INSURANCE_EMAIL
    : process.env.LEAD_EMAIL_TO || DEFAULT_LEAD_EMAIL;
  const recipients = parseRecipients(configuredRecipients);

  if (recipients.length === 0 || recipients.some((recipient) => !isValidEmail(recipient))) {
    console.error("[lead] recipient email environment variable is invalid");
    return NextResponse.json(
      { ok: false, error: "Form email delivery is not configured correctly" },
      { status: 503 }
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Form email delivery is not configured yet. Please call us directly." },
      { status: 503 }
    );
  }

  try {
    await sendNotificationEmail(record, recipients);
  } catch (error) {
    if (error instanceof Error && error.message === "email_not_configured") {
      return NextResponse.json(
        { ok: false, error: "Form email delivery is not configured yet. Please call us directly." },
        { status: 503 }
      );
    }

    console.error("[lead] email delivery failed");
    return NextResponse.json(
      { ok: false, error: "We could not deliver your submission. Please try again or call us directly." },
      { status: 502 }
    );
  }

  // The inbox notification is the primary delivery. A CRM webhook is an
  // optional secondary copy; a webhook outage should not invalidate a delivered form.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(record),
        cache: "no-store",
        signal: AbortSignal.timeout(12_000),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } catch {
      console.error("[lead] optional CRM webhook delivery failed");
    }
  }

  return NextResponse.json({ ok: true });
}
