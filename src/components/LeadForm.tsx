"use client";

import { useState } from "react";
import { org } from "@/content/site";

type Props = {
  /** Which service the visitor came from — pre-selects the interest field. */
  defaultService?: string;
  /** Quote forms ask for coverage details; onboarding forms ask for fleet size. */
  variant?: "consult" | "quote";
  title?: string;
  eyebrow?: string;
  compact?: boolean;
};

const SERVICES = [
  "Transportation factoring",
  "Pure Non-Recourse™ factoring",
  "Trucking insurance",
  "New authority setup",
  "BOC-3 filing",
  "Form 2290 (HVUT)",
  "IRP registration",
  "IFTA account & filings",
  "UCR registration",
  "MCS-150 update",
  "SCAC code",
  "DOT compliance binder",
  "Drug & alcohol consortium",
  "ELD & dashcam program",
  "Not sure yet — need advice",
];

export function LeadForm({ defaultService, variant = "consult", title, eyebrow, compact = false }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: variant, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error("request failed");
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-[0.75rem] border border-steel-200 bg-paper px-4 py-3 text-[0.95rem] text-navy-900 placeholder:text-steel-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";
  const label = "mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-600";

  if (state === "done") {
    return (
      <div className="rounded-[1.2rem] border border-brand-300 bg-brand-100/60 p-6 sm:p-8">
        <p className="eyebrow text-brand-600">Request received</p>
        <h3 className="mt-3 font-display text-[1.35rem] font-bold text-navy-900">
          Thanks — a QP specialist will call you shortly.
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
          During business hours ({org.hoursDisplay}) we usually respond within the hour. In a hurry? Call{" "}
          <a href={`tel:${org.salesPhone}`} className="font-bold text-brand-500">
            {org.salesPhoneDisplay}
          </a>{" "}
          and reference your submission.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={`tel:${org.salesPhone}`} className="btn btn-primary px-5 py-3">
            Call {org.salesPhoneDisplay}
          </a>
          <a href={org.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark px-5 py-3">
            Start the full application
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-[1.2rem] border border-steel-200 bg-paper p-6 sm:p-8 ${compact ? "" : "shadow-[var(--shadow-card)]"}`}>
      <p className="eyebrow text-brand-500">{eyebrow ?? (variant === "quote" ? "Free insurance quote" : "Free consultation")}</p>
      <h3 className="mt-3 font-display text-[1.3rem] font-bold text-navy-900 sm:text-[1.5rem]">
        {title ?? (variant === "quote" ? "Get a trucking insurance quote" : "Tell us about your business")}
      </h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-steel-600">
        {variant === "quote"
          ? "Share a few details and a licensed agent will shop markets and come back with limits and pricing — usually the same day."
          : "A QP specialist will reach out to help you get started. No obligation, no pressure, no sales scripts."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="lf-name">
            Full name*
          </label>
          <input id="lf-name" name="name" required autoComplete="name" placeholder="Jordan Reeves" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="lf-phone">
            Phone number*
          </label>
          <input id="lf-phone" name="phone" required type="tel" autoComplete="tel" placeholder="(502) 555-0134" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="lf-email">
            Email address*
          </label>
          <input id="lf-email" name="email" required type="email" autoComplete="email" placeholder="you@company.com" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="lf-company">
            Company name
          </label>
          <input id="lf-company" name="company" autoComplete="organization" placeholder="Reeves Transport LLC" className={field} />
        </div>

        <div>
          <label className={label} htmlFor="lf-service">
            What do you need?
          </label>
          <select id="lf-service" name="service" defaultValue={defaultService ?? ""} className={field}>
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="lf-fleet">
            Fleet size
          </label>
          <select id="lf-fleet" name="fleet" defaultValue="" className={field}>
            <option value="">Select…</option>
            <option>Owner-operator (1 truck)</option>
            <option>2–5 trucks</option>
            <option>6–20 trucks</option>
            <option>21–50 trucks</option>
            <option>51+ trucks</option>
            <option>Not operating yet</option>
          </select>
        </div>

        {variant === "quote" ? (
          <>
            <div>
              <label className={label} htmlFor="lf-dot">
                USDOT / MC number
              </label>
              <input id="lf-dot" name="dot" placeholder="USDOT 1234567" className={field} />
            </div>
            <div>
              <label className={label} htmlFor="lf-radius">
                Radius of operation
              </label>
              <select id="lf-radius" name="radius" defaultValue="" className={field}>
                <option value="">Select…</option>
                <option>Local (under 100 miles)</option>
                <option>Regional (100–500 miles)</option>
                <option>Long-haul (500+ miles)</option>
                <option>Nationwide 48 states</option>
              </select>
            </div>
          </>
        ) : null}

        <div className="sm:col-span-2">
          <label className={label} htmlFor="lf-message">
            Anything else we should know?
          </label>
          <textarea
            id="lf-message"
            name="message"
            rows={3}
            placeholder="Brokers you haul for, lanes, current factoring arrangement, deadlines…"
            className={field}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full px-6 py-4 sm:w-auto">
          {state === "sending" ? "Sending…" : variant === "quote" ? "Get my quote" : "Request my consultation"}
        </button>
        <p className="text-[0.76rem] leading-snug text-steel-400">
          We use your details only to respond to this request. See our{" "}
          <a href="/privacy-policy" className="underline">
            privacy policy
          </a>
          .
        </p>
      </div>

      {state === "error" ? (
        <p className="mt-4 rounded-[0.75rem] border border-signal/40 bg-signal/5 px-4 py-3 text-[0.88rem] text-signal">
          Something went wrong sending that. Please call{" "}
          <a href={`tel:${org.salesPhone}`} className="font-bold underline">
            {org.salesPhoneDisplay}
          </a>{" "}
          and we will take your details directly.
        </p>
      ) : null}
    </form>
  );
}
