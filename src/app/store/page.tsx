import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { AnswerBox, Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services, servicePath, complianceServices, factoringServices } from "@/content/services";
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

export default function StorePage() {
  const rows = services.map((s) => ({
    name: s.name,
    short: s.short,
    href: servicePath(s),
    category: s.category,
    tiers: s.price?.tiers ?? [],
    summary: s.price?.summary ?? "",
    fine: s.price?.fine ?? "",
  }));

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
              <table className="w-full min-w-[760px] border-collapse">
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
                        {r.tiers.length ? (
                          <ul className="grid gap-1">
                            {r.tiers.map((t) => (
                              <li key={t.label}>
                                <span className="font-semibold text-navy-900">{t.price}</span>{" "}
                                <span className="text-steel-600">{t.label}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>{r.summary}</span>
                        )}
                      </td>
                      <td className="px-5 py-4 align-top">
                        {r.tiers.some((t) => t.note) ? (
                          <ul className="grid gap-1">
                            {r.tiers
                              .filter((t) => t.note)
                              .map((t) => (
                                <li key={t.label} className="text-[0.95rem]">
                                  <span className="font-semibold text-gold-600">{t.price}</span> {t.label}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <span className="text-[0.95rem] text-steel-600">Call for client rate</span>
                        )}
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

          <Reveal className="mt-6 grid gap-4 sm:grid-cols-2">
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
          </Reveal>
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
