import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import {
  AnswerBox,
  Btn,
  Container,
  CtaBand,
  PriceTicket,
  ProcessSteps,
  RelatedServices,
  Section,
  SectionHead,
  TrustBadges,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema, howToSchema, serviceSchema } from "@/lib/schema";
import { org } from "@/content/site";
import { servicesBySlug, servicePath } from "@/content/services";
import type { Service } from "@/lib/types";

/**
 * The shared layout for all 14 service pages.
 * Every page carries: a dedicated hero banner, a citable "quick answer"
 * block, benefits, process, priced CTA, FAQ (visible + FAQPage schema) and a
 * closing call-to-action with live phone numbers.
 */
export function ServicePageTemplate({
  service,
  imageAlt,
  trail,
  extraSections,
}: {
  service: Service;
  imageAlt: string;
  trail?: { label: string; href: string }[];
  extraSections?: ReactNode;
}) {
  const path = servicePath(service);
  const crumbs = trail ?? [
    { label: "Home", href: "/" },
    { label: service.category === "Factoring" ? "Factoring" : service.category === "Insurance" ? "Insurance" : "Services", href: service.category === "Factoring" ? "/factoring" : service.category === "Insurance" ? "/insurance" : "/services" },
    { label: service.short, href: path },
  ];

  const priceSummary = service.price?.summary ?? "Call for current pricing";
  const primaryLabel =
    service.category === "Insurance"
      ? "Get a free quote"
      : service.category === "Factoring"
        ? "Start my application"
        : `Order ${service.short}`;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema(crumbs.map((c) => ({ label: c.label, href: c.href }))),
          ...(service.process
            ? [
                howToSchema({
                  name: `How ${service.short} works at QP Trucking Solutions`,
                  description: service.answer,
                  steps: service.process,
                }),
              ]
            : []),
        ]}
      />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.name}
        tagline={service.tagline}
        image={service.heroImage}
        imageAlt={imageAlt}
        variant={service.heroVariant}
        accent={service.accent}
        trail={[{ label: "Home", href: "/" }, ...crumbs.slice(1).map((c) => ({ label: c.label, href: c.href }))]}
        stats={service.heroStats}
        primaryHref={`/get-started?service=${service.slug}`}
        primaryLabel={primaryLabel}
        priority
      />

      {/* ------------------------- quick answer ------------------------- */}
      <Section tone="paper" className="!pb-8 sm:!pb-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <Reveal>
              <div className="max-w-2xl">
                <AnswerBox question={service.name + " — in one paragraph"} answer={service.answer} />
                <div className="mt-6 grid gap-4">
                  {service.intro.map((p, i) => (
                    <p key={i} className="text-[1.02rem] leading-relaxed text-steel-700">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="lg:sticky lg:top-28">
                {service.price ? (
                  <PriceTicket
                    label={`${service.short} pricing`}
                    price={service.price.tiers?.[0]?.price ?? "Flat fee"}
                    note={service.price.tiers?.[1] ? `${service.price.tiers[1].label}: ${service.price.tiers[1].price}` : undefined}
                    benchmark={service.price.summary}
                    cta={
                      <>
                        <Btn href={`/get-started?service=${service.slug}`} variant="primary" withArrow className="w-full">
                          {primaryLabel}
                        </Btn>
                        <Btn href={`tel:${org.salesPhone}`} variant="outlineDark" className="w-full">
                          Call {org.salesPhoneDisplay}
                        </Btn>
                        {service.price.fine ? (
                          <p className="text-center text-[0.74rem] leading-snug text-steel-400">{service.price.fine}</p>
                        ) : null}
                      </>
                    }
                  />
                ) : (
                  <div className="rounded-[1.15rem] border border-steel-200 bg-bone p-6">
                    <p className="eyebrow text-brand-500">Talk to a specialist</p>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-steel-700">{priceSummary}</p>
                    <div className="mt-5 grid gap-2.5">
                      <Btn href={`/get-started?service=${service.slug}`} variant="primary" withArrow>
                        {primaryLabel}
                      </Btn>
                      <Btn href={`tel:${org.salesPhone}`} variant="outlineDark">
                        Call {org.salesPhoneDisplay}
                      </Btn>
                    </div>
                  </div>
                )}
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------- long-form body ------------------------- */}
      <Section tone="paper" className="!pt-8">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <div className="grid gap-10">
              {service.sections.map((sec, i) => (
                <Reveal key={sec.h} delay={i * 0.04}>
                  <article className="max-w-3xl">
                    <h2 className="font-display text-display-sm text-navy-900">{sec.h}</h2>
                    {sec.p?.map((p, j) => (
                      <p key={j} className="mt-4 text-[1rem] leading-relaxed text-steel-700">
                        {p}
                      </p>
                    ))}
                    {sec.bullets?.length ? (
                      <Reveal stagger={0.055} className="mt-5 grid gap-3">
                        {sec.bullets.map((b) => (
                          <div key={b} data-item className="flex gap-3 text-[0.98rem] leading-relaxed text-steel-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </Reveal>
                    ) : null}
                  </article>
                </Reveal>
              ))}
              {extraSections}
            </div>

            {/* sticky rail: benefits + inline CTA */}
            <div className="grid h-fit gap-5 lg:sticky lg:top-28">
              <Reveal>
                <div className="border-t border-steel-200 pt-6">
                  <p className="eyebrow text-brand-500">What you get</p>
                  <ul className="mt-4 grid gap-3">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[0.93rem] leading-snug text-navy-800">
                        <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true">
                          <path d="m5 10.5 3.2 3.2L15 6.9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* mid-page conversion card */}
              <Reveal delay={0.06}>
                <div className="relative overflow-hidden rounded-[1.15rem] bg-navy-900 p-6 text-white">
                  <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-35" />
                  <p className="relative eyebrow text-gold-400">Talk to a real person</p>
                  <p className="relative mt-3 font-display text-[1.15rem] font-bold leading-snug">
                    Questions about {service.short.toLowerCase()}? Our Louisville team answers in minutes, not days.
                  </p>
                  <div className="relative mt-5 grid gap-2.5">
                    <Btn href={`tel:${org.salesPhone}`} variant="gold" withArrow>
                      Call {org.salesPhoneDisplay}
                    </Btn>
                    <Btn href={`/get-started?service=${service.slug}`} variant="outline">
                      Request a callback
                    </Btn>
                  </div>
                  <p className="relative mt-4 text-[0.78rem] text-white/60">{org.hoursDisplay}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------- process ------------------------- */}
      {service.process ? (
        <Section tone="steel">
          <Container>
            <SectionHead
              eyebrow="How it works"
              title={`${service.short}: three steps, one team`}
              intro="No jargon, no runaround. Here is exactly what happens after you get started."
            />
            <div className="mt-10">
              <ProcessSteps steps={service.process} tone="dark" />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------- trust ------------------------- */}
      <Section tone="paper" className="!py-12">
        <Container>
          <div className="border-t border-steel-200 pt-8">
            <SectionHead
              eyebrow="Why carriers stay with QP"
              title={`More than ${service.category.toLowerCase()}: everything under one roof`}
              intro="Insurance, factoring, permits, dispatch support and equipment finance live in the same building — so one phone call moves three problems forward at once."
              align="left"
            />
            <div className="mt-6">
              <TrustBadges
                items={[
                  "Flat, disclosed fees",
                  "No long-term contract",
                  "Same-day human support",
                  "Licensed & bonded",
                  "1,000+ carriers served",
                  "Louisville, KY based",
                ]}
              />
            </div>
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
                title={`${service.short} questions, answered`}
                intro="The questions our Louisville team hears most from owner-operators and fleet owners."
              />
              <div className="mt-6 hidden border-t border-steel-200 pt-5 lg:block">
                <p className="eyebrow text-brand-500">Still unsure?</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-steel-600">
                  Call {org.salesPhoneDisplay} and ask for a specialist in {service.short.toLowerCase()}. No obligation,
                  no pressure — just straight answers.
                </p>
                <Btn href={`tel:${org.salesPhone}`} variant="outlineDark" className="mt-4 w-full">
                  Call {org.salesPhoneDisplay}
                </Btn>
              </div>
            </div>
            <FaqAccordion faqs={service.faqs} />
          </div>
        </Container>
      </Section>

      {/* ------------------------- related ------------------------- */}
      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="Keep going"
            title="Pair it with these QP services"
            intro="Most carriers combine two or three services to remove friction from their week."
          />
          <div className="mt-8">
            <RelatedServices
              items={service.related
                .map((slug) => servicesBySlug[slug])
                .filter(Boolean)
                .map((s) => ({ label: s.short, href: servicePath(s), blurb: s.tagline }))}
            />
          </div>
          <Reveal className="mt-6">
            <p className="text-[0.92rem] text-steel-600">
              Looking for the full picture?{" "}
              <Link href="/store" className="font-bold text-brand-500 link-sweep">
                See every service and price
              </Link>
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        eyebrow={`${service.short} · next step`}
        title={`Ready to get ${service.short.toLowerCase()} handled today?`}
        body={`Send us your details and a QP specialist will call you back the same business day — or dial ${org.salesPhoneDisplay} and skip the form entirely.`}
        serviceId={service.slug}
        primaryLabel={primaryLabel}
      />
    </>
  );
}
