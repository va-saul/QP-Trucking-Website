import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { AnswerBox, Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services, servicePath, complianceServices, factoringServices } from "@/content/services";
import { ambassadorProgram, circleNetworkProgram, fuelCardProgram, equipmentFinanceProgram } from "@/content/programs";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Services & Pricing Catalog — Trucking Compliance, Factoring & Insurance",
  description:
    "Every QP Trucking Solutions service with published pricing: new authority $200, BOC-3 $60, Form 2290 $60, IRP $195, IFTA from $60, UCR $60, MCS-150 $60, SCAC $60, DOT binder from $99, drug consortium $135 — $40 client rates available.",
  path: "/store",
  keywords: [
    "trucking compliance service pricing",
    "BOC-3 price",
    "form 2290 cost",
    "IRP registration cost",
    "IFTA filing price",
    "DOT binder price",
    "new authority setup price",
    "Circle Network",
    "QP Ambassador Program",
    "QP Fuel Card",
    "Equipment Finance",
  ],
  image: "/images/hero/compliance.jpg",
});

const faqs: Faq[] = [
  {
    q: "How do I order a service from QP?",
    a: "Call 502-398-6333 or 833-762-3464, or submit the get-started form and a specialist will confirm pricing, collect any documents we still need and file your order — usually the same business day.",
  },
  {
    q: "Where do the factoring client promo codes come from?",
    a: "Every active QP factoring client receives a promo code that reduces ancillary service pricing — for example BOC-3 drops from $60 to $40, Form 2290 from $60 to $40 and drug consortium enrollment from $135 to $100.",
  },
  {
    q: "Are government fees included in these prices?",
    a: "No. QP's prices cover preparation, filing and follow-up. Pass-through government fees — such as the FMCSA $300 operating authority fee, state IRP registration fees, IRS HVUT tax and state UCR fees — are quoted separately at cost before you pay.",
  },
  {
    q: "Can I order several services at once?",
    a: "Yes, and we recommend it. New authorities usually take the full start-up sequence (authority, BOC-3, UCR, 2290, IRP, IFTA, MCS-150) and we bundle the work so documents move between filings instead of sitting in a queue.",
  },
  {
    q: "Do you offer renewals as well as first-time filings?",
    a: "Yes. UCR, IFTA, IRP and MCS-150 biennials all renew on cycles and we track those dates for clients. We also file partial-year and suspended Form 2290 returns.",
  },
];

const catalogPricing: Record<
  string,
  {
    standard: { label?: string; price: string }[];
    client: { label?: string; price: string }[];
  }
> = {
  "new-authority": {
    standard: [{ label: "Standard setup", price: "$200" }],
    client: [{ label: "With promo code", price: "$100" }],
  },
  "boc-3": {
    standard: [{ label: "Standard filing", price: "$60" }],
    client: [{ label: "With promo code", price: "$40" }],
  },
  "form-2290": {
    standard: [{ label: "IRS HVUT e-filing", price: "$60" }],
    client: [{ label: "With promo code", price: "$40" }],
  },
  irp: {
    standard: [{ label: "Registration service", price: "$195" }],
    client: [{ label: "State fees separate", price: "Call for rate" }],
  },
  ifta: {
    standard: [
      { label: "Registration", price: "$150" },
      { label: "Quarterly filing", price: "$60" },
      { label: "Annual renewal", price: "$100" },
    ],
    client: [
      { label: "Registration", price: "$100" },
      { label: "Quarterly filing", price: "$40" },
      { label: "Annual renewal", price: "$70" },
    ],
  },
  ucr: {
    standard: [{ label: "Annual registration", price: "$60" }],
    client: [{ label: "With promo code", price: "$40" }],
  },
  "mcs-150": {
    standard: [{ label: "Filing or update", price: "$60" }],
    client: [{ label: "With promo code", price: "$40" }],
  },
  scac: {
    standard: [{ label: "NMFTA code registration", price: "$60" }],
    client: [{ label: "With promo code", price: "$40" }],
  },
  "dot-binder": {
    standard: [
      { label: "Digital PDF binder", price: "$99" },
      { label: "Printed physical binder", price: "$139" },
    ],
    client: [{ label: "Bundle rate available", price: "Call for rate" }],
  },
  "drug-alcohol-consortium": {
    standard: [{ label: "Consortium enrollment", price: "$135" }],
    client: [{ label: "With promo code", price: "$100" }],
  },
  "eld-dashcam": {
    standard: [{ label: "FMCSA-registered devices", price: "Member pricing" }],
    client: [{ label: "Discounts by fleet size", price: "Preferred rates" }],
  },
  "trucking-factoring": {
    standard: [{ label: "Recourse & non-recourse", price: "Flat, disclosed fee" }],
    client: [{ label: "With Circle Network", price: "0% factoring fees" }],
  },
  "pure-non-recourse": {
    standard: [{ label: "Pure Protection (no chargebacks)", price: "Flat, disclosed fee" }],
    client: [{ label: "Lifetime protection", price: "Included in rate" }],
  },
  insurance: {
    standard: [{ label: "Liability, cargo, physical damage", price: "Free to quote" }],
    client: [{ label: "With Circle Network", price: "50% down assistance" }],
  },
};

export default function StorePage() {
  const rows = services.map((s) => {
    const custom = catalogPricing[s.slug];
    const standard = custom?.standard ?? (s.price?.tiers?.length ? [s.price.tiers[0]] : [{ label: s.price?.summary ?? "Disclosed fee", price: "" }]);
    const client = custom?.client ?? (s.price?.tiers && s.price.tiers.length > 1 ? [s.price.tiers[1]] : [{ label: "Call for client rate", price: "" }]);

    return {
      name: s.name,
      short: s.short,
      href: servicePath(s),
      category: s.category,
      standard,
      client,
    };
  });

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Services & pricing", href: "/store" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "QP Trucking Solutions service catalog",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `https://qpfactoring.com${servicePath(s)}`,
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Catalog"
        title="Services & pricing — published up front"
        tagline="No mystery quotes. Every ancillary service, what it covers and what it costs, plus the discounted rate for QP factoring clients."
        image="/images/hero/compliance.jpg"
        imageAlt="QP Trucking Solutions service catalog and pricing"
        variant="counter"
        accent="gold"
        trail={[
          { label: "Home", href: "/" },
          { label: "Services & pricing", href: "/store" },
        ]}
        stats={[
          { label: "Services", value: `${services.length}` },
          { label: "Client discount", value: "Up to $35" },
          { label: "Typical filing", value: "1 day" },
          { label: "Bundling", value: "Available" },
        ]}
        primaryHref="/get-started"
        primaryLabel="Order a service"
        priority
      />

      <Section tone="paper">
        <Container>
          <AnswerBox
            question="What does QP charge for trucking compliance services?"
            answer="New Authority Set-Up is $200 ($100 for factoring clients), BOC-3, Form 2290, UCR, MCS-150 and SCAC are $60 each ($40 for clients), IRP registration is $195, IFTA is $150 for registration, $60 per quarterly filing and $100 annually ($100/$40/$70 for clients), the DOT binder is $99 as a PDF or $139 printed, and drug and alcohol consortium enrollment is $135 ($100 for clients)."
          />

          <Reveal className="mt-10 overflow-hidden rounded-[1.2rem] border border-steel-200">
            <div className="overflow-x-auto scroller">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <caption className="sr-only">QP Trucking Solutions services with standard and factoring client pricing</caption>
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-mono text-[0.64rem] uppercase tracking-[0.16em]">
                      Service
                    </th>
                    <th scope="col" className="px-5 py-4 font-mono text-[0.64rem] uppercase tracking-[0.16em]">
                      Standard price
                    </th>
                    <th scope="col" className="px-5 py-4 font-mono text-[0.64rem] uppercase tracking-[0.16em]">
                      Factoring clients
                    </th>
                    <th scope="col" className="px-5 py-4 font-mono text-[0.64rem] uppercase tracking-[0.16em]">
                      Order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-paper">
                  {rows.map((r) => (
                    <tr key={r.name} className="border-b border-steel-100 last:border-0">
                      <th scope="row" className="px-5 py-4 align-top">
                        <Link href={r.href} className="font-display text-[1rem] font-bold text-navy-900 hover:text-brand-500">
                          {r.name}
                        </Link>
                        <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-steel-400">
                          {r.category}
                        </p>
                      </th>
                      <td className="px-5 py-4 align-top text-[0.95rem] text-steel-700">
                        <ul className="grid gap-1">
                          {r.standard.map((t, idx) => (
                            <li key={idx}>
                              {t.price ? <span className="font-semibold text-navy-900">{t.price}</span> : null}{" "}
                              <span className="text-steel-600">{t.label}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <ul className="grid gap-1">
                          {r.client.map((t, idx) => (
                            <li key={idx} className="text-[0.95rem]">
                              {t.price ? <span className="font-semibold text-gold-600">{t.price}</span> : null}{" "}
                              <span className="text-steel-700">{t.label}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <Btn href={`/get-started?service=${encodeURIComponent(r.short)}`} variant="outlineDark" size="sm">
                          Start order
                        </Btn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[1.1rem] border border-steel-200 bg-bone p-5">
              <p className="eyebrow text-brand-500">Factoring programs</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-700">
                {factoringServices.map((s) => s.short).join(" · ")} — priced on volume, customer credit and program
                choice. Flat fees, no application cost and no minimums.
              </p>
              <Btn href="/factoring" variant="outlineDark" size="sm" className="mt-4">
                Compare factoring programs
              </Btn>
            </div>
            <div className="rounded-[1.1rem] border border-steel-200 bg-bone p-5">
              <p className="eyebrow text-brand-500">Insurance</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-700">
                Liability, cargo, bobtail, physical damage, NTL and general liability placed by licensed transportation
                agents. No fee to shop your policy.
              </p>
              <Btn href="/insurance" variant="outlineDark" size="sm" className="mt-4">
                Get an insurance quote
              </Btn>
            </div>
            <div className="rounded-[1.1rem] border border-steel-200 bg-bone p-5">
              <p className="eyebrow text-brand-500">QP Fuel Card</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-700">
                48¢/gal average savings at partner stations, 9,000+ stations, zero POS fees — with approval paths that
                do not require traditional credit.
              </p>
              <Btn href="/programs/fuel-card" variant="outlineDark" size="sm" className="mt-4">
                Fuel card program
              </Btn>
            </div>
            <div className="rounded-[1.1rem] border border-steel-200 bg-bone p-5">
              <p className="eyebrow text-brand-500">Equipment finance</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-700">
                Tractors, trailers and rolling equipment financed through the same team that factors your invoices.
                One application, reviewed by a specialist.
              </p>
              <Btn href="/programs/equipment-finance" variant="outlineDark" size="sm" className="mt-4">
                Equipment finance
              </Btn>
            </div>
            <div className="rounded-[1.1rem] border border-steel-200 bg-bone p-5">
              <p className="eyebrow text-brand-500">Circle Network</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-700">
                The premium member tier: 0% factoring fees, free fuel card setup, complimentary IFTA &amp; IRP
                processing and $2,000+ in annual value.
              </p>
              <Btn href="/programs/circle-network" variant="outlineDark" size="sm" className="mt-4">
                Circle Network
              </Btn>
            </div>
            <div className="rounded-[1.1rem] border border-steel-200 bg-bone p-5">
              <p className="eyebrow text-brand-500">Ambassador Program</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-700">
                Refer carriers and earn $500–$700 per factoring referral, up to $250 insurance, $100 fuel &amp;
                dispatch, $20 per authority service.
              </p>
              <Btn href="/programs/ambassador" variant="outlineDark" size="sm" className="mt-4">
                Ambassador payouts
              </Btn>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  PROGRAMS & MEMBERSHIP PRICING                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="bone">
        <Container>
          <SectionHead
            eyebrow="Special programs & memberships"
            title="Referral payouts, member benefits, fuel savings & iron financing"
            intro="Four programs with transparent value propositions and direct cash impact for your trucking business."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[1.15rem] border border-steel-200 bg-paper p-6">
                <div>
                  <span className="eyebrow text-brand-500">{ambassadorProgram.short}</span>
                  <h3 className="mt-2 font-display text-[1.15rem] font-bold text-navy-900">Referral Payouts</h3>
                  <div className="mt-4 space-y-2 text-[0.88rem] text-steel-700">
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Factoring referral</span>
                      <strong className="text-brand-600">$500 – $700</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Insurance referral</span>
                      <strong className="text-brand-600">Up to $250</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Fuel card / dispatch</span>
                      <strong className="text-brand-600">$100 each</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Authority service</span>
                      <strong className="text-brand-600">$20 / service</strong>
                    </div>
                  </div>
                </div>
                <Btn href={ambassadorProgram.path} variant="outlineDark" size="sm" className="mt-6 w-full">
                  Ambassador details
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[1.15rem] border border-steel-200 bg-paper p-6">
                <div>
                  <span className="eyebrow text-gold-600">{circleNetworkProgram.short}</span>
                  <h3 className="mt-2 font-display text-[1.15rem] font-bold text-navy-900">Premium Membership</h3>
                  <div className="mt-4 space-y-2 text-[0.88rem] text-steel-700">
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Annual value</span>
                      <strong className="text-gold-600">$2,000+</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Factoring fee</span>
                      <strong className="text-teal-600">0% for members</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Fuel card setup</span>
                      <strong className="text-teal-600">Free ($0)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>IFTA &amp; IRP fee</span>
                      <strong className="text-teal-600">Complimentary</strong>
                    </div>
                  </div>
                </div>
                <Btn href={circleNetworkProgram.path} variant="outlineDark" size="sm" className="mt-6 w-full">
                  Circle Network details
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[1.15rem] border border-steel-200 bg-paper p-6">
                <div>
                  <span className="eyebrow text-brand-500">{fuelCardProgram.short}</span>
                  <h3 className="mt-2 font-display text-[1.15rem] font-bold text-navy-900">Fuel Savings Card</h3>
                  <div className="mt-4 space-y-2 text-[0.88rem] text-steel-700">
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Avg pump savings</span>
                      <strong className="text-teal-600">48¢/gal</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>POS purchase fees</span>
                      <strong className="text-teal-600">$0.00</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Customer service</span>
                      <strong className="text-teal-600">$0.00</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Station network</span>
                      <strong className="text-navy-900">9,000+ stations</strong>
                    </div>
                  </div>
                </div>
                <Btn href={fuelCardProgram.path} variant="outlineDark" size="sm" className="mt-6 w-full">
                  Fuel card details
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.18} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[1.15rem] border border-steel-200 bg-paper p-6">
                <div>
                  <span className="eyebrow text-brand-500">{equipmentFinanceProgram.short}</span>
                  <h3 className="mt-2 font-display text-[1.15rem] font-bold text-navy-900">Equipment Finance</h3>
                  <div className="mt-4 space-y-2 text-[0.88rem] text-steel-700">
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Iron financed</span>
                      <strong className="text-navy-900">Tractors &amp; trailers</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Application fee</span>
                      <strong className="text-teal-600">$0</strong>
                    </div>
                    <div className="flex justify-between border-b border-steel-100 pb-1.5">
                      <span>Credit structure</span>
                      <strong className="text-navy-900">Custom terms</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Review speed</span>
                      <strong className="text-brand-600">Fast decision</strong>
                    </div>
                  </div>
                </div>
                <Btn href={equipmentFinanceProgram.path} variant="outlineDark" size="sm" className="mt-6 w-full">
                  Equipment finance details
                </Btn>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container>
          <SectionHead
            eyebrow="Why the prices are published"
            title="Trucking is expensive enough without mystery invoices"
            intro="Ancillary services are where carriers get overcharged — a $60 BOC-3 becomes a $300 'compliance package' somewhere else. We publish the number, then do the work."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {complianceServices.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link href={servicePath(s)} className="card-hover block h-full rounded-[1.1rem] border border-steel-200 bg-paper p-5">
                  <h3 className="font-display text-[1.05rem] font-bold text-navy-900">{s.short}</h3>
                  <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-steel-600">{s.tagline}</p>
                  <p className="mt-4 font-mono text-[0.8rem] font-medium text-brand-500">
                    {s.price?.tiers?.[0]?.price}
                    {s.price?.tiers?.[1] ? ` · ${s.price.tiers[1].price} clients` : ""}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
            <SectionHead
              eyebrow="Ordering FAQ"
              title="How ordering works at QP"
              intro="No abandoned shopping carts — every order is confirmed by a human who knows the filing."
            />
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Order a service"
        title="Tell us what you need filed and we will take it from here"
        body="Send your company details and the service you want, or call and speak to a specialist now. Factoring clients receive discounted pricing on every ancillary service."
        primaryLabel="Start my order"
      />
    </>
  );
}
