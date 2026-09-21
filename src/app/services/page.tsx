import { PageHero } from "@/components/hero/PageHero";
import {
  AnswerBox,
  Btn,
  Container,
  CtaBand,
  ProcessSteps,
  Section,
  SectionHead,
  ServiceCard,
  TrustBadges,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { complianceServices, servicePath } from "@/content/services";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Trucking Authority, Permits & FMCSA Compliance Services",
  description:
    "New authority setup, BOC-3, Form 2290, IRP, IFTA, UCR, MCS-150, SCAC, DOT binders, drug consortium and ELD programs — filed fast, at disclosed prices. $40 client rates for factoring clients.",
  path: "/services",
  keywords: [
    "new authority setup",
    "BOC-3 filing",
    "form 2290 filing service",
    "IRP registration service",
    "IFTA filing service",
    "UCR registration",
    "MCS-150 update",
    "SCAC code",
    "DOT compliance binder",
    "drug and alcohol consortium",
  ],
  image: "/images/hero/compliance.jpg",
});

const faqs: Faq[] = [
  {
    q: "What does it cost to get a new trucking company compliant?",
    a: "At QP, the compliance stack starts at $200 for New Authority Set-Up and $60 each for BOC-3, Form 2290, UCR, MCS-150 and SCAC — and factoring clients pay $40 per item with a promo code. Government fees such as the FMCSA $300 authority fee are separate and disclosed up front.",
  },
  {
    q: "How fast can you file everything I need?",
    a: "Most filings are submitted within one business day and several are completed the same day, including BOC-3, UCR and MCS-150 updates. IRP and IFTA depend on your base state's processing time, which we track for you.",
  },
  {
    q: "Do I have to be a factoring client to use these services?",
    a: "No. Every QP service is available to any carrier. Factoring clients simply receive discounted pricing on most ancillary services and typically get faster coordination because we already hold your documents.",
  },
  {
    q: "Can QP handle renewals so nothing expires?",
    a: "Yes. UCR, IFTA, IRP, 2290 and MCS-150 biennials all run on cycles. We log your dates and reach out before they lapse, so filings never become emergency phone calls.",
  },
];

const steps = [
  {
    title: "Tell us where you are",
    body: "New authority or existing fleet? We map the compliance items you already have against what brokers, states and the FMCSA require of you.",
  },
  {
    title: "We file, you approve",
    body: "Every filing is prepared with your exact legal name, USDOT and MC numbers, then submitted electronically with fees disclosed before payment.",
  },
  {
    title: "Stay compliant, keep driving",
    body: "Documents land in your compliance binder and our system tracks renewal dates, so you never get surprised at a weigh station or broker audit.",
  },
];

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Authority & compliance"
        title="Every permit, filing and registration your authority requires"
        tagline="New authority setup, BOC-3, Form 2290, IRP plates, IFTA, UCR, MCS-150, SCAC, DOT binders, drug consortium and ELD programs — one team, published prices, no mystery fees."
        image="/images/hero/compliance.jpg"
        imageAlt="Trucking compliance paperwork, permits and registrations prepared by QP Trucking Solutions"
        variant="paperwork"
        accent="blue"
        trail={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        stats={[
          { label: "Carriers served", value: "1,000+" },
          { label: "Typical filing", value: "1 business day" },
          { label: "Renewal tracking", value: "Included" },
          { label: "Client pricing", value: "$40 / item" },
        ]}
        primaryHref="/get-started?service=new-authority"
        primaryLabel="Start my setup"
        priority
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div className="max-w-2xl">
              <AnswerBox
                question="What compliance services does QP handle for trucking companies?"
                answer="QP handles new FMCSA authority setup, BOC-3 process agent filings, Form 2290 heavy vehicle use tax, IRP apportioned registration, IFTA fuel tax accounts and filings, UCR registration, MCS-150 biennial updates, SCAC codes, DOT compliance binders, drug and alcohol consortium enrollment and ELD/dashcam programs."
              />
              <div className="mt-6 grid gap-4">
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  Compliance is where new carriers lose the most time. One missing filing keeps an MC number inactive,
                  one expired registration blocks a broker, and one missed 2290 stalls every plate on the fleet.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  We sequence the work correctly, file it electronically, and keep the copies — so when a broker asks
                  for your packet or an inspector asks for a document, the answer is already in your binder.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Btn href="/get-started?service=new-authority" variant="primary" withArrow>
                  Start my authority setup
                </Btn>
                <Btn href="/store" variant="outlineDark">
                  See every price
                </Btn>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-[1.2rem] border border-steel-200 bg-bone p-6">
                <p className="eyebrow text-brand-500">The start-up sequence, in order</p>
                <ol className="mt-4 grid gap-3">
                  {[
                    "LLC / corporation + EIN",
                    "USDOT number registration",
                    "MCS-150 identification report",
                    "Operating authority (MC number)",
                    "Insurance filings + BOC-3",
                    "IRP apportioned plates",
                    "Form 2290 heavy vehicle use tax",
                    "IFTA account + UCR registration",
                    "SCAC code + DOT compliance binder",
                  ].map((s, i) => (
                    <li key={s} className="flex items-center gap-3 border-t border-steel-200 pt-3 first:border-0 first:pt-0">
                      <span className="font-mono text-[0.7rem] font-semibold text-brand-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.95rem] font-semibold text-navy-900">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="steel" id="all-services">
        <Container>
          <SectionHead
            eyebrow="Services & pricing"
            title="Pick a service — see the price before you call"
            intro="Published pricing, discounted for QP factoring clients. Government fees are always itemized separately so nothing is a surprise."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {complianceServices.map((s, i) => (
              <ServiceCard key={s.slug} service={s} href={servicePath(s)} index={i} />
            ))}
          </div>
          <div className="mt-8 rounded-[1.2rem] border border-steel-200 bg-paper p-6">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-center">
              <div>
                <p className="eyebrow text-brand-500">Ordering several?</p>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-steel-600">
                  Most new authorities take the full start-to-finish package. Call and we will bundle the sequence —
                  factoring clients save $20 on each ancillary service with a promo code.
                </p>
              </div>
              <Btn href="/store" variant="primary" withArrow className="shrink-0">
                Open the catalog
              </Btn>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="How we work"
            title="Filed right, filed once, never forgotten"
            intro="Three steps that turn a compliance checklist into a background process you stop worrying about."
          />
          <div className="mt-10">
            <ProcessSteps steps={steps} tone="dark" />
          </div>
          <div className="mt-10">
            <TrustBadges
              items={[
                "Accuracy checked before filing",
                "Electronic submissions",
                "Fees disclosed up front",
                "$40 client rates",
                "Renewal reminders",
                "Documents stored for audits",
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
            <SectionHead
              eyebrow="Compliance FAQ"
              title="Authority, permits & filing questions"
              intro="The questions new carriers ask in their first week — and the ones established fleets ask at renewal time."
            />
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Authority & compliance · next step"
        title="Get compliant this week, not next month"
        body="Send us your details and we will tell you exactly which filings you still need — then handle them. Factoring clients save $20 on every ancillary service."
        serviceId="new-authority"
        primaryLabel="Start my setup"
      />
    </>
  );
}
