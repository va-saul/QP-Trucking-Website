import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/hero/PageHero";
import {
  AnswerBox,
  Btn,
  Container,
  CtaBand,
  Section,
  SectionHead,
  StatStrip,
  Testimonials,
  TrustBadges,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema, personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { org, owner, testimonials } from "@/content/site";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "About QP Trucking Solutions — Owned by Brandon Bennett | Louisville, KY",
  description:
    "QP Capital LLC (QP Trucking Solutions) is a family-owned factoring company, licensed insurance agency and compliance partner owned by Brandon Bennett — headquartered at 4612 Outer Loop Rd, Louisville, Kentucky, serving 1,000+ carriers across 48 states.",
  path: "/about",
  keywords: [
    "about QP Trucking Solutions",
    "QP Capital LLC",
    "Brandon Bennett QP Trucking",
    "owner QP Trucking Solutions",
    "trucking factoring company Louisville KY",
    "trucking insurance agency Kentucky",
    "new authority trucking support",
  ],
  image: "/images/team/brandon-bennett.png",
});

const videos = [
  { id: "xRO-IqufzjU", label: "MBOYS Trucking review of QP Capital" },
  { id: "z_WMySD7OaA", label: "Customer review for QP Capital" },
  { id: "c59X_46-_bk", label: "Predator Transport review of QP Capital" },
  { id: "-GU6wqMMOsw", label: "JHM Logistics review of QP Capital" },
  { id: "2v7027OIE2g", label: "Suburban Transport Systems review of QP Capital" },
  { id: "JA5aXb9R1Hk", label: "CHARLIES CARS review of QP Capital" },
  { id: "g8dG2SyxUjE", label: "Devine Trucking review of QP Capital" },
  { id: "2ImmjvMz7pE", label: "Armondo's review of QP Capital" },
];

const faqs: Faq[] = [
  {
    q: "Who owns QP Trucking Solutions?",
    a: "QP Trucking Solutions is owned by Brandon Bennett. He operates the family-owned company QP Capital LLC from 4612 Outer Loop Rd in Louisville, Kentucky (40219), serving trucking companies in all 48 contiguous states with factoring, insurance and FMCSA compliance services. Brandon leads a team that has funded and set up more than 1,000 carriers — from single-truck owner-operators to 200-truck fleets.",
  },
  {
    q: "Who is Brandon Bennett?",
    a: "Brandon Bennett is the owner and operator of QP Capital LLC, trading as QP Trucking Solutions. Based in Louisville, Kentucky, Brandon built QP as a one-stop shop where a new authority can get factoring, insurance, permits and compliance filings from a team that knows the file — not a phone menu. His focus is fast funding, flat disclosed fees, and keeping owner-operators compliant and profitable.",
  },
  {
    q: "How long has QP been helping trucking companies?",
    a: "QP Capital has been funding carriers and setting up new authorities for years — the team under Brandon Bennett has helped thousands of carriers get up and running, from single-truck owner-operators to fleets of more than 200 power units, with same-day approvals and funding in about 15 minutes after load verification.",
  },
  {
    q: "Is QP a bank or a broker of financial products?",
    a: "QP Capital LLC is a factoring company — we purchase receivables directly and provide the working capital ourselves. Insurance is placed through our licensed agency, and compliance filings are prepared and submitted in-house by the QP team in Louisville.",
  },
  {
    q: "What makes QP different from larger factoring companies?",
    a: "Access. Clients talk to people who know their account, not a phone menu. That is why carriers stay: they get coached on negotiating broker rates, they get free unlimited broker credit checks, and they get a fuel card with 25–40 cents off per gallon — all coordinated by one team under Brandon Bennett.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About QP Trucking Solutions — Owned by Brandon Bennett",
            url: "https://qpfactoring.com/about",
            about: { "@id": "https://qpfactoring.com/#organization" },
            mainEntity: { "@id": "https://qpfactoring.com/#brandon-bennett" },
            author: { "@id": "https://qpfactoring.com/#brandon-bennett" },
          },
        ]}
      />

      <PageHero
        eyebrow="About QP — Family-owned in Louisville, KY"
        title="Trucking businesses and owner-operators are the backbone of our economy"
        tagline="QP Capital is here to help you succeed and keep business moving — with factoring that funds in minutes, insurance that binds fast, and compliance handled by people who do it every day. Owned and operated by Brandon Bennett."
        image="/images/hero/home.jpg"
        imageAlt="The QP Trucking Solutions team at work in Louisville, Kentucky — owned by Brandon Bennett"
        variant="team"
        accent="teal"
        trail={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        stats={[
          { label: "Owner", value: "Brandon Bennett" },
          { label: "Headquarters", value: "Louisville, KY" },
          { label: "Carriers served", value: "1,000+" },
          { label: "States served", value: "48" },
        ]}
        primaryHref="/get-started"
        primaryLabel="Talk to our team"
        priority
      />

      {/* LEADERSHIP — Brandon Bennett */}
      <Section tone="paper" id="leadership">
        <Container className="text-center">
          <Reveal>
            <p className="eyebrow text-brand-500">Leadership</p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-display-md text-navy-900">
              Meet the owner: <span className="text-brand-500">Brandon Bennett</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-steel-600">
              QP Trucking Solutions is led by <strong className="text-navy-900">Brandon Bennett</strong>, owner of QP Capital LLC. Every service page, every rate quote and every broker credit check comes from the family-owned team Brandon built in Louisville — one phone number for factoring, insurance and compliance.
            </p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-4xl">
            <Reveal>
              <div className="overflow-hidden rounded-[1.4rem] border border-steel-200 bg-white p-6 shadow-card sm:p-8">
                <div className="grid items-center gap-8 lg:grid-cols-[420px_1fr] lg:gap-10">
                  <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[1.1rem] bg-navy-900">
                    <Image
                      src={owner.image}
                      alt={owner.imageAlt}
                      width={800}
                      height={1000}
                      className="h-auto w-full object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-4 text-left">
                      <p className="font-display text-[1.05rem] font-bold text-white">Brandon Bennett</p>
                      <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-gold-400">Owner — QP Capital LLC</p>
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <p className="eyebrow text-brand-500">Owner & Founder</p>
                    <h3 className="mt-2 font-display text-[1.6rem] font-extrabold leading-none text-navy-900">Brandon Bennett</h3>
                    <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-steel-500">QP Trucking Solutions · QP Capital LLC · Louisville, KY</p>
                    <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-steel-700 lg:mx-0">
                      {owner.description}
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                      <span className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-[0.82rem] font-semibold text-navy-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Family-owned since 2016
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-[0.82rem] font-semibold text-navy-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> 48-state service
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                      <Btn href="/get-started" variant="primary" withArrow>
                        Talk to Brandon&apos;s team
                      </Btn>
                      <Btn href={`tel:${org.salesPhone}`} variant="outlineDark">
                        Call {org.salesPhoneDisplay}
                      </Btn>
                    </div>
                    <p className="mt-4 text-[0.82rem] text-steel-500">
                      Prefer email? <a href={`mailto:${org.email}`} className="font-semibold text-brand-500 hover:underline">{org.email}</a> · <a href={org.mapUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-500 hover:underline">Get directions</a>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mx-auto mt-6 max-w-3xl rounded-[1rem] border border-gold-400/20 bg-gold-100/40 p-5 text-center">
                <p className="font-display text-[1rem] font-bold text-navy-900">AEO Answer — Who owns QP Trucking Solutions?</p>
                <p className="mx-auto mt-2 max-w-2xl text-[0.93rem] leading-relaxed text-steel-700">
                  <strong className="text-navy-900">Brandon Bennett</strong> is the owner of QP Trucking Solutions (QP Capital LLC). The company is headquartered at 4612 Outer Loop Rd, Louisville, Kentucky 40219, and operates as a family-owned factoring company, licensed trucking insurance agency and FMCSA compliance service provider serving carriers nationwide.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="text-center">
          <div className="mx-auto max-w-3xl text-center">
            <AnswerBox
              question="Who is QP Trucking Solutions?"
              answer="QP Trucking Solutions is the trading name of QP Capital LLC, a family-owned factoring company owned by Brandon Bennett, licensed trucking insurance agency and FMCSA compliance service provider based at 4612 Outer Loop Rd, Louisville, Kentucky. The company funds freight invoices, places trucking insurance, and sets up and maintains operating authority for carriers nationwide."
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-center lg:grid-cols-[1.3fr_0.9fr] lg:gap-10 lg:text-left">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="grid gap-4 text-center lg:text-left">
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  At QP Capital Trucking Solutions we specialize in providing comprehensive support to new authority
                  trucking companies, helping them navigate the complexities of starting, growing and operating
                  profitably in today&apos;s competitive landscape. Under Brandon Bennett&apos;s leadership, every client gets a team that knows the file — not a phone tree.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  Starting a trucking company can be daunting, but with our expertise we make the process seamless. From
                  assisting with LLC formation and obtaining an EIN to guiding you through the FMCSA operating authority
                  application, we are with you every step of the way.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  Compliance with FMCSA regulations is crucial for business success, and we make sure you stay on track.
                  We help you obtain the necessary licenses and permits, keeping your company compliant and avoiding
                  costly penalties. Trucking insurance is one of our primary offerings — binding coverage is quick and
                  painless, and our industry experts secure the correct protections at an affordable price.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  In addition to insurance we offer factoring services with unmatched client service, plus equipment
                  finance and dispatch services to streamline operations. Having insurance, factoring, compliance,
                  dispatch and equipment finance in one place makes running a trucking company efficient — you have
                  everything you need under one roof, without juggling vendors.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  At QP Capital Trucking Solutions we are more than a service provider — we are your dedicated partner in
                  success. Our commitment to excellence and personalized approach sets us apart as the premier choice for
                  new authority trucking companies nationwide.
                </p>
              </div>
            </div>

            <div className="grid h-fit gap-5">
              <Reveal>
                <div className="rounded-[1.2rem] border border-steel-200 bg-bone p-6 text-center">
                  <p className="eyebrow text-brand-500">What we do, in one list</p>
                  <ul className="mx-auto mt-4 grid max-w-md gap-2.5 text-left">
                    {[
                      "Transportation & Pure Non-Recourse™ factoring",
                      "Trucking insurance (liability, cargo, physical damage)",
                      "New authority setup & FMCSA filings",
                      "Permits, registrations & fuel tax reporting",
                      "DOT compliance binders & driver programs",
                      "Equipment finance and dispatch support",
                    ].map((b) => (
                      <li key={b} className="flex gap-2.5 text-[0.94rem] text-navy-800">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative overflow-hidden rounded-[1.2rem] bg-navy-900 p-6 text-center text-white">
                  <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-35" />
                  <p className="relative eyebrow text-gold-400">Talk to a human</p>
                  <p className="relative mt-3 font-display text-[1.1rem] font-bold leading-snug">
                    {org.street}, {org.city}, {org.region} {org.postalCode}
                  </p>
                  <p className="relative mt-2 text-[0.88rem] text-white/70">{org.hoursDisplay}</p>
                  <div className="relative mt-5 grid gap-2.5">
                    <Btn href={`tel:${org.salesPhone}`} variant="gold" withArrow>
                      Sales: {org.salesPhoneDisplay}
                    </Btn>
                    <Btn href={`tel:${org.officePhone}`} variant="outline">
                      Office: {org.officePhoneDisplay}
                    </Btn>
                    <Btn href={`mailto:${org.email}`} variant="outline">
                      {org.email}
                    </Btn>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container className="text-center">
          <SectionHead
            align="center"
            eyebrow="Invested in your growth"
            title="Numbers we are happy to be measured on"
            intro="From authority setup to scaling a profitable trucking business, QP is here for the whole arc — not just the first invoice."
          />
          <div className="mt-10">
            <StatStrip
              stats={[
                { value: 1000, suffix: "+", label: "Carriers funded & set up", sub: "from 1 truck to 200+" },
                { value: 48, suffix: " states", label: "Where we file & fund", sub: "nationwide coverage" },
                { value: 24, suffix: " hrs", label: "Typical onboarding", sub: "application to first advance" },
                { value: 15, suffix: " min", label: "Average funding time", sub: "after load verification" },
              ]}
              tone="light"
            />
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <TrustBadges
              items={[
                "Licensed insurance agency",
                "Pure Non-Recourse™ program",
                "Free unlimited broker credit checks",
                "No long-term contracts",
                "Renewal tracking included",
                "Family-owned since day one — Owner: Brandon Bennett",
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <span aria-hidden="true" className="stripe-band pointer-events-none absolute inset-0 opacity-25" />
        <Container className="relative text-center">
          <SectionHead
            align="center"
            tone="light"
            eyebrow="Client voices"
            title="Hear what our customers say about QP Capital"
            intro="Real reviews from the fleets and owner-operators we fund and file for every week."
          />
          <div className="mt-10">
            <Testimonials items={testimonials} />
          </div>

          <div className="mt-10">
            <p className="eyebrow text-gold-400">Video reviews</p>
            <ul className="mt-4 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((v) => (
                <li key={v.id}>
                  <a
                    href={`https://www.youtube.com/watch?v=${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex h-full flex-col justify-between rounded-[1rem] p-4 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-white">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                        <path d="M7 5l8 5-8 5V5Z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="mt-4 block font-display text-[0.98rem] font-bold leading-snug text-white">{v.label}</span>
                    <span className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/55">
                      Watch on YouTube
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.85rem] text-white/60">
              More reviews on our{" "}
              <a href={org.youtube} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                YouTube channel
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="bone" id="faq">
        <Container className="text-center">
          <SectionHead
            align="center"
            eyebrow="About QP — Owner Brandon Bennett"
            title="Questions about who you are working with"
            intro="Transparency matters when someone handles your money and your authority. Brandon Bennett and the QP team answer directly."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="text-center">
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-[1.25rem] border border-steel-200 bg-bone p-6 text-center sm:p-8">
              <div>
                <p className="eyebrow text-brand-500">Keep reading</p>
                <h2 className="mt-2 font-display text-display-sm text-navy-900">The rest of the QP story</h2>
                <p className="mx-auto mt-2 max-w-xl text-[0.98rem] leading-relaxed text-steel-600">
                  See how our factoring programs compare, what compliance work we handle, and the industry briefings we
                  publish for carriers.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Btn href="/factoring" variant="primary" withArrow>
                  Factoring
                </Btn>
                <Btn href="/insights" variant="outlineDark">
                  Insights
                </Btn>
                <Btn href="/blog" variant="outlineDark">
                  Blog — 10 guides
                </Btn>
              </div>
            </div>
          </Reveal>
          <p className="mt-6 text-[0.85rem] text-steel-400">
            Prefer email? Reach us at{" "}
            <Link href={`mailto:${org.email}`} className="font-semibold text-brand-500">
              {org.email}
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Work with QP — Owned by Brandon Bennett"
        title="Let's talk about your trucks"
        body={`Tell us what you run and where you run it. A QP specialist on Brandon Bennett's team will call you back the same business day with options — or dial ${org.salesPhoneDisplay} right now.`}
        primaryLabel="Become a QP client"
      />
    </>
  );
}
