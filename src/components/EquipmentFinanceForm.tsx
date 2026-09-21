"use client";

import { useState } from "react";
import { org } from "@/content/site";

/**
 * Equipment finance application — the fields a QP specialist needs to
 * structure a tractor/trailer deal. Submissions route through /api/lead
 * exactly like every other form on the site.
 */
export function EquipmentFinanceForm() {
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
        body: JSON.stringify({ ...data, source: "equipment-finance", page: window.location.pathname }),
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
  const legend = "font-display text-[1.05rem] font-bold text-navy-900";

  if (state === "done") {
    return (
      <div className="rounded-[1.2rem] border border-brand-300 bg-brand-100/60 p-6 sm:p-8">
        <p className="eyebrow text-brand-600">Application received</p>
        <h3 className="mt-3 font-display text-[1.35rem] font-bold text-navy-900">
          Thanks — a QP equipment specialist will call you shortly.
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
          During business hours ({org.hoursDisplay}) we usually respond within the hour. Moving fast on a deal? Call{" "}
          <a href={`tel:${org.salesPhone}`} className="font-bold text-brand-500">
            {org.salesPhoneDisplay}
          </a>{" "}
          and reference your submission.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={`tel:${org.salesPhone}`} className="btn btn-primary px-5 py-3">
            Call {org.salesPhoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.2rem] border border-steel-200 bg-paper p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <p className="eyebrow text-brand-500">Equipment finance application</p>
      <h3 className="mt-3 font-display text-[1.3rem] font-bold text-navy-900 sm:text-[1.5rem]">
        Tell us about the equipment you want to finance
      </h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-steel-600">
        A QP specialist reviews every application personally and comes back with structure options — no obligation,
        no pressure.
      </p>

      {/* -------- business & contact -------- */}
      <fieldset className="mt-6">
        <legend className={legend}>Business &amp; contact</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="ef-name">Full name*</label>
            <input id="ef-name" name="name" required autoComplete="name" placeholder="Jordan Reeves" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-phone">Phone number*</label>
            <input id="ef-phone" name="phone" required type="tel" autoComplete="tel" placeholder="(502) 555-0134" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-email">Email address*</label>
            <input id="ef-email" name="email" required type="email" autoComplete="email" placeholder="you@company.com" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-company">Company legal name*</label>
            <input id="ef-company" name="company" required autoComplete="organization" placeholder="Reeves Transport LLC" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-ein">EIN</label>
            <input id="ef-ein" name="ein" placeholder="12-3456789" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-mcdot">MC / DOT numbers</label>
            <input id="ef-mcdot" name="mcdot" placeholder="MC-123456 · USDOT 1234567" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-years">Years in business</label>
            <select id="ef-years" name="yearsInBusiness" defaultValue="" className={field}>
              <option value="">Select…</option>
              <option>Not operating yet</option>
              <option>Less than 1 year</option>
              <option>1–3 years</option>
              <option>4–10 years</option>
              <option>10+ years</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="ef-fleet">Current fleet size</label>
            <select id="ef-fleet" name="fleetSize" defaultValue="" className={field}>
              <option value="">Select…</option>
              <option>Owner-operator (1 truck)</option>
              <option>2–5 trucks</option>
              <option>6–20 trucks</option>
              <option>21–50 trucks</option>
              <option>51+ trucks</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* -------- equipment -------- */}
      <fieldset className="mt-8 border-t border-steel-200 pt-6">
        <legend className={`${legend} sr-only`}>Equipment to finance</legend>
        <p className={legend}>Equipment to finance</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="ef-type">Equipment type*</label>
            <select id="ef-type" name="equipmentType" required defaultValue="" className={field}>
              <option value="">Select…</option>
              <option>Tractor (semi truck)</option>
              <option>Trailer</option>
              <option>Tractor + trailer</option>
              <option>Other rolling equipment</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="ef-condition">Condition</label>
            <select id="ef-condition" name="equipmentCondition" defaultValue="" className={field}>
              <option value="">Select…</option>
              <option>New</option>
              <option>Used</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="ef-year">Year</label>
            <input id="ef-year" name="equipmentYear" placeholder="2022" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-makemodel">Make &amp; model</label>
            <input id="ef-makemodel" name="equipmentMakeModel" placeholder="Freightliner Cascadia" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-vin">VIN</label>
            <input id="ef-vin" name="equipmentVin" placeholder="1FUJA6CK54LM12345" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-miles">Mileage</label>
            <input id="ef-miles" name="equipmentMileage" placeholder="412,000 mi" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-price">Asking price*</label>
            <input id="ef-price" name="askingPrice" required placeholder="$68,500" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ef-down">Down payment available</label>
            <input id="ef-down" name="downPayment" placeholder="$10,000" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="ef-seller">Seller / dealer name &amp; location</label>
            <input id="ef-seller" name="seller" placeholder="Kentucky Truck Sales — Louisville, KY" className={field} />
          </div>
        </div>
      </fieldset>

      {/* -------- deal -------- */}
      <fieldset className="mt-8 border-t border-steel-200 pt-6">
        <p className={legend}>The deal</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="ef-term">Preferred term</label>
            <select id="ef-term" name="preferredTerm" defaultValue="" className={field}>
              <option value="">Select…</option>
              <option>12 months</option>
              <option>24 months</option>
              <option>36 months</option>
              <option>48 months</option>
              <option>60 months</option>
              <option>Not sure — advise me</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="ef-factoring">Currently factoring?</label>
            <select id="ef-factoring" name="currentlyFactoring" defaultValue="" className={field}>
              <option value="">Select…</option>
              <option>Yes — with QP</option>
              <option>Yes — with another company</option>
              <option>No — not factoring</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="ef-message">Anything else we should know?</label>
            <textarea
              id="ef-message"
              name="message"
              rows={3}
              placeholder="Lanes you run, brokers you haul for, deadlines, trade-ins…"
              className={field}
            />
          </div>
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full px-6 py-4 sm:w-auto">
          {state === "sending" ? "Sending…" : "Submit my equipment application"}
        </button>
        <p className="text-[0.76rem] leading-snug text-steel-400">
          We use your details only to review this request. See our{" "}
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
