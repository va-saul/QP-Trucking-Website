"use client";

import { useState } from "react";
import { org } from "@/content/site";

/**
 * Online version of QP Capital's "Heavy Equipment Purchase Finance Credit
 * Application" (2-page PDF). Field-for-field mirror of the paper form,
 * submitting through /api/lead like every other form on the site.
 */

const field =
  "w-full rounded-[0.75rem] border border-steel-200 bg-paper px-4 py-3 text-[0.95rem] text-navy-900 placeholder:text-steel-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";
const label = "mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-600";
const band = "rounded-[0.75rem] bg-navy-900 px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white";
const subBand = "rounded-[0.75rem] bg-steel-100 px-4 py-2.5 text-[0.82rem] font-semibold text-steel-700";

function TextInput({
  id,
  name,
  label: l,
  required,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email";
}) {
  return (
    <div>
      <label className={label} htmlFor={id}>
        {l}
        {required ? "*" : ""}
      </label>
      <input
        id={id}
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={field}
      />
    </div>
  );
}

function SelectInput({
  id,
  name,
  label: l,
  options,
  required,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className={label} htmlFor={id}>
        {l}
        {required ? "*" : ""}
      </label>
      <select id={id} name={name} required={required} defaultValue="" className={field}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function YesNo({ id, name, label: l, required }: { id: string; name: string; label: string; required?: boolean }) {
  return (
    <div>
      <label className={label} htmlFor={id}>
        {l}
        {required ? "*" : ""}
      </label>
      <select id={id} name={name} required={required} defaultValue="" className={field}>
        <option value="">Select…</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </div>
  );
}

/** One guarantor / co-guarantor column, exactly as the paper form lays it out. */
function GuarantorBlock({
  prefix,
  title,
  primary = false,
}: {
  prefix: string;
  title: string;
  primary?: boolean;
}) {
  return (
    <div className="grid gap-4">
      <p className={subBand}>{title}</p>
      <TextInput
        id={`${prefix}-name`}
        name={primary ? "name" : `${prefix}Name`}
        label="Name"
        required={primary}
        autoComplete="name"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`${prefix}-ssn`}>SSN</label>
          <input
            id={`${prefix}-ssn`}
            name={`${prefix}Ssn`}
            type="password"
            autoComplete="off"
            inputMode="numeric"
            placeholder="•••-••-••••"
            className={field}
          />
        </div>
        <TextInput id={`${prefix}-dob`} name={`${prefix}Birthdate`} label="Birthdate" type="date" />
      </div>
      <SelectInput id={`${prefix}-housing`} name={`${prefix}Housing`} label="Homeowner or renting?" options={["Homeowner", "Renting"]} />
      <TextInput id={`${prefix}-addr`} name={`${prefix}HomeAddress`} label="Primary home address" autoComplete="street-address" />
      <TextInput id={`${prefix}-csz`} name={`${prefix}HomeCityStateZip`} label="City, state, zip" />
      <TextInput
        id={`${prefix}-mainphone`}
        name={primary ? "phone" : `${prefix}MainPhone`}
        label="Main phone"
        required={primary}
        type="tel"
        autoComplete="tel"
      />
      <TextInput id={`${prefix}-mobile`} name={`${prefix}MobilePhone`} label="Mobile phone" type="tel" />
      <TextInput
        id={`${prefix}-email`}
        name={primary ? "email" : `${prefix}Email`}
        label="Email"
        required={primary}
        type="email"
        autoComplete="email"
      />
      <YesNo id={`${prefix}-bankrupt`} name={`${prefix}BankruptcyChildSupport`} label="Current bankruptcy / child support?" />
    </div>
  );
}

export function EquipmentFinanceForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "equipment-finance", form: "Heavy Equipment Purchase Finance Credit Application", page: window.location.pathname }),
      });
      if (!res.ok) throw new Error("request failed");
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[1.2rem] border border-brand-300 bg-brand-100/60 p-6 sm:p-8">
        <p className="eyebrow text-brand-600">Application received</p>
        <h3 className="mt-3 font-display text-[1.35rem] font-bold text-navy-900">
          Thanks — a QP equipment specialist will call you shortly.
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
          During business hours ({org.hoursDisplay}) we usually respond within the hour. Have the vendor invoice or
          specs handy — we will request them next. Moving fast on a deal? Call{" "}
          <a href={`tel:${org.officePhone}`} className="font-bold text-brand-500">
            {org.officePhoneDisplay}
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
    <form onSubmit={onSubmit} className="rounded-[1.2rem] border border-steel-200 bg-paper p-6 shadow-[var(--shadow-card)] sm:p-8">
      <p className="eyebrow text-brand-500">QP Capital, LLC</p>
      <h3 className="mt-3 font-display text-[1.3rem] font-bold text-navy-900 sm:text-[1.5rem]">
        Heavy Equipment Purchase Finance Credit Application
      </h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-steel-600">
        The same application as our paper form — completed online, reviewed personally by a QP specialist. Fields
        marked * are required.
      </p>

      {/* ================= REQUEST FOR FINANCING ================= */}
      <p className={`${band} mt-8`}>Request for financing</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <TextInput id="fin-price" name="priceOfEquipment" label="Price of equipment ($)" required placeholder="$68,500" />
        <TextInput id="fin-amount" name="financingAmountRequested" label="Financing amount requested ($)" placeholder="$58,500" />
        <TextInput id="fin-down" name="downPaymentAmount" label="Down payment amount ($)" placeholder="$10,000" />
      </div>

      {/* ================= EQUIPMENT / VENDOR ================= */}
      <p className={`${subBand} mt-8`}>Heavy equipment / vehicle to be financed — attach vendor invoice / specs</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextInput id="eq-type" name="equipmentDescription" label="Equipment / vehicle (year, make, model, VIN)" placeholder="2022 Freightliner Cascadia · VIN 1FUJA6CK54LM12345" />
        <TextInput id="eq-vendor" name="vendorSeller" label="Vendor / seller" placeholder="Kentucky Truck Sales" />
        <TextInput id="eq-vcontact" name="vendorContactName" label="Contact name" />
        <TextInput id="eq-vphone" name="vendorPhone" label="Phone" type="tel" />
        <TextInput id="eq-vaddr" name="vendorAddress" label="Vendor address" autoComplete="street-address" />
        <TextInput id="eq-vcsz" name="vendorCityStateZip" label="City, state, zip" />
      </div>

      {/* ================= BUSINESS INFORMATION ================= */}
      <p className={`${band} mt-8`}>Business information</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextInput id="biz-legal" name="company" label="Legal name of business" required autoComplete="organization" placeholder="Reeves Transport LLC" />
        <YesNo id="biz-standing" name="businessGoodStanding" label="Is business in good standing / active?" />
        <TextInput id="biz-established" name="dateEstablished" label="Date established" placeholder="2021" />
        <TextInput id="biz-tin" name="taxId" label="Tax ID#" placeholder="12-3456789" />
        <SelectInput id="biz-type" name="businessType" label="Business type" options={["Corp", "LLC", "Sole-Proprietor"]} />
        <TextInput id="biz-employees" name="numberOfEmployees" label="# of employees" inputMode="numeric" placeholder="6" />
        <TextInput id="biz-addr" name="businessAddress" label="Address of business location" autoComplete="street-address" />
        <TextInput id="biz-csz" name="businessCityStateZip" label="City, state, zip" />
        <TextInput id="biz-mail" name="mailingAddress" label="Mailing address (if different)" />
        <TextInput id="biz-mailcsz" name="mailingCityStateZip" label="City, state, zip (mailing)" />
        <TextInput id="biz-phone" name="mainPhone" label="Main phone" type="tel" />
        <TextInput id="biz-fax" name="fax" label="Fax" type="tel" />
        <TextInput id="biz-email" name="businessEmail" label="Business email" type="email" />
        <TextInput id="biz-industry" name="typeOfBusiness" label="Type of business" placeholder="Dry van freight" />
        <YesNo id="biz-majority" name="majorityOwner" label="Are you the majority-owner of the company?" />
        <TextInput id="biz-position" name="positionAtCompany" label="What is your current position at the company?" placeholder="President / driver" />
        <YesNo id="biz-liens" name="repossessionsOrTaxLiens" label="Any repossessions and / or tax liens?" />
        <div className="sm:col-span-2">
          <label className={label} htmlFor="biz-lienswhy">Reason for repossessions and / or tax liens (w/ date)</label>
          <textarea id="biz-lienswhy" name="liensExplanation" rows={2} className={field} />
        </div>
      </div>

      {/* ================= OFFICERS / MEMBERS 10%+ ================= */}
      <p className={`${subBand} mt-8`}>All officer(s) / member(s) with ownership ≥ 10%</p>
      <div className="mt-4 grid gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="grid gap-4 rounded-[0.9rem] border border-steel-100 p-4 sm:grid-cols-3">
            <TextInput id={`off${n}-name`} name={`officer${n}Name`} label={`${n} — Name`} />
            <TextInput id={`off${n}-title`} name={`officer${n}Title`} label="Title" />
            <TextInput id={`off${n}-pct`} name={`officer${n}Ownership`} label="Ownership %" placeholder="50" />
          </div>
        ))}
      </div>

      {/* ================= GUARANTORS ================= */}
      <p className={`${band} mt-8`}>Guarantors — personal information, each member with ownership ≥ 10%</p>
      <p className="mt-2 text-[0.8rem] leading-snug text-steel-500">
        SSNs are transmitted securely with your application and used only for the credit review. Prefer to give them
        by phone? Leave them blank and we will call you.
      </p>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <GuarantorBlock prefix="g" title="Guarantor" primary />
        <GuarantorBlock prefix="cg" title="Co-guarantor (spouse)" />
      </div>

      {/* ================= DISCLOSURES + SIGNATURES ================= */}
      <p className={`${band} mt-8`}>ECOA disclosure &amp; applicant verification</p>
      <div className="mt-4 grid gap-4 text-[0.78rem] leading-relaxed text-steel-600">
        <p>
          <span className="font-semibold text-steel-700">ECOA disclosure.</span> The Federal Equal Credit Opportunity
          Act prohibits creditors from discriminating against credit applicants on basis of race, color, religion,
          national origin, sex, marital status, age (provided the applicant has the capacity to enter into a binding
          contract); because all or part of the applicant&apos;s income derives from any public assistance program; or
          because the applicant has in good faith exercised any right under the Consumer Credit Protection Act. The
          federal agency that administers compliance with this law concerning this creditor is FTC Regional Office for
          region in which the creditor operates or Federal Trade Commission, Consumer Response Center, Washington, DC
          20580. If we take adverse action you have a right to a statement of specific reasons for the adverse action
          if you request such statement within 60 days from QP Capital, LLC at the address and telephone number given
          on this application. The written statement shall be sent to you within 30 days. Adverse action may include
          refusal to grant credit in substantially the amount or terms requested, termination or an unfavorable change
          in the terms of an account and refusal to increase the amount of credit available.
        </p>
        <p>
          <span className="font-semibold text-steel-700">Applicant verification.</span> The undersigned acknowledges
          that the statements on this application are true, correct and accurate to the best of my knowledge, and the
          information contained herein may be used by QP Capital, LLC (QP) to make credit decisions. The undersigned
          authorizes QP and its affiliates to obtain any consumer and/or business information from banks, credit
          unions, as well as other credit reporting services, and authorizes them to furnish such information to
          Lending Sources. The undersigned acknowledges that this signed application is an application for credit
          only, and the final terms of the financing agreement will be based on the documents themselves. No commitment
          exists until the Applicant/Joint Applicant(s) receives the same in writing from QP.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="sig-g">Guarantor signature (type full legal name)*</label>
          <input id="sig-g" name="guarantorSignature" required placeholder="Jordan A. Reeves" className={`${field} font-display italic`} />
        </div>
        <div>
          <label className={label} htmlFor="sig-g-date">Date*</label>
          <input id="sig-g-date" name="guarantorSignatureDate" required type="date" defaultValue={today} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="sig-cg">Co-guarantor signature (type full legal name)</label>
          <input id="sig-cg" name="coGuarantorSignature" placeholder="Optional" className={`${field} font-display italic`} />
        </div>
        <div>
          <label className={label} htmlFor="sig-cg-date">Date</label>
          <input id="sig-cg-date" name="coGuarantorSignatureDate" type="date" className={field} />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-[0.85rem] leading-snug text-steel-600">
        <input type="checkbox" required name="acknowledged" className="mt-0.5 h-4 w-4 accent-[#1b4fa0]" />
        I have read the ECOA disclosure and applicant verification above, and I authorize QP Capital, LLC to obtain the
        consumer and business information described.
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full px-6 py-4 sm:w-auto">
          {state === "sending" ? "Sending…" : "Submit my credit application"}
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
