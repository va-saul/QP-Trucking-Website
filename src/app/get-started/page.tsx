import { PageHero } from "@/components/hero/PageHero";
import { AnswerBox, Btn, Container, CtaBand, Section, SectionHead, TrustBadges } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { org, SITE_URL } from "@/content/site";
import { servicesBySlug, servicePath } from "@/content/services";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Get Started — Free Factoring Consultation",
  description:
    "Request a free consultation, apply for factoring, or ask about insurance, authority setup and compliance. Same-day callbacks. Call 833-762-3464.",
  path: "/get-started",
  keywords: [
    "start trucking factoring",
    "free trucking consultation",
    "apply for freight factoring",
    "get trucking insurance quote",
    "new authority help",
  ],
  image: "/images/hero/new-authority.jpg",
});

const faqs: Faq[] = [
  {
    q: "What happens after I submit the form?",
    a: "A QP specialist calls you back — usually within the hour during business hours — to understand your trucks, lanes and customers, then quotes factoring, insurance or compliance work as needed. Nothing is charged and you are not committing to anything.",
  },
  {
    q: "What documents do I need to start factoring?",
    a: "Your operating authority letter, certificate of insurance, a signed W-9, and a customer list (the brokers and shippers you haul for). We run credit on those customers at no cost to you.",
  },
  {
    q: "How quickly can I be set up and funded?",
    a: "Most carriers complete onboarding in under 24 hours. Once your packet is approved and your first load is verified, funds usually reach your QP Card in about 15 minutes or arrive by ACH the same business day.",
  },
  {
    q: "Is there a cost to apply or cancel?",
    a: "No. Applying is free, there is no long-term contract and no cancellation penalty. You can factor a single invoice or your entire operation, and stop whenever you choose.",
  },
  {
    q: "Can you start my authority and factoring at the same time?",
    a: "Yes, and it is the fastest path to revenue. QP files your authority, insurance, BOC-3 and registrations while setting up your factoring account, so you can book your first load the day your MC number goes active.",
  },
];

export default function GetStartedPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Get started", href: "/get-started" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Get started with QP Trucking Solutions",
            description:
              "Request a free consultation, apply for factoring, or get trucking insurance and compliance help from QP Trucking Solutions.",
            url: `${SITE_URL}/get-started`,
          },
        ]}
      />

      <PageHero
        eyebrow="Get started"
        title="Free consultation — tell us about your trucking business"
        tagline="Fill out the form and a QP specialist will reach out to help you get started with factoring, insurance, authority setup or whatever is blocking your cash flow."
        image="/images/hero/new-authority.jpg"
        imageAlt="Get started with QP Trucking Solutions factoring and compliance"
        variant="support"
        accent="blue"
        trail={[
          { label: "Home", href: "/" },
          { label: "Get started", href: "/get-started" },
        ]}
        stats={[
          { label: "Callback", value: "Under 1 hr" },
          { label: "Setup", value: "24 hrs" },
          { label: "Minimums", value: "None" },
          { label: "Contract", value: "None" },
        ]}
        primaryHref="#form"
        primaryLabel="Jump to the form"
        secondaryHref={`tel:${org.salesPhone}`}
        secondaryLabel={`Call ${org.salesPhoneDisplay}`}
        priority
      />

      <Section tone="paper" id="form">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div id="consult">
              <LeadForm defaultService="" variant="consult" eyebrow="Free consultation" title="Fill out the form →" />
              <Reveal className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Sales & new clients", v: org.salesPhoneDisplay, href: `tel:${org.salesPhone}` },
                  { k: "Office / accounting", v: org.officePhoneDisplay, href: `tel:${org.officePhone}` },
                  { k: "Email", v: org.email, href: `mailto:${org.email}` },
                ].map((c) => (
                  <a
                    key={c.k}
                    href={c.href}
                    className="card-hover rounded-[1rem] border border-steel-200 bg-bone p-4 text-center"
                  >
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-steel-600">{c.k}</span>
                    <span className="mt-1.5 block font-display text-[0.98rem] font-bold text-navy-900">{c.v}</span>
                  </a>
                ))}
              </Reveal>
            </div>

            <div className="grid h-fit gap-5 lg:sticky lg:top-28">
              <AnswerBox
                question="How do I get started with QP Trucking Solutions?"
                answer="Call 833-762-3464 for sales or 502-398-6333 for the office/accounting desk, or complete the consultation form on this page. A specialist collects your authority, insurance and customer details, quotes a flat fee, and most carriers are fully set up and funding loads within 24 hours."
              />
              <div className="rounded-[1.15rem] border border-steel-200 bg-bone p-6">
                <p className="eyebrow text-brand-500">What happens next</p>
                <ol className="mt-4 grid gap-4">
                  {[
                    { t: "We call you back", b: "Usually within the hour during business hours. One specialist owns your file from day one." },
                    { t: "We quote you in writing", b: "Factoring rate, insurance options and any compliance work — all itemized, no surprises." },
                    { t: "You sign and send documents", b: "Authority, insurance certificate, W-9 and customer list. We handle broker credit checks." },
                    { t: "You get funded", b: "Deliver a load, snap the paperwork in the QP app, and watch funds land — often in minutes." },
                  ].map((s, i) => (
                    <li key={s.t} className="flex gap-3.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 font-mono text-[0.7rem] font-semibold text-white">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-display text-[0.98rem] font-bold text-navy-900">{s.t}</span>
                        <span className="mt-1 block text-[0.88rem] leading-relaxed text-steel-600">{s.b}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-[1.15rem] border border-steel-200 bg-paper p-6">
                <p className="eyebrow text-brand-500">Ready to apply now?</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-steel-600">
                  The full application takes about five minutes and includes everything our underwriting team needs.
                </p>
                <Btn href={org.applicationUrl} variant="primary" withArrow className="mt-4 w-full">
                  Start the application
                </Btn>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <SectionHead
              eyebrow="Not sure what you need?"
              title="Most carriers start with one of these three things"
              intro="Tell us which of these sounds like your week and we will point you to the fastest fix."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { s: servicesBySlug["trucking-factoring"], blurb: "Cash is stuck in unpaid invoices" },
                { s: servicesBySlug["new-authority"], blurb: "Starting fresh and need authority" },
                { s: servicesBySlug["insurance"], blurb: "Need coverage to activate or renew" },
              ].map(({ s, blurb }, i) => (
                <Reveal key={s.slug} delay={i * 0.07}>
                  <div className="flex h-full flex-col rounded-[1.1rem] border border-steel-200 bg-paper p-5">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-brand-500">{blurb}</p>
                    <h3 className="mt-3 font-display text-[1.05rem] font-bold text-navy-900">{s.short}</h3>
                    <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-steel-600">{s.tagline}</p>
                    <Btn
                      href={servicePath(s)}
                      variant="outlineDark"
                      size="sm"
                      className="mt-4"
                    >
                      Learn more
                    </Btn>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <TrustBadges
              items={[
                "No application fee",
                "No long-term contract",
                "Free broker credit checks",
                "Bank-grade document handling",
                "Human support, no phone trees",
                "Family-owned in Louisville, KY",
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
            <SectionHead
              eyebrow="Onboarding FAQ"
              title="Getting started — the details"
              intro="Documents, timelines and what happens after you hit submit."
            />
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Prefer to talk?"
        title="Call and speak to a specialist in under a minute"
        body={`No menus, no scripts. Dial ${org.salesPhoneDisplay} for sales or ${org.officePhoneDisplay} for accounting and office questions.`}
        primaryLabel="Start my application"
      />
    </>
  );
}
