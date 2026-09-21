import Link from "next/link";
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
import { ambassadorProgram as p, circleNetworkProgram } from "@/content/programs";
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

export default function AmbassadorProgramPage() {
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
        primaryHref={p.applicationUrl}
        primaryLabel="Open the application"
        priority
      />

      {/* ------------------------- quick answer ------------------------- */}
      <Section tone="paper" className="!pb-8 sm:!pb-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <Reveal>
              <div className="max-w-2xl">
                <AnswerBox question={`${p.short} — in one paragraph`} answer={p.answer} />
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
                  <p className="eyebrow text-brand-500">Become an ambassador</p>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-steel-700">
                    Send your prospects straight to the application — or call the main line and
                    the team will route your referral to the right department.
                  </p>
                  <div className="mt-5 grid gap-2.5">
                    <Btn href={p.applicationUrl} variant="primary" withArrow className="w-full">
                      Open the application
                    </Btn>
                    <Btn href={`tel:${org.salesPhone}`} variant="outlineDark" className="w-full">
                      Call {org.salesPhoneDisplay}
                    </Btn>
                  </div>
                  <p className="mt-4 text-[0.74rem] leading-snug text-steel-400">
                    {p.proTip}
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------- commission schedule ------------------------- */}
      <Section tone="paper" className="!pt-8">
        <Container>
          <SectionHead
            eyebrow="Commission schedule"
            title="Direct payout per qualified referral"
            intro="Every product in the QP portfolio pays — factoring, insurance, fuel savings, dispatch and operating authority services."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.15rem] border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-3">
            {p.commissions.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col bg-paper p-6">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-400">{c.dept}</p>
                  <h3 className="mt-2.5 font-display text-[1.1rem] font-bold text-navy-900">{c.title}</h3>
                  <p className="mt-3 font-display text-[1.7rem] font-extrabold leading-none text-brand-600">
                    {c.payout}
                  </p>
                  <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-gold-600">{c.when}</p>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-steel-600">{c.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------- routing rule ------------------------- */}
      <Section tone="navy">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            <Reveal>
              <div>
                <p className="eyebrow text-gold-400">Important rule</p>
                <h2 className="mt-3 font-display text-display-md text-white">
                  Correct department routing is required to be paid
                </h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-white/75">{p.routing.rule}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-white/75">{p.routing.fallback}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Btn href={`tel:${p.routing.fallbackPhone}`} variant="gold" withArrow>
                    Call {p.routing.fallbackPhoneDisplay}
                  </Btn>
                  <Btn href={p.applicationUrl} variant="outline">
                    Open the application
                  </Btn>
                </div>
              </div>
            </Reveal>
            <div className="grid gap-4">
              {p.routing.contacts.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.07}>
                  <div className="glass rounded-[1.15rem] p-6">
                    <h3 className="font-display text-[1.05rem] font-bold text-white">{c.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-white/70">{c.scope}</p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem] font-semibold">
                      <a href={`tel:${c.phone}`} className="text-gold-400 hover:text-gold-500">
                        {c.phoneDisplay}
                      </a>
                      <a href={`mailto:${c.email}`} className="text-white/85 hover:text-white">
                        {c.email}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------- authority pricing ------------------------- */}
      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="Operating authority services"
            title="$20 ambassador payout per completed service"
            intro={p.authorityPricingNote}
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.15rem] border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
            {p.authorityPricing.map((s, i) => (
              <Reveal key={s.service} delay={(i % 4) * 0.04} className="h-full">
                <div className="flex h-full items-baseline justify-between gap-3 bg-paper px-5 py-4">
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-steel-400">{s.category}</p>
                    <p className="mt-1 text-[0.94rem] font-bold text-navy-900">{s.service}</p>
                  </div>
                  <p className="font-display text-[1.05rem] font-extrabold text-brand-600">{s.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <p className="text-[0.9rem] text-steel-600">
              {p.authorityPricingNote} Prices subject to change.{" "}
              <Link href="/store" className="font-bold text-brand-500 link-sweep">
                See standard published pricing
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------- rules ------------------------- */}
      <Section tone="bone" className="!py-12">
        <Container>
          <div className="border-t border-steel-200 pt-8">
            <SectionHead
              eyebrow="Program rules, conditions & exclusions"
              title="The fine print, up front"
              intro="Straight terms so every ambassador knows exactly what pays and when."
              align="left"
            />
            <ul className="mt-6 grid gap-3 lg:grid-cols-2">
              {p.rules.map((r, i) => (
                <Reveal as="li" key={i} delay={i * 0.04} className="flex gap-3 text-[0.95rem] leading-relaxed text-steel-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  <span>{r}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------- FAQ ------------------------- */}
      <Section tone="paper" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
            <div>
              <SectionHead
                eyebrow="FAQ"
                title="Ambassador questions, answered"
                intro="What carriers, agents and connectors ask before they start referring."
              />
              <div className="mt-6 hidden border-t border-steel-200 pt-5 lg:block">
                <p className="eyebrow text-brand-500">Ready to refer?</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-600">
                  Open the application link and share it — attribution is captured automatically
                  when your referral lists your company name.
                </p>
                <Btn href={p.applicationUrl} variant="outlineDark" className="mt-4 w-full">
                  Open the application
                </Btn>
              </div>
            </div>
            <FaqAccordion faqs={p.faqs} />
          </div>
        </Container>
      </Section>

      {/* ------------------------- related ------------------------- */}
      <Section tone="paper" className="!pt-0">
        <Container>
          <SectionHead
            eyebrow="Keep going"
            title="More QP programs"
            intro="Pair your referrals with the programs your clients will thank you for."
          />
          <div className="mt-8">
            <RelatedServices
              items={[
                {
                  label: circleNetworkProgram.short,
                  href: circleNetworkProgram.path,
                  blurb: "Premium member tier — $2,000+ in annual value",
                },
                { label: "Transportation Factoring", href: "/factoring/trucking-factoring", blurb: "What your referrals get paid on" },
                { label: "New Authority Setup", href: "/services/new-authority", blurb: "The service your newest referrals buy first" },
                { label: "Get started", href: "/get-started", blurb: "Route any lead through one form" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow={`${p.short} · next step`}
        title="Start earning on your next referral"
        body={`Share the application link or call ${org.salesPhoneDisplay} and the team will route your referral to the right department — so it pays.`}
        primaryLabel="Send a referral"
      />
    </>
  );
}
