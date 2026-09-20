import { PageHero } from "@/components/hero/PageHero";
import {
  AnswerBox,
  Btn,
  Container,
  CtaBand,
  Section,
  SectionHead,
  TrustBadges,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { servicesBySlug, servicePath } from "@/content/services";
import { org } from "@/content/site";
import type { Faq } from "@/lib/types";

const service = servicesBySlug["insurance"];

export const metadata = buildMetadata({
  title: "Trucking Insurance Quotes — Liability, Cargo, Bobtail & Physical Damage",
  description:
    "Licensed trucking insurance agency placing primary liability, cargo, bobtail, physical damage, NTL and general liability for owner-operators and fleets. Fast binding, FMCSA filings handled, one-stop with factoring.",
  path: "/insurance",
  keywords: [
    "trucking insurance",
    "semi truck insurance quote",
    "new authority insurance",
    "cargo insurance trucking",
    "bobtail insurance",
    "non-trucking liability",
    "primary auto liability 1 million",
  ],
  image: "/images/hero/insurance.jpg",
});

const coverage = [
  {
    title: "Primary auto liability",
    body: "The coverage brokers require before they will release a load — commonly $750,000 to $1,000,000 combined single limit, filed with the FMCSA.",
  },
  {
    title: "Motor truck cargo",
    body: "Protects the freight you haul, with options for reefer breakdown, unattended vehicle and higher limits for high-value commodities.",
  },
  {
    title: "Physical damage",
    body: "Collision and comprehensive on your tractors and trailers, plus non-owned trailer coverage for drop-and-hook operations.",
  },
  {
    title: "Bobtail & non-trucking liability",
    body: "Coverage for owner-operators running without a trailer or under someone else's authority — required by most lease agreements.",
  },
  {
    title: "General liability & occupational accident",
    body: "For premises exposure, and occupational accident coverage as an alternative to workers' compensation in many states.",
  },
  {
    title: "Trailer interchange & endorsements",
    body: "Shipper-required endorsements, trailer interchange and specialty filings that show up in broker onboarding packets.",
  },
];

const faqs: Faq[] = [
  ...service.faqs,
  {
    q: "How fast can QP bind my trucking insurance?",
    a: "Often the same business day. Once we have your equipment details, driver information and radius of operation, we can quote multiple markets and bind coverage — then file the certificate directly with the FMCSA so your authority activates without delay.",
  },
  {
    q: "Do you insure new authorities with no loss history?",
    a: "Yes. New-authority carriers are one of our specialties. We place coverage with markets that understand first-year risk, and we coordinate the filings your MC number needs to go live.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          faqSchema(faqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Insurance", href: "/insurance" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "InsuranceAgency",
            name: "QP Trucking Insurance",
            parentOrganization: { "@id": "https://qpfactoring.com/#organization" },
            url: "https://qpfactoring.com/insurance",
            telephone: org.salesPhone,
            areaServed: "United States",
          },
        ]}
      />

      <PageHero
        eyebrow="QP Trucking Insurance"
        title="Trucking insurance that binds fast and pays when it matters"
        tagline="Liability, cargo, bobtail, physical damage, non-trucking liability and general liability — placed by licensed transportation agents who understand what brokers will ask for."
        image="/images/hero/insurance.jpg"
        imageAlt="Trucking insurance coverage for owner-operators and fleets from QP"
        variant="shield"
        accent="teal"
        trail={[
          { label: "Home", href: "/" },
          { label: "Insurance", href: "/insurance" },
        ]}
        stats={[
          { label: "Coverage types", value: "6+" },
          { label: "States served", value: "48" },
          { label: "Binding", value: "Same day" },
          { label: "Quote cost", value: "Free" },
        ]}
        primaryHref="#quote"
        primaryLabel="Get my free quote"
        secondaryHref={`tel:${org.salesPhone}`}
        secondaryLabel={`Call ${org.salesPhoneDisplay}`}
        priority
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div className="max-w-2xl">
              <AnswerBox
                question="What does trucking insurance cost at QP?"
                answer="Shopping your policy at QP costs nothing — our licensed agents quote multiple markets and disclose limits, deductibles and payment plans before you commit. Premiums depend on equipment value, commodities hauled, radius of operation, driver records and required limits, so we quote your actual operation instead of a generic average."
              />
              <div className="mt-6 grid gap-4">
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  At QP Trucking Insurance our mission is simple: provide comprehensive insurance solutions tailored to
                  the unique needs of trucking companies. With extensive expertise and diverse coverage options, we are
                  the partner carriers call before brokers and shippers ask for certificates.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  An active policy is required before your operating authority becomes active, so we coordinate
                  insurance filings, BOC-3 and your compliance paperwork together — no gaps, no second vendor, no
                  “we&apos;ll call you back.”
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {coverage.map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.05}>
                    <div className="h-full rounded-[1rem] border border-steel-200 bg-bone p-5">
                      <h3 className="font-display text-[1.02rem] font-bold text-navy-900">{c.title}</h3>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-steel-600">{c.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-7 rounded-[1.1rem] border border-steel-200 bg-paper p-5">
                <p className="eyebrow text-brand-500">Coverage questions agents ask first</p>
                <ul className="mt-3 grid gap-2 text-[0.92rem] text-steel-700 sm:grid-cols-2">
                  {[
                    "Tractor year, make and value",
                    "Trailer types and values",
                    "Commodities hauled (and hazmat status)",
                    "Radius: local, regional or 48 states",
                    "Driver list with license dates and MVRs",
                    "Current loss runs, if you have them",
                  ].map((q) => (
                    <li key={q} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="quote" className="lg:sticky lg:top-28">
              <LeadForm variant="quote" defaultService="Trucking insurance" eyebrow="Free, no-obligation" />
              <div className="mt-5 rounded-[1.1rem] border border-steel-200 bg-bone p-5">
                <p className="eyebrow text-brand-500">Already insured?</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-steel-600">
                  Send us your current declarations page. If we cannot beat your renewal, we will tell you — and if we
                  can, you will see the line-by-line difference.
                </p>
                <Btn href={`mailto:${org.email}`} variant="outlineDark" size="sm" className="mt-4">
                  Email {org.email}
                </Btn>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container>
          <SectionHead
            eyebrow="One-stop shop"
            title="Insurance is one piece — we handle the rest too"
            intro="Binding coverage is quicker when the same team already filed your authority, permits and factoring paperwork. Fewer forms, fewer handoffs, fewer delays."
          />
          <div className="mt-8">
            <TrustBadges
              items={[
                "Authority setup coordinated",
                "BOC-3 & UCR filed together",
                "Certificates to brokers",
                "FMCSA filings handled",
                "Annual renewal review",
                "Factoring bundled pricing",
              ]}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href={servicePath(servicesBySlug["new-authority"])} variant="outlineDark" withArrow>
              New authority setup
            </Btn>
            <Btn href={servicePath(servicesBySlug["boc-3"])} variant="outlineDark" withArrow>
              BOC-3 filing
            </Btn>
            <Btn href="/factoring" variant="outlineDark" withArrow>
              Factoring programs
            </Btn>
          </div>
        </Container>
      </Section>

      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
            <div>
              <SectionHead
                eyebrow="Insurance FAQ"
                title="Trucking insurance questions, answered"
                intro="From new authority minimums to cargo limits and claims support."
              />
              <div className="mt-6 rounded-[1.1rem] border border-steel-200 bg-paper p-5">
                <p className="eyebrow text-brand-500">Talk to an agent</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-steel-600">
                  {org.hoursDisplay}. Ask for the insurance desk.
                </p>
                <Btn href={`tel:${org.salesPhone}`} variant="outlineDark" className="mt-4 w-full">
                  Call {org.salesPhoneDisplay}
                </Btn>
              </div>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Ready to take the next step?"
        title="Get covered this week — and stay compliant while you do it"
        body={`Fill out the quote form or call ${org.salesPhoneDisplay} for a consultation with a knowledgeable agent. Let's make sure your trucking business is covered for whatever the road brings.`}
        serviceId="insurance"
        primaryLabel="Get my insurance quote"
      />
    </>
  );
}
