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
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { fuelCardProgram as p, ambassadorProgram, circleNetworkProgram } from "@/content/programs";
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

export default function FuelCardPage() {
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
        primaryHref={p.wexUrl}
        primaryLabel="Start my fuel card application"
        priority
      />

      {/* ------------------------- quick answer ------------------------- */}
      <Section tone="paper" className="!pb-8 sm:!pb-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <Reveal>
              <div className="max-w-2xl">
                <AnswerBox question={`${p.name} — in one paragraph`} answer={p.answer} />
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
                  <p className="eyebrow text-brand-500">Get the card</p>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-steel-700">
                    Apply through the fuel card portal, or call and a dedicated account rep will
                    walk you through the approval path that fits your credit.
                  </p>
                  <div className="mt-5 grid gap-2.5">
                    <Btn href={p.wexUrl} variant="primary" withArrow className="w-full">
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

      {/* ------------------------- three pillars ------------------------- */}
      <Section tone="paper" className="!pt-8">
        <Container>
          <SectionHead
            eyebrow="Fuel solutions suite"
            title="Industry-leading savings and financial flexibility"
            intro="Three reasons carriers move their fuel spend onto the QP Card."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { title: "Nation's largest discount network", items: p.network },
              { title: "Flexible approval", items: p.approvals, sub: "Credit challenges? No problem." },
              { title: "Carrier savings", items: p.savings, sub: "Real-world impact" },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 0.07}>
                <div className="h-full rounded-[1.15rem] border border-steel-200 bg-paper p-6">
                  <h3 className="font-display text-[1.15rem] font-bold text-navy-900">{col.title}</h3>
                  {col.sub ? <p className="mt-1 text-[0.85rem] font-semibold text-gold-600">{col.sub}</p> : null}
                  <ul className="mt-4 grid gap-3">
                    {col.items.map((b) => (
                      <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-steel-700">
                        <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true">
                          <path d="m5 10.5 3.2 3.2L15 6.9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------- fee structure ------------------------- */}
      <Section tone="steel">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div>
                <SectionHead
                  eyebrow="QP Card fee structure"
                  title="Plain fees, published"
                  intro="What the card costs to use — the two lines that matter most are $0."
                  rule={false}
                />
                <div className="mt-6 overflow-hidden rounded-[1.15rem] border border-steel-200 bg-paper">
                  <ul className="divide-y divide-steel-100">
                    {p.fees.map((f) => (
                      <li key={f.item} className="flex items-baseline justify-between gap-4 px-5 py-3.5">
                        <span className="text-[0.95rem] text-steel-700">{f.item}</span>
                        <span className={`font-display text-[1rem] font-extrabold ${f.price === "$0.00" ? "text-teal-500" : "text-navy-900"}`}>
                          {f.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <SectionHead
                  eyebrow="Line of credit escrow requirements"
                  title="Approval tiers by credit score"
                  intro="Every tier keeps the card within reach — the escrow scales with the risk, not with paperwork."
                  rule={false}
                />
                <div className="mt-6 overflow-hidden rounded-[1.15rem] border border-steel-200 bg-paper">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-navy-950 text-white">
                      <tr>
                        {["Credit score", "Escrow req.", "Total balance"].map((h) => (
                          <th key={h} className="px-5 py-3.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/70">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel-100">
                      {p.escrow.map((r) => (
                        <tr key={r.score}>
                          <td className="px-5 py-3 text-[0.95rem] font-bold text-navy-900">{r.score}</td>
                          <td className="px-5 py-3 text-[0.95rem] text-steel-700">{r.escrow}</td>
                          <td className="px-5 py-3 text-[0.95rem] text-steel-700">{r.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-steel-600">{p.escrowNote}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------- FAQ ------------------------- */}
      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
            <div>
              <SectionHead
                eyebrow="FAQ"
                title="Fuel card questions, answered"
                intro="What carriers ask before they move their fuel spend."
              />
              <div className="mt-6 hidden border-t border-steel-200 pt-5 lg:block">
                <p className="eyebrow text-brand-500">Ready to save?</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-600">
                  Start the application in the portal or call {org.salesPhoneDisplay} and ask for
                  the fuel card team.
                </p>
                <Btn href={p.wexUrl} variant="outlineDark" className="mt-4 w-full">
                  Start my application
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
            title="Pair the fuel card with these"
            intro="The card works hardest when the rest of the operation runs through QP too."
          />
          <div className="mt-8">
            <RelatedServices
              items={[
                { label: "Transportation Factoring", href: "/factoring/trucking-factoring", blurb: "Funds upload to your QP Card in minutes" },
                { label: circleNetworkProgram.short, href: circleNetworkProgram.path, blurb: "Circle members get free fuel card setup" },
                { label: ambassadorProgram.short, href: ambassadorProgram.path, blurb: "$100 per fuel card referral you send" },
                { label: "Equipment Finance", href: "/programs/equipment-finance", blurb: "Add the truck the card fuels" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow={`${p.short} · next step`}
        title="Start saving at the next pump"
        body={`Apply in the portal or call ${org.salesPhoneDisplay} — a dedicated account rep will match you to the approval path that fits.`}
        primaryLabel="Start my fuel card application"
        primaryHref={p.wexUrl}
      />
    </>
  );
}
