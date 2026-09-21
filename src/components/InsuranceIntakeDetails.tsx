"use client";

import { useState } from "react";

type Field = {
  label: string;
  placeholder?: string;
  required?: boolean;
  example?: string;
  note?: string;
};

type Group = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  fields: Field[];
  columns?: number;
};

const groups: Group[] = [
  {
    id: "contact",
    eyebrow: "Section 01",
    title: "Contact",
    intro: "Who we’re quoting and how we reach you. Bold items are reviewed first.",
    fields: [
      { label: "Opt in form checkbox", placeholder: "— —" },
      { label: "First name", placeholder: "— —" },
      { label: "Last name", placeholder: "— —" },
      { label: "Business Name", placeholder: "— —" },
      { label: "DOT Number", placeholder: "— —" },
      { label: "Date Posted", placeholder: "— —" },
      { label: "MC Number", placeholder: "— —" },
      { label: "Phone", placeholder: "— —", required: true },
      { label: "Email", placeholder: "— —", required: true },
      { label: "Contact source", placeholder: "— —" },
      { label: "Contact type", placeholder: "— —" },
      { label: "Lead", placeholder: "— —", required: true },
      { label: "2nd Owner First Name", placeholder: "— —" },
      { label: "2nd Owner Last Name", placeholder: "— —" },
      { label: "Type of Contact", placeholder: "— —" },
    ],
  },
  {
    id: "new-authority-questions",
    eyebrow: "Section 02",
    title: "Insured Information Needed — New Authority Questions",
    intro: "Three qualification questions every new authority is asked before we shop markets.",
    fields: [
      {
        label: "Question 1 — When are you looking to Bind Coverage or when would you like policy to start?",
        placeholder: "— —",
      },
      {
        label: "Question 2 — So I don't double quote you. Have you received any insurance quotes yet? With who?",
        placeholder: "— —",
      },
      {
        label: "Question 3 — Insurance Down Payments are usually between $3000-$6000 do you have that available before that date?",
        placeholder: "— —",
      },
      { label: "Company Rep", placeholder: "— —" },
      { label: "Refer Reason", placeholder: "— —" },
    ],
  },
  {
    id: "general-info",
    eyebrow: "Section 03",
    title: "General Info",
    intro: "Business, ownership and operating basics. Example values shown where your CRM pre-fills.",
    fields: [
      { label: "Business name", placeholder: "— —", required: true },
      { label: "2 related contacts", placeholder: "— —" },
      { label: "QM TRANSPORT LLC", placeholder: "Example business", example: "QM TRANSPORT LLC" },
      { label: "Date Business Started", placeholder: "Sep 18, 2026", example: "Sep 18, 2026" },
      { label: "Mailing Address — Street address", placeholder: "— —" },
      { label: "Mailing Address — City", placeholder: "— —" },
      { label: "Mailing Address — Country", placeholder: "United States", example: "United States" },
      { label: "Mailing Address — State", placeholder: "— —" },
      { label: "Mailing Address — Postal code", placeholder: "— —" },
      { label: "Who is your ELD provider?", placeholder: "— —" },
      { label: "Date of birth", placeholder: "— —" },
      { label: "Company EIN", placeholder: "— —" },
      { label: "Owner's Driver License Number", placeholder: "— —" },
      { label: "Owner's Social Security Number", placeholder: "— —" },
      { label: "Owner Married Or Single?", placeholder: "— —" },
      { label: "Does Owner have class A, B, or C CDL", placeholder: "— —" },
      { label: "How long has owner had CDL?", placeholder: "— —" },
      { label: "If the owner does not drive — What is the owners involvement in this venture?", placeholder: "— —" },
      { label: "How many years of experience does the owner have in trucking?", placeholder: "— —" },
      { label: "Do you haul Hazardous substances or materials?", placeholder: "— —" },
      { label: "List Commodities", placeholder: "— —" },
      { label: "% of loads for each Commodity", placeholder: "— —" },
      { label: "Average Value", placeholder: "— —" },
      { label: "Max Value", placeholder: "— —" },
      {
        label:
          "Does the applicant plan on hiring any additional owner/operators in the next 12 months? If yes, how many and who and how will they hire them?",
        placeholder: "— —",
      },
      { label: "2nd Owner DOB", placeholder: "— —" },
      { label: "2nd Owner Social", placeholder: "— —" },
      { label: "What is business Structure (LLC, Corporation, sole prop?)", placeholder: "— —" },
      { label: "Do you have a DBA?", placeholder: "— —" },
      { label: "Describe Business", placeholder: "— —" },
      { label: "Is this your primary business?", placeholder: "— —" },
      { label: "If no, Explain", placeholder: "— —" },
      { label: "Have you ever filed bankruptcy?", placeholder: "— —" },
      { label: "Do you hire any vehicles?", placeholder: "— —" },
      { label: "If Yes, Explain", placeholder: "— —" },
      { label: "Insured ID", placeholder: "— —" },
      { label: "Gross Receipts expected for this coming year?", placeholder: "— —" },
      { label: "Do you operate in more than one state?", placeholder: "— —" },
    ],
  },
  {
    id: "operation-info",
    eyebrow: "Section 04",
    title: "Operation Information",
    fields: [
      { label: "Are you a common carrier or contract hauler?", placeholder: "— —" },
      { label: "Do you operate over a regular route?", placeholder: "— —" },
      { label: "Do you pull Double or Triple Trailers?", placeholder: "— —" },
      { label: "Does the insured have brokerage authority?", placeholder: "— —" },
      { label: "Do you rent or lease your vehicles to others?", placeholder: "— —" },
      { label: "Filings Required (State/Federal)", placeholder: "— —" },
      { label: "Range of Transport (Interstate or Intrastate?)", placeholder: "— —" },
      { label: "Estimated Total Annual Mileage?", placeholder: "— —" },
      { label: "Time zone", placeholder: "— —" },
      { label: "Website", placeholder: "— —", required: true },
    ],
  },
  {
    id: "renewal",
    eyebrow: "Section 05",
    title: "Renewal Quote Business Information",
    intro: "Only if you’re renewing or switching. New authorities skip to Drivers.",
    fields: [
      { label: "When does the current policy End?", placeholder: "— —" },
      { label: "Have you ever changed your operating name?", placeholder: "— —" },
      { label: "Do you operate as a subsidiary of another company?", placeholder: "— —" },
      { label: "If yes — Which subsidiary?", placeholder: "— —" },
      { label: "Do you own or manage any other transportation operations that are not covered?", placeholder: "— —" },
      { label: "If yes — Which operations?", placeholder: "— —" },
      { label: "Do you lease your authority?", placeholder: "— —" },
      { label: "Do you appoint agents or hire independent contractors to operate on your behalf? — Yes", placeholder: "— —" },
      { label: "Do you appoint agents or hire independent contractors to operate on your behalf? — No", placeholder: "— —" },
      { label: "Have you purchased, sold or applied for authority over the past 3 years?", placeholder: "— —" },
      {
        label:
          "Have you ever lost or had authority withdrawn or have you been/are under probation by any regulatory authority (FHWA, PUC, etc.)?",
        placeholder: "— —",
      },
      {
        label: "Do you have agreements with other carriers for interchange of equipment or transportation of loads?",
        placeholder: "— —",
      },
      {
        label:
          "Have you ever had insurance under this business before? If so what company? (Don't ask this to new authority, IF RENEWAL PULL FROM SAFER)",
        placeholder: "— —",
      },
      { label: "Has insured been cancelled or non-renewed? If yes, provide details", placeholder: "— —" },
      { label: "Years of Prior Insurance under this name?", placeholder: "— —" },
      { label: "# of units insured", placeholder: "— —" },
      { label: "Amount Paid", placeholder: "— —" },
      { label: "Cover Type", placeholder: "— —" },
      { label: "# of losses", placeholder: "— —" },
    ],
  },
];

const driverFields: Field[] = [
  { label: "Driver Name", placeholder: "— —" },
  { label: "Date of Birth", placeholder: "— —" },
  { label: "DL#", placeholder: "— —" },
  { label: "State", placeholder: "— —" },
  { label: "Email (for MVR permission)", placeholder: "— —" },
  { label: "Phone # (For MVR Permission)", placeholder: "— —" },
  { label: "CDL Class (A,B,C)", placeholder: "— —" },
  { label: "# of years exp with CDL Class", placeholder: "— —" },
  { label: "Date of Hire", placeholder: "— —" },
  { label: "# of Violations", placeholder: "— —" },
  { label: "# of Accidents", placeholder: "— —" },
  { label: "Details of Accidents?", placeholder: "— —" },
  { label: "Owner Operator?", placeholder: "— —" },
];

const vehicleFields: Field[] = [
  { label: "Year", placeholder: "— —" },
  { label: "Make", placeholder: "— —" },
  { label: "Model", placeholder: "— —" },
  { label: "Date Purchased", placeholder: "— —" },
  { label: "Cost When Purchased", placeholder: "— —" },
  { label: "Value of Permanently attached special equipment", placeholder: "— —" },
  { label: "Body Type", placeholder: "— —" },
  { label: "17 digit VIN", placeholder: "— —" },
  { label: "Number of rear axles", placeholder: "— —" },
  { label: "Does the vehicle have anti-lock brakes?", placeholder: "— —" },
  { label: "Does the vehicle have airbags?", placeholder: "— —" },
  { label: "GVW", placeholder: "— —" },
  { label: "Stated Value", placeholder: "— —" },
  { label: "Max Radius", placeholder: "— —" },
  { label: "Owner of Vehicle", placeholder: "— —" },
  { label: "Loss Payee", placeholder: "— —" },
];

const checklistGroups: Group[] = [
  {
    id: "companies-checklist",
    eyebrow: "Section 08",
    title: "Direct Insurance Companies Checklist",
    intro: "Markets we shop — we track where you’ve already been quoted so you aren’t double-quoted.",
    fields: [{ label: "Select the Companies we got Quote from", placeholder: "— —" }],
  },
  {
    id: "onboarding",
    eyebrow: "Section 09",
    title: "Onboarding Insurance Customer",
    fields: [{ label: "Checklist", placeholder: "— —" }],
  },
  {
    id: "additional-info",
    eyebrow: "Section 10",
    title: "Additional Info — FMCSA",
    fields: [
      { label: "FMCSA Docket Number", placeholder: "— —" },
      { label: "FMCSA DBA Name", placeholder: "— —" },
      { label: "FMCSA Filing Date", placeholder: "— —" },
      { label: "FMCSA Commodities List", placeholder: "— —" },
    ],
  },
];

const policyFields: Field[] = [
  { label: "Policy Number", placeholder: "— —" },
  { label: "Status", placeholder: "— —" },
  { label: "Effective Date", placeholder: "— —" },
  { label: "Expiration Date", placeholder: "— —" },
  { label: "Cancellation Date", placeholder: "— —" },
  { label: "Agent", placeholder: "— —" },
  { label: "CSR", placeholder: "— —" },
  { label: "Line of Business", placeholder: "— —" },
  { label: "LOB Class", placeholder: "— —" },
  { label: "Carrier Name", placeholder: "— —" },
  { label: "MGA", placeholder: "— —" },
  { label: "Business Type", placeholder: "— —" },
  { label: "Commission", placeholder: "— —" },
  { label: "Total Premium", placeholder: "— —" },
  { label: "RWL_Qt", placeholder: "— —" },
  { label: "RWL_Pol", placeholder: "— —" },
  { label: "Percentage Change", placeholder: "— —" },
  { label: "Policy Premium", placeholder: "— —" },
  { label: "Referral Source", placeholder: "— —" },
  { label: "Referral Source Contact", placeholder: "— —" },
  { label: "Primary Office", placeholder: "— —" },
  { label: "Database ID", placeholder: "— —" },
];

const formFields: Field[] = [
  { label: "Driver License Number (For MVR Permission)", placeholder: "— —" },
  { label: "Date of Hire Driver", placeholder: "— —" },
  { label: "Driver Lic Number (For MVR Permission)", placeholder: "— —" },
  { label: "Date When Driver Hired", placeholder: "— —" },
  { label: "DOB", placeholder: "— —" },
  { label: "Date of Driver Hired", placeholder: "— —" },
  { label: "Driver Lic Number", placeholder: "— —" },
];

function FieldCard({ field }: { field: Field }) {
  return (
    <div className="rounded-[0.85rem] border border-steel-200 bg-bone px-4 py-3.5 sm:bg-paper">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-steel-600">
        {field.label}
        {field.required ? <span className="ml-2 rounded-full bg-brand-500 px-1.5 py-0.5 text-[0.55rem] font-bold tracking-[0.14em] text-white">REQUIRED</span> : null}
      </p>
      <p className={`mt-1.5 font-display text-[0.92rem] font-semibold ${field.example ? "text-navy-900" : "text-steel-400"}`}>
        {field.example ?? field.placeholder ?? "— —"}
      </p>
      {field.note ? <p className="mt-1 text-[0.75rem] leading-snug text-steel-500">{field.note}</p> : null}
    </div>
  );
}

function GroupBlock({ group, defaultOpen }: { group: Group; defaultOpen?: boolean }) {
  return (
    <details
      open={defaultOpen}
      className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:bg-paper open:shadow-[var(--shadow-card)]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <p className="eyebrow text-brand-500">{group.eyebrow}</p>
          <h3 className="mt-1 font-display text-[1.15rem] font-bold leading-tight text-navy-900 sm:text-[1.28rem]">{group.title}</h3>
          {group.intro ? <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">{group.intro}</p> : null}
        </div>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
        <div className={`grid gap-3 ${group.fields.length > 6 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
          {group.fields.map((f) => (
            <FieldCard key={f.label} field={f} />
          ))}
        </div>
      </div>
    </details>
  );
}

export function InsuranceIntakeDetails() {
  const [expandAll, setExpandAll] = useState(false);
  const [activePolicy, setActivePolicy] = useState(1);
  const [activeDriver, setActiveDriver] = useState(1);
  const [activeVehicle, setActiveVehicle] = useState(1);

  return (
    <section id="intake-checklist" className="relative border-t border-steel-200 bg-bone py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-500">Below the quote form — complete intake</p>
          <h2 className="mt-3 font-display text-display-md text-navy-900">
            Every field we track to bind your policy right the first time
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-steel-700">
            Fill the quick quote above and a licensed agent will shop markets the same day. This checklist is the full
            intake our team uses behind the scenes — gather it once so nothing is asked twice. Empty values show as{" "}
            <span className="font-mono text-[0.85em] text-steel-500">— —</span>. Fields marked{" "}
            <span className="inline-flex items-center rounded-full bg-brand-500 px-1.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white">
              Required
            </span>{" "}
            are reviewed first.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setExpandAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-5 py-2.5 text-[0.88rem] font-semibold text-white transition hover:bg-navy-800"
            >
              {expandAll ? "Collapse all sections" : "Expand all sections"}
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-full border border-steel-300 bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-navy-900 transition hover:border-navy-900"
            >
              Back to quote form
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M10 14L5 9l1.4-1.4L10 11.1l3.6-3.5L15 9z" fill="currentColor" />
              </svg>
            </a>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500">
              140+ fields · also used for FMCSA filings
            </span>
          </div>
        </div>

        {/* Quick jump chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            "Contact",
            "New Authority",
            "General Info",
            "Operations",
            "Renewal",
            "Drivers",
            "Vehicles",
            "Checklists",
            "FMCSA",
            "Policies",
            "MVR Forms",
          ].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-steel-200 bg-white px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-steel-600 transition hover:border-brand-300 hover:text-brand-600"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Groups */}
        <div className="mt-10 grid gap-4">
          {groups.map((g, idx) => (
            <GroupBlock key={g.id} group={g} defaultOpen={expandAll || idx < 2} />
          ))}

          {/* Drivers 1-4 */}
          <details
            id="drivers"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 06</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">
                  Driver — Please list all Drivers including relisting owners
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Repeat for each driver. We run MVRs with the email/phone you provide for permission.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveDriver(n);
                        // ensure details is open
                        const el = document.getElementById("drivers") as HTMLDetailsElement | null;
                        if (el) el.open = true;
                      }}
                      className={`rounded-full px-4 py-1.5 text-[0.82rem] font-semibold transition ${
                        activeDriver === n
                          ? "bg-navy-900 text-white"
                          : "border border-steel-300 bg-white text-navy-900 hover:border-navy-900"
                      }`}
                    >
                      Driver {n}
                    </button>
                  ))}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45 sm:flex"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-500">
                  Showing — Driver {activeDriver}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-steel-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {driverFields.map((f) => (
                  <FieldCard key={f.label} field={{ label: `${f.label} — Driver ${activeDriver}`, placeholder: f.placeholder }} />
                ))}
              </div>
              <p className="mt-4 text-[0.78rem] leading-relaxed text-steel-500">
                Tip: For Drivers 2–4 the same 13 fields repeat. Copy this block for each additional driver including owners who drive.
              </p>
            </div>
          </details>

          {/* Vehicles 1-4 */}
          <details
            id="vehicles"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 07</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">Vehicle</h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Tractor & trailer details for rating — VIN, stated value and safety equipment affect premium.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveVehicle(n);
                        const el = document.getElementById("vehicles") as HTMLDetailsElement | null;
                        if (el) el.open = true;
                      }}
                      className={`rounded-full px-4 py-1.5 text-[0.82rem] font-semibold transition ${
                        activeVehicle === n
                          ? "bg-navy-900 text-white"
                          : "border border-steel-300 bg-white text-navy-900 hover:border-navy-900"
                      }`}
                    >
                      Vehicle {n}
                    </button>
                  ))}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45 sm:flex"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-500">
                  Showing — Vehicle {activeVehicle}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-steel-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {vehicleFields.map((f) => (
                  <FieldCard key={f.label} field={{ label: `${f.label} — Vehicle ${activeVehicle}`, placeholder: f.placeholder }} />
                ))}
              </div>
              <p className="mt-4 text-[0.78rem] leading-relaxed text-steel-500">
                Repeat for Vehicles 2–4. Include loss payee if financed — the bank will be listed on the certificate.
              </p>
            </div>
          </details>

          {/* Checklists & FMCSA */}
          {checklistGroups.map((g) => (
            <GroupBlock key={g.id} group={g} defaultOpen={expandAll} />
          ))}

          {/* Policies 1-5 */}
          <details
            id="policies"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 11</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">
                  Policies 1–5
                </h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  Existing and quoted policies — carrier, premium and commission detail. Same fields for each policy.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePolicy(n);
                        const el = document.getElementById("policies") as HTMLDetailsElement | null;
                        if (el) el.open = true;
                      }}
                      className={`rounded-full px-4 py-1.5 text-[0.82rem] font-semibold transition ${
                        activePolicy === n
                          ? "bg-navy-900 text-white"
                          : "border border-steel-300 bg-white text-navy-900 hover:border-navy-900"
                      }`}
                    >
                      Policy {n}
                    </button>
                  ))}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45 sm:flex"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-500">
                  Showing — Policy {activePolicy}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-steel-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {policyFields.map((f) => (
                  <FieldCard
                    key={f.label}
                    field={{ label: `${f.label} — Policy ${activePolicy}`, placeholder: f.placeholder }}
                  />
                ))}
              </div>
              <p className="mt-4 text-[0.78rem] leading-relaxed text-steel-500">
                Policies 2–5 repeat the same 22 fields. Leave blank for new authority — renewal quotes pull history from SAFER.
              </p>
            </div>
          </details>

          {/* Forms */}
          <details
            id="forms"
            open={expandAll}
            className="group/details rounded-[1.1rem] border border-steel-200 bg-paper open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <p className="eyebrow text-brand-500">Section 12</p>
                <h3 className="mt-1 font-display text-[1.15rem] font-bold text-navy-900 sm:text-[1.28rem]">Form | Form 2</h3>
                <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-steel-600">
                  MVR permission and hire-date capture — signed for every driver before we bind.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-bone text-navy-900 transition-transform duration-300 group-open/details:rotate-45"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M10 4.5v11M4.5 10h11" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-steel-200 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {formFields.map((f) => (
                  <FieldCard key={f.label} field={f} />
                ))}
              </div>
            </div>
          </details>
        </div>

        {/* Footer help */}
        <div className="mt-8 rounded-[1.1rem] border border-steel-200 bg-navy-950 px-6 py-6 text-white sm:px-8 sm:py-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold-400">Don’t want to type it all?</p>
              <h3 className="mt-2 font-display text-[1.25rem] font-bold leading-tight sm:text-[1.4rem]">
                Send your DOT or declarations page — we’ll fill the rest
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">
                Our team pulls SAFER, FMCSA and prior-carrier data so you don’t re-type it. The checklist above is what we verify back with you.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-[0.95rem] font-bold text-navy-900 transition hover:bg-steel-100"
              >
                Start with quick quote
              </a>
              <a
                href="tel:+15025551234"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[0.95rem] font-bold text-white transition hover:bg-white/10"
              >
                Talk to an agent
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-400">
          Fields shown in CRM order · Monochrome values — — are blank until you provide them · No data is stored until you submit the quote form above
        </p>
      </div>
    </section>
  );
}
