import { PageHero } from "@/components/hero/PageHero";
import {
  AnswerBox,
  Btn,
  Container,
  CtaBand,
  RelatedServices,
  Section,
  SectionHead,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { EquipmentFinanceForm } from "@/components/EquipmentFinanceForm";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { equipmentFinanceProgram as p, fuelCardProgram } from "@/content/programs";
import { org } from "@/content/site";

export const metadata = buildMetadata({
  title: p.metaTitle,
  description: p.metaDescription,
  path: p.path,
  keywords: p.keywords,
  image: p.heroImage,
});

const trail = [
  { label: "Home", href: "/" },
  { label: "Programs", href: p.path },
  { label: p.short, href: p.path },
];

export default function EquipmentFinancePage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(p.faqs)]} />

      <PageHero
        eyebrow={p.eyebrow}
        title={p.name}
        tagline={p.tagline}
        image={p.heroImage}
        imageAlt={p.imageAlt}
        variant={p.heroVariant}
        accent={p.accent}
        trail={trail}
        stats={p.heroStats}
        primaryHref="#apply"
        primaryLabel="Start my application"
        priority
      />

      {/* ------------------------- quick answer ------------------------- */}
      <Section tone="paper" className="!pb-8 sm:!pb-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <Reveal>
              <div className="max-w-2xl">
                <AnswerBox question={`${p.name} at QP — in one paragraph`} answer={p.answer} />
                <div className="mt-6 grid gap-4">
                  {p.intro.map((text, i) => (
                    <p key={i} className="text-[1.02rem] leading-relaxed text-steel-700">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="lg:sticky lg:top-28">
                <div className="rounded-[1.15rem] border border-steel-200 bg-bone p-6">
                  <p className="eyebrow text-brand-500">Have your paperwork ready</p>
                  <ul className="mt-4 grid gap-3">
                    {p.prepare.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[0.93rem] leading-snug text-navy-800">
                        <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true">
                          <path d="m5 10.5 3.2 3.2L15 6.9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 grid gap-2.5">
                    <Btn href="#apply" variant="primary" withArrow className="w-full">
                      Start my application
                    </Btn>
                    <Btn href={`tel:${org.salesPhone}`} variant="outlineDark" className="w-full">
                      Call {org.salesPhoneDisplay}
                    </Btn>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------- what we finance / why ------------------------- */}
      <Section tone="paper" className="!pt-8">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div>
                <SectionHead
                  eyebrow="What we finance"
                  title="Iron that earns while it pays"
                  rule={false}
                />
                <ul className="mt-6 grid gap-3">
                  {p.finances.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.98rem] leading-relaxed text-steel-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div>
                <SectionHead
                  eyebrow="Why finance through QP"
                  title="One roof, one team, one file"
                  rule={false}
                />
                <ul className="mt-6 grid gap-3">
                  {p.why.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.98rem] leading-relaxed text-steel-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------- application ------------------------- */}
      <Section tone="steel" id="apply">
        <Container>
          <SectionHead
            eyebrow="Application"
            title="Apply for equipment finance"
            intro="Five minutes to complete. A QP specialist reviews it personally and calls you back with structure options."
          />
          <Reveal className="mt-10">
            <EquipmentFinanceForm />
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------- FAQ ------------------------- */}
      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
            <div>
              <SectionHead
                eyebrow="FAQ"
                title="Equipment finance questions, answered"
                intro="What carriers ask before they pick out the truck."
              />
              <div className="mt-6 hidden border-t border-steel-200 pt-5 lg:block">
                <p className="eyebrow text-brand-500">Moving fast on a deal?</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-600">
                  Call {org.salesPhoneDisplay} and ask for equipment finance — have the seller's
                  quote in front of you.
                </p>
                <Btn href={`tel:${org.salesPhone}`} variant="outlineDark" className="mt-4 w-full">
                  Call {org.salesPhoneDisplay}
                </Btn>
              </div>
            </div>
            <FaqAccordion faqs={p.faqs} />
          </div>
        </Container>
      </Section>

      {/* ------------------------- related ------------------------- */}
      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="Keep going"
            title="Put the new truck to work"
            intro="Most carriers stack financing with the programs that keep it loaded and fueled."
          />
          <div className="mt-8">
            <RelatedServices
              items={[
                { label: "Transportation Factoring", href: "/factoring/trucking-factoring", blurb: "Turn the new truck's invoices into cash in minutes" },
                { label: fuelCardProgram.short, href: fuelCardProgram.path, blurb: "48¢/gal average savings on every fill" },
                { label: "Trucking Insurance", href: "/insurance", blurb: "Bind coverage before the wheels turn" },
                { label: "New Authority Setup", href: "/services/new-authority", blurb: "First truck? Start with the MC number" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow={`${p.short} · next step`}
        title="Ready to add iron to your fleet?"
        body={`Send the application or call ${org.salesPhoneDisplay} — the same team that knows your invoices will structure the deal.`}
        primaryLabel="Start my application"
        primaryHref="#apply"
      />
    </>
  );
}
