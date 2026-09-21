import Image from "next/image";
import Link from "next/link";
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
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { org, testimonials } from "@/content/site";
import type { Faq } from "@/lib/types";

const owner = {
  name: "Brandon Bennett",
  role: "Owner",
  image: "/images/team/brandon-bennett.webp",
  imageWidth: 1145,
  imageHeight: 1374,
  profileUrl: `${org.url}/about#brandon-bennett`,
};

export const metadata = buildMetadata({
  title: "About QP Trucking Solutions — Louisville, KY Factoring & Insurance",
  description:
    `Meet ${owner.name}, owner of QP Trucking Solutions, and the Louisville team helping carriers with factoring, trucking insurance and compliance.`,
  path: "/about",
  keywords: [
    "about QP Trucking Solutions",
    owner.name,
    "QP Trucking Solutions owner",
    "QP Capital LLC",
    "trucking factoring company Louisville KY",
    "trucking insurance agency Kentucky",
    "new authority trucking support",
  ],
  image: "/images/hero/home.jpg",
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
    a: `${owner.name} is the owner of QP Trucking Solutions, operated by QP Capital LLC. The family-owned company is based in Louisville, Kentucky, and serves trucking companies nationwide.`,
  },
  {
    q: "How long has QP been helping trucking companies?",
    a: "QP Capital has been funding carriers and setting up new authorities for years — the team has helped thousands of carriers get up and running, from single-truck owner-operators to fleets of more than 200 power units.",
  },
  {
    q: "Is QP a bank or a broker of financial products?",
    a: "QP Capital LLC is a factoring company — we purchase receivables directly and provide the working capital ourselves. Insurance is placed through our licensed agency, and compliance filings are prepared and submitted in-house.",
  },
  {
    q: "What makes QP different from larger factoring companies?",
    a: "Access. Clients talk to people who know their account, not a phone menu. That is why carriers stay: they get coached on negotiating broker rates, they get free broker credit checks, and they get a fuel card with real discounts.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About QP Trucking Solutions",
            url: `${org.url}/about`,
            about: { "@id": `${org.url}/#organization` },
            mentions: { "@id": owner.profileUrl },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": owner.profileUrl,
            name: owner.name,
            jobTitle: owner.role,
            description: `${owner.role} of ${org.name}.`,
            image: `${org.url}${owner.image}`,
            url: owner.profileUrl,
            worksFor: { "@id": `${org.url}/#organization` },
          },
        ]}
      />

      <PageHero
        eyebrow="About QP"
        title="Trucking businesses and owner-operators are the backbone of our economy"
        tagline="QP Capital is here to help you succeed and keep business moving — with factoring that funds in minutes, insurance that binds fast, and compliance handled by people who do it every day."
        image="/images/hero/home.jpg"
        imageAlt="The QP Trucking Solutions team at work in Louisville, Kentucky"
        variant="team"
        accent="teal"
        trail={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        stats={[
          { label: "Headquarters", value: "Louisville, KY" },
          { label: "Carriers served", value: "1,000+" },
          { label: "States served", value: "48" },
          { label: "Vendor count", value: "One" },
        ]}
        primaryHref="/get-started"
        primaryLabel="Talk to our team"
        secondaryHref="#brandon-bennett"
        secondaryLabel="Meet the owner"
        priority
      />

      <section
        id="brandon-bennett"
        aria-labelledby="owner-heading"
        className="scroll-mt-28 bg-bone py-16 text-navy-900 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="mx-auto w-full max-w-md md:mx-0">
              <figure className="overflow-hidden rounded-[1.25rem] border border-navy-900/10 bg-navy-900 shadow-lift">
                <Image
                  src={owner.image}
                  alt={`${owner.name}, ${owner.role} of ${org.name}`}
                  width={owner.imageWidth}
                  height={owner.imageHeight}
                  sizes="(max-width: 767px) 100vw, (max-width: 1179px) 42vw, 440px"
                  className="block h-auto w-full"
                />
                <figcaption className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 sm:px-6">
                  <span className="text-[0.78rem] font-semibold text-white">{org.name}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-gold-400">
                    {org.city}, {org.region}
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="eyebrow flex items-center gap-3 text-brand-500">
                <span aria-hidden="true" className="h-px w-8 bg-gold-600" />
                Meet the owner
              </p>
              <h2 id="owner-heading" className="mt-4 font-display text-display-lg text-navy-900">
                {owner.name}
              </h2>
              <p className="mt-3 text-[1.05rem] font-semibold text-brand-600">
                {owner.role}, {org.name}
              </p>

              <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-steel-700">
                <p>
                  {owner.name} is the owner of {org.name}, a family-owned company based in Louisville, Kentucky.
                </p>
                <p>
                  From your first authority to your next stage of growth, QP brings factoring, trucking insurance and
                  compliance support together — so you can focus on the road ahead.
                </p>
              </div>

              <div className="mt-7 border-t border-steel-200 pt-6">
                <p className="font-display text-display-sm font-bold text-navy-900">
                  Family-owned. Carrier-focused.
                </p>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-steel-600">
                  One team for your cash flow, coverage and compliance.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Btn href="/contact" variant="primary" withArrow>
                  Connect with our team
                </Btn>
                <a
                  href={`tel:${org.salesPhone}`}
                  aria-label={`Call QP Trucking Solutions at ${org.salesPhoneDisplay}`}
                  className="text-[0.94rem] font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4 transition-colors hover:text-brand-500"
                >
                  {org.salesPhoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div className="max-w-2xl">
              <AnswerBox
                question="Who is QP Trucking Solutions?"
                answer="QP Trucking Solutions is the trading name of QP Capital LLC, a family-owned factoring company, licensed trucking insurance agency and FMCSA compliance service provider based at 4612 Outer Loop Rd, Louisville, Kentucky. The company funds freight invoices, places trucking insurance, and sets up and maintains operating authority for carriers nationwide."
              />
              <div className="mt-6 grid gap-4">
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  At QP Capital Trucking Solutions we specialize in providing comprehensive support to new authority
                  trucking companies, helping them navigate the complexities of starting, growing and operating
                  profitably in today&apos;s competitive landscape.
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

            <div className="grid h-fit gap-5 lg:sticky lg:top-28">
              <Reveal>
                <div className="rounded-[1.2rem] border border-steel-200 bg-bone p-6">
                  <p className="eyebrow text-brand-500">What we do, in one list</p>
                  <ul className="mt-4 grid gap-2.5">
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
                <div className="relative overflow-hidden rounded-[1.2rem] bg-navy-900 p-6 text-white">
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
        <Container>
          <SectionHead
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
          <div className="mt-10">
            <TrustBadges
              items={[
                "Licensed insurance agency",
                "Pure Non-Recourse™ program",
                "Free unlimited broker credit checks",
                "No long-term contracts",
                "Renewal tracking included",
                "Family-owned since day one",
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <span aria-hidden="true" className="stripe-band pointer-events-none absolute inset-0 opacity-25" />
        <Container className="relative">
          <SectionHead
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
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
            <SectionHead
              eyebrow="About QP"
              title="Questions about who you are working with"
              intro="Transparency matters when someone handles your money and your authority."
            />
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-[1.25rem] border border-steel-200 bg-bone p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="eyebrow text-brand-500">Keep reading</p>
                <h2 className="mt-2 font-display text-display-sm text-navy-900">The rest of the QP story</h2>
                <p className="mt-2 max-w-xl text-[0.98rem] leading-relaxed text-steel-600">
                  See how our factoring programs compare, what compliance work we handle, and the industry briefings we
                  publish for carriers.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Btn href="/factoring" variant="primary" withArrow>
                  Factoring
                </Btn>
                <Btn href="/insights" variant="outlineDark">
                  Insights
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
        eyebrow="Work with QP"
        title="Let's talk about your trucks"
        body={`Tell us what you run and where you run it. A QP specialist will call you back the same business day with options — or dial ${org.salesPhoneDisplay} right now.`}
        primaryLabel="Become a QP client"
      />
    </>
  );
}
