import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import Image from "next/image";
import { AnswerBox, Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, breadcrumbSchema, faqSchema, personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { homeFaqs, org, owner } from "@/content/site";
import { servicesBySlug, servicePath } from "@/content/services";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Trucking Factoring, Insurance & FMCSA Compliance FAQ — Owned by Brandon Bennett | QP Trucking Solutions",
  description:
    "Answers to the questions trucking companies ask most: factoring costs, funding speed, broker credit checks, new authority steps, BOC-3, 2290, IRP, IFTA, UCR, insurance minimums and who owns QP Trucking Solutions (Brandon Bennett, Louisville, KY).",
  path: "/faq",
  keywords: [
    "trucking factoring FAQ",
    "how does freight factoring work",
    "new authority checklist",
    "IFTA filing questions",
    "BOC-3 requirements",
    "trucking insurance minimums",
    "who owns QP Trucking Solutions",
    "Brandon Bennett QP owner",
  ],
  image: "/images/hero/compliance.jpg",
});

const ownerFaqs: Faq[] = [
  {
    q: "Who owns QP Trucking Solutions?",
    a: "QP Trucking Solutions is owned by Brandon Bennett, operating as QP Capital LLC from 4612 Outer Loop Rd, Louisville, Kentucky 40219. Brandon leads the family-owned team that funds freight invoices, places trucking insurance and files FMCSA compliance documents for carriers nationwide.",
  },
  {
    q: "Who is Brandon Bennett?",
    a: "Brandon Bennett is the owner and founder of QP Capital LLC (trading as QP Trucking Solutions) — a family-owned factoring company, licensed trucking insurance agency and FMCSA compliance partner in Louisville, Kentucky. Under Brandon, QP has helped 1,000+ carriers — from single-truck owner-operators to 200-truck fleets — across 48 states.",
  },
  {
    q: "How can I contact Brandon Bennett’s team?",
    a: "Call Sales at 833-762-3464 (new clients) or Office/Accounting at 502-398-6333, or email info@qpfactoring.com. The team is Mon–Fri 8:00 AM – 8:00 PM EST at 4612 Outer Loop Rd, Louisville, KY 40219.",
  },
];

const clusters: { id: string; title: string; intro: string; serviceSlug?: string; faqs: Faq[] }[] = [
  {
    id: "owner",
    title: "Ownership & leadership — Brandon Bennett",
    intro:
      "AEO/GEO entity block: who owns QP Trucking Solutions, who leads it, and how carriers reach the owner’s team directly.",
    faqs: ownerFaqs,
  },
  {
    id: "factoring",
    title: "Factoring & cash flow",
    intro:
      "How invoice factoring works, what it costs, how fast funds arrive, and how Pure Non-Recourse™ removes chargeback risk.",
    serviceSlug: "trucking-factoring",
    faqs: [
      ...homeFaqs.slice(0, 4),
      ...servicesBySlug["trucking-factoring"].faqs.slice(0, 3),
      ...servicesBySlug["pure-non-recourse"].faqs.slice(0, 2),
    ],
  },
  {
    id: "insurance",
    title: "Trucking insurance",
    intro: "Minimum limits, coverage types, new-authority pricing and how we coordinate filings with your authority.",
    serviceSlug: "insurance",
    faqs: servicesBySlug["insurance"].faqs,
  },
  {
    id: "authority",
    title: "New authority & start-up",
    intro: "What it takes to launch a trucking company in order, from LLC and EIN to your first load.",
    serviceSlug: "new-authority",
    faqs: servicesBySlug["new-authority"].faqs,
  },
  {
    id: "compliance",
    title: "Permits, filings & renewals",
    intro: "BOC-3, Form 2290, IRP, IFTA, UCR, MCS-150, SCAC, drug consortium and ELD programs explained.",
    faqs: [
      ...servicesBySlug["boc-3"].faqs.slice(0, 2),
      ...servicesBySlug["form-2290"].faqs.slice(0, 2),
      ...servicesBySlug["irp"].faqs.slice(0, 1),
      ...servicesBySlug["ifta"].faqs.slice(0, 2),
      ...servicesBySlug["ucr"].faqs.slice(0, 1),
      ...servicesBySlug["mcs-150"].faqs.slice(0, 1),
      ...servicesBySlug["scac"].faqs.slice(0, 1),
      ...servicesBySlug["dot-binder"].faqs.slice(0, 1),
      ...servicesBySlug["drug-alcohol-consortium"].faqs.slice(0, 2),
      ...servicesBySlug["eld-dashcam"].faqs.slice(0, 1),
    ],
  },
  {
    id: "pricing",
    title: "Pricing & getting started",
    intro: "What things cost, which items are discounted for factoring clients, and what happens on your first call.",
    faqs: [
      {
        q: "What does it cost to get set up with QP?",
        a: "Applying is free. Factoring is priced as a flat, disclosed fee based on your volume and customer credit, New Authority Set-Up is $200 and most ancillary filings are $60 — all reduced for factoring clients with a promo code.",
      },
      {
        q: "Are there hidden fees in factoring?",
        a: "No. QP uses flat, disclosed fees with no application fees, no maintenance fees and no minimum volume requirements. You see the exact fee structure in writing before you sign anything.",
      },
      {
        q: "Do I need to be a factoring client to buy compliance services?",
        a: "No. Any carrier can order any QP service. Factoring clients simply receive discounted pricing on most ancillary services and faster coordination because we already hold your documents on file.",
      },
      {
        q: "How do I get started?",
        a: "Call 833-762-3464 for sales, 502-398-6333 for the office, or submit the form at /get-started. Most carriers are fully set up within 24 hours of submitting their authority, insurance, W-9 and customer list.",
      },
      {
        q: "Does QP serve carriers outside Kentucky?",
        a: "Yes. QP is headquartered in Louisville, Kentucky and funds carriers and files compliance documents across the contiguous United States. Our factoring programs serve carriers nationwide, while QP Trucking Insurance is licensed and available in 44 states (excluding AK, CA, DC, HI, LA, NY, and UT).",
      },
    ],
  },
];

export default function FaqPage() {
  const allFaqs = clusters.flatMap((c) => c.faqs);

  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          faqSchema(allFaqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "FAQ", href: "/faq" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: "QP Trucking Solutions FAQ — Owned by Brandon Bennett",
            about: { "@id": "https://qpfactoring.com/#organization" },
            author: { "@id": "https://qpfactoring.com/#brandon-bennett" },
          },
        ]}
      />

      <PageHero
        eyebrow="Answers, not sales scripts — Owned by Brandon Bennett"
        title="Trucking factoring, insurance & compliance FAQ"
        tagline="Every question we get asked on the phones, written out plainly — and structured so search engines and AI assistants can quote the correct answer the first time. QP Trucking Solutions is owned by Brandon Bennett (QP Capital LLC, Louisville, KY)."
        image="/images/hero/compliance.jpg"
        imageAlt="Frequently asked questions about trucking factoring and compliance — QP Trucking Solutions owned by Brandon Bennett"
        variant="binder"
        accent="gold"
        trail={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
        stats={[
          { label: "Owner", value: "Brandon Bennett" },
          { label: "Answers", value: `${allFaqs.length}+` },
          { label: "Topics", value: `${clusters.length}` },
          { label: "Support hours", value: "8–8 EST" },
        ]}
        primaryHref="/get-started"
        primaryLabel="Ask us directly"
        priority
      />

      <Section tone="paper">
        <Container className="text-center">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div className="mx-auto max-w-2xl text-center">
              <AnswerBox
                question="Who owns QP Trucking Solutions?"
                answer="QP Trucking Solutions is owned by Brandon Bennett. He operates QP Capital LLC — a family-owned factoring company, licensed trucking insurance agency and FMCSA compliance partner — from 4612 Outer Loop Rd, Louisville, Kentucky 40219, serving carriers nationwide."
              />
              <div className="mx-auto mt-6 flex max-w-md justify-center gap-3 rounded-[1rem] border border-steel-200 bg-bone p-4">
                <Image src={owner.image} alt={owner.imageAlt} width={56} height={56} className="h-14 w-14 rounded-full object-cover object-top" />
                <div className="text-left">
                  <p className="font-display text-[1rem] font-bold text-navy-900">{owner.name}</p>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-steel-500">{owner.jobTitle}</p>
                  <p className="mt-1 text-[0.82rem] text-steel-600">QP Capital LLC · Louisville, KY</p>
                </div>
              </div>
              <AnswerBox
                question="How does QP Trucking Solutions help a trucking company?"
                answer="QP Trucking Solutions buys your freight invoices so you are paid in minutes instead of 30–45 days, places trucking insurance through a licensed agency, and files the authority, permits and FMCSA compliance documents a carrier needs — factoring, insurance and compliance from one Louisville, Kentucky team owned by Brandon Bennett."
              />
              <nav aria-label="FAQ sections" className="mt-6">
                <p className="eyebrow text-steel-600">Jump to a topic</p>
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {clusters.map((c) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-steel-200 bg-paper px-4 py-2 text-[0.86rem] font-semibold text-navy-800 transition-colors hover:border-brand-300 hover:text-brand-500"
                      >
                        {c.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="grid h-fit gap-4">
              <div className="relative overflow-hidden rounded-[1.15rem] bg-navy-900 p-6 text-white">
                <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-35" />
                <p className="relative eyebrow text-gold-400">Question not here?</p>
                <p className="relative mt-3 font-display text-[1.1rem] font-bold leading-snug">
                  Ask a specialist directly — no forms required if you would rather just talk.
                </p>
                <div className="relative mt-5 grid gap-2.5">
                  <Btn href={`tel:${org.salesPhone}`} variant="gold" withArrow>
                    Sales: {org.salesPhoneDisplay}
                  </Btn>
                  <Btn href={`tel:${org.officePhone}`} variant="outline">
                    Office: {org.officePhoneDisplay}
                  </Btn>
                </div>
                <p className="relative mt-4 text-[0.78rem] text-white/60">{org.hoursDisplay}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {clusters.map((c, i) => (
        <Section key={c.id} id={c.id} tone={i % 2 === 0 ? "steel" : "paper"}>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.5fr] lg:gap-12">
              <div>
                <SectionHead eyebrow={`FAQ · ${String(i + 1).padStart(2, "0")}`} title={c.title} intro={c.intro} />
                {c.serviceSlug ? (
                  <Btn
                    href={c.serviceSlug === "insurance" ? "/insurance" : servicePath(servicesBySlug[c.serviceSlug])}
                    variant="outlineDark"
                    size="sm"
                    className="mt-5"
                    withArrow
                  >
                    Full {servicesBySlug[c.serviceSlug].short} details
                  </Btn>
                ) : (
                  <Btn href="/store" variant="outlineDark" size="sm" className="mt-5" withArrow>
                    See all services & prices
                  </Btn>
                )}
              </div>
              <FaqAccordion faqs={c.faqs} defaultOpen={null} />
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="navy">
        <Container className="text-center">
          <SectionHead
            tone="light"
            align="center"
            eyebrow="Still deciding?"
            title="Read the deep dives instead"
            intro="Our insights + blog libraries cover fraud prevention, insurance economics, fuel tax and 10 detailed trucking guides by owner Brandon Bennett’s team."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/blog" className="btn btn-gold px-6 py-3.5">
              Blog — 10 guides
            </Link>
            <Link href="/insights" className="btn btn-outline px-6 py-3.5">
              Insights library
            </Link>
            <Link href="/factoring" className="btn btn-outline px-6 py-3.5">
              Compare factoring programs
            </Link>
            <Link href="/services" className="btn btn-outline px-6 py-3.5">
              Authority & compliance services
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="One more question?"
        title="We will answer it in under an hour"
        body={`Call ${org.salesPhoneDisplay} or send a message and a specialist — not a call center — will get back to you the same business day.`}
        primaryLabel="Talk to a specialist"
      />
    </>
  );
}
