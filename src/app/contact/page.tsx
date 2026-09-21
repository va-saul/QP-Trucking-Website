import { PageHero } from "@/components/hero/PageHero";
import { Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { org } from "@/content/site";

export const metadata = buildMetadata({
  title: "Contact QP Trucking Solutions — Louisville, KY · 833-762-3464",
  description:
    "Contact QP Trucking Solutions at 4612 Outer Loop Rd, Louisville KY 40219. Sales 833-762-3464, office and accounting 502-398-6333, email info@qpfactoring.com. Open Mon–Fri 8AM–8PM EST.",
  path: "/contact",
  keywords: [
    "contact QP Trucking Solutions",
    "trucking factoring Louisville KY",
    "QP Capital contact",
    "trucking insurance contact",
  ],
  image: "/images/hero/compliance.jpg",
});

export default function ContactPage() {
  const channels = [
    {
      k: "Sales & new clients",
      v: org.salesPhoneDisplay,
      sub: "Factoring quotes, insurance, authority setup",
      href: `tel:${org.salesPhone}`,
      cta: "Call sales",
      accent: "gold" as const,
    },
    {
      k: "Office / accounting questions",
      v: org.officePhoneDisplay,
      sub: "Existing clients, statements, payments",
      href: `tel:${org.officePhone}`,
      cta: "Call the office",
      accent: "blue" as const,
    },
    {
      k: "Email us",
      v: org.email,
      sub: "Documents, quotes and general questions",
      href: `mailto:${org.email}`,
      cta: "Send email",
      accent: "blue" as const,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact QP Trucking Solutions",
            url: "https://qpfactoring.com/contact",
            mainEntity: {
              "@type": "Organization",
              "@id": "https://qpfactoring.com/#organization",
              name: org.name,
              telephone: org.officePhone,
              email: org.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: org.street,
                addressLocality: org.city,
                addressRegion: org.region,
                postalCode: org.postalCode,
                addressCountry: org.country,
              },
              openingHours: "Mo-Fr 08:00-20:00",
            },
          },
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Talk to QP Trucking Solutions"
        tagline="Please provide a few details and we will contact you right away — or call the desk you need directly. Real people in Louisville answer the phone."
        image="/images/hero/compliance.jpg"
        imageAlt="QP Trucking Solutions client support team in Louisville, Kentucky"
        variant="support"
        accent="blue"
        trail={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        stats={[
          { label: "Sales", value: org.salesPhoneDisplay },
          { label: "Office", value: org.officePhoneDisplay },
          { label: "Hours", value: "8–8 EST" },
          { label: "Response", value: "Under 1 hr" },
        ]}
        primaryHref="#contact-form"
        primaryLabel="Send a message"
        secondaryHref={`tel:${org.salesPhone}`}
        secondaryLabel={`Call ${org.salesPhoneDisplay}`}
        priority
      />

      <Section tone="paper" id="contact-form">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="grid h-fit gap-4">
              {channels.map((c, i) => (
                <Reveal key={c.k} delay={i * 0.06}>
                  <a
                    href={c.href}
                    className="card-hover flex items-center justify-center gap-4 rounded-[1.15rem] border border-steel-200 bg-paper p-5 text-center sm:p-6"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-600">
                        {c.k}
                      </span>
                      <span className="mt-1.5 block truncate font-display text-[1.2rem] font-extrabold text-navy-900">
                        {c.v}
                      </span>
                      <span className="mt-1 block text-[0.86rem] text-steel-600">{c.sub}</span>
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        c.accent === "gold" ? "bg-gold-400 text-navy-950" : "bg-brand-500 text-white"
                      }`}
                    >
                      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                        <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </Reveal>
              ))}

              <Reveal delay={0.2}>
                <div className="relative overflow-hidden rounded-[1.15rem] border border-steel-200 bg-bone p-6">
                  <span aria-hidden="true" className="stripe-band-solid absolute -right-8 top-0 h-28 w-24 rotate-12 opacity-70" />
                  <p className="eyebrow text-brand-500">Address & hours</p>
                  <address className="mt-3 not-italic">
                    <p className="font-display text-[1.05rem] font-bold text-navy-900">
                      {org.legalName}
                      <br />
                      {org.street}
                      <br />
                      {org.city}, {org.region} {org.postalCode}
                    </p>
                  </address>
                  <p className="mt-3 text-[0.92rem] text-steel-600">Business hours: {org.hoursDisplay}</p>
                  <a
                    href={org.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-bold text-brand-500 link-sweep"
                  >
                    Get directions
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            </div>

            <div>
              <LeadForm
                variant="consult"
                eyebrow="Send a message"
                title="Tell us what you need and we will call you right back"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container>
          <SectionHead
            eyebrow="Quick routing"
            title="Not sure who to call?"
            intro="Here is how most people find their answer fastest."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "I want a factoring quote", h: "/factoring", c: "Compare programs" },
              { t: "I need a new MC number", h: "/services/new-authority", c: "Authority setup" },
              { t: "I need insurance now", h: "/insurance", c: "Get a quote" },
              { t: "I have a billing question", h: `/tel:${org.officePhone}`, c: `Call ${org.officePhoneDisplay}` },
            ].map((r, i) => (
              <Reveal key={r.t} delay={i * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-[1.1rem] border border-steel-200 bg-paper p-5">
                  <h3 className="font-display text-[1.02rem] font-bold text-navy-900">{r.t}</h3>
                  <Btn href={r.h} variant="outlineDark" size="sm" className="mt-4 self-start">
                    {r.c}
                  </Btn>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="We are open"
        title={`Call now — ${org.hoursDisplay}`}
        body={`Sales: ${org.salesPhoneDisplay} · Office and accounting: ${org.officePhoneDisplay} · Email: ${org.email}. If we miss you, we call back the same business day.`}
        primaryLabel="Become a QP client"
      />
    </>
  );
}
