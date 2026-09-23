import { PageHero } from "@/components/hero/PageHero";
import {
  AnswerBox,
  Btn,
  Chip,
  Container,
  CtaBand,
  ProcessSteps,
  RelatedServices,
  Section,
  SectionHead,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { circleNetworkProgram as p, ambassadorProgram } from "@/content/programs";
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

export default function CircleNetworkPage() {
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
        primaryHref="/get-started"
        primaryLabel="Ask about The Circle"
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
                <div className="relative overflow-hidden rounded-[1.15rem] bg-navy-900 p-6 text-white">
                  <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-35" />
                  <p className="relative eyebrow text-gold-400">Premium member tier</p>
                  <p className="relative mt-3 font-display text-[1.6rem] font-extrabold leading-none">$2,000+</p>
                  <p className="relative mt-1 text-[0.86rem] font-semibold text-gold-400">
                    in annual value unlocked
                  </p>
                  <p className="relative mt-4 text-[0.92rem] leading-relaxed text-white/75">
                    Every carrier in The Circle receives the full benefit stack automatically —
                    no add-ons, no fine print.
                  </p>
                  <div className="relative mt-5 grid gap-2.5">
                    <Btn href="/get-started" variant="gold" withArrow className="w-full">
                      Ask about The Circle
                    </Btn>
                    <Btn href={`tel:${org.salesPhone}`} variant="outline" className="w-full">
                      Call {org.salesPhoneDisplay}
                    </Btn>
                  </div>
                  <p className="relative mt-4 text-[0.78rem] text-white/60">{org.hoursDisplay}</p>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------- benefits ------------------------- */}
      <Section tone="paper" className="!pt-8">
        <Container>
          <SectionHead
            eyebrow="Premium member benefits"
            title="Going the extra mile for every member"
            intro="Exclusive perks, financial support and a dedicated network of brokers — every carrier in The Circle receives these automatically."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.15rem] border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-3">
            {p.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col bg-paper p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-400">
                      {String(i + 1).padStart(2, "0")} · Member benefit
                    </p>
                    {b.circleOnly ? <Chip tone="gold">Circle only</Chip> : null}
                  </div>
                  <h3 className="mt-3 font-display text-[1.14rem] font-bold text-navy-900">{b.title}</h3>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-steel-600">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------- broker directory ------------------------- */}
      <Section tone="steel">
        <Container>
          <SectionHead
            eyebrow="New authority broker directory"
            title="Freight for carriers with 0–90 days of authority"
            intro={p.brokersIntro}
          />
          <Reveal className="mt-10">
            <div className="overflow-hidden rounded-[1.15rem] border border-steel-200 bg-paper">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-steel-200 bg-navy-950 text-white">
                      {["Broker", "Min MC age", "MC / DOT", "Reputation & policy", "Services"].map((h) => (
                        <th key={h} className="px-5 py-4 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/70">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.brokers.map((b) => (
                      <tr key={b.name} className="border-b border-steel-100 last:border-0 even:bg-steel-50">
                        <td className="px-5 py-4">
                          <p className="text-[0.94rem] font-bold text-navy-900">{b.name}</p>
                          <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-steel-400">{b.type}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="chip bg-brand-100 text-brand-600 border border-brand-300/40">{b.mcAge}</span>
                        </td>
                        <td className="px-5 py-4 font-mono text-[0.78rem] leading-relaxed text-steel-600">
                          {b.mc}
                          <br />
                          {b.dot}
                        </td>
                        <td className="px-5 py-4 text-[0.88rem] leading-relaxed text-steel-600">{b.policy}</td>
                        <td className="px-5 py-4 text-[0.88rem] font-semibold text-navy-800">{b.services}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-5">
            <p className="text-[0.9rem] leading-relaxed text-steel-600">{p.brokersNote}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------- enrollment ------------------------- */}
      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="How enrollment works"
            title="Three steps into The Circle"
            intro="The Circle Network is QP's premium support tier for new authorities and renewals — enrollment starts with one conversation."
          />
          <div className="mt-10">
            <ProcessSteps steps={p.enrollment} tone="dark" />
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
                title="Circle questions, answered"
                intro="What carriers ask before they ask about joining."
              />
              <div className="mt-6 hidden border-t border-steel-200 pt-5 lg:block">
                <p className="eyebrow text-brand-500">Still unsure?</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-600">
                  Call {org.salesPhoneDisplay} and ask what The Circle would save your operation.
                  No obligation, no pressure.
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
            title="Pair The Circle with these"
            intro="Most Circle members stack two or three QP services on top of their membership."
          />
          <div className="mt-8">
            <RelatedServices
              items={[
                {
                  label: ambassadorProgram.short,
                  href: ambassadorProgram.path,
                  blurb: "Earn $500–$700 for every qualified referral",
                },
                { label: "Transportation Factoring", href: "/factoring/trucking-factoring", blurb: "The program Circle members run at 0% fees" },
                { label: "Fuel Card Savings", href: "/services/eld-dashcam", blurb: "Member pricing across the fuel & tech programs" },
                { label: "New Authority Setup", href: "/services/new-authority", blurb: "Start right — authority, BOC-3 and more under one roof" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow={`${p.short} · next step`}
        title="Ready to see what The Circle saves you?"
        body={`Call ${org.salesPhoneDisplay} or send the form — the enrollment team will confirm your $2,000 in saved value and activate your membership after a final consultation.`}
        primaryLabel="Ask about The Circle"
      />
    </>
  );
}
