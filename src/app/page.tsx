import Link from "next/link";
import { HomeHero } from "@/components/hero/HomeHero";
import {
  AnswerBox,
  Btn,
  Container,
  CtaBand,
  ProcessSteps,
  Section,
  SectionHead,
  ServiceCard,
  StatStrip,
  Testimonials,
  TrustMarquee,
  TrustBadges,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ReviewsRail } from "@/components/ReviewsRail";
import { SiteIntro } from "@/components/SiteIntro";
import { Reveal } from "@/components/motion";
import { JsonLd, faqSchema, howToSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { homeFaqs, org, processSteps, testimonials, trust } from "@/content/site";
import { complianceServices, factoringServices, insuranceServices, servicePath } from "@/content/services";
import { insights } from "@/content/insights";

export const metadata = buildMetadata({
  title: "QP Trucking Solutions | Trucking Factoring, Insurance & FMCSA Compliance",
  description:
    "Trucking factoring, insurance, authority setup and FMCSA compliance for owner-operators and fleets. Get paid in minutes after load verification — no long-term contract, no hidden fees. Call 833-762-3464.",
  path: "/",
  image: "/images/hero/home.jpg",
  keywords: [
    "trucking factoring company",
    "freight bill factoring",
    "trucking insurance agency",
    "new authority setup",
    "non-recourse factoring",
    "owner operator cash flow",
    "FMCSA compliance services Louisville KY",
  ],
});

const cashCycle = [
  {
    n: "01",
    title: "Submit your invoices",
    body: "Deliver the load, then send the rate confirmation and proof of delivery from the QP app or by email. We run a free credit check on the broker for you.",
  },
  {
    n: "02",
    title: "Get paid",
    body: "Funds upload to your QP Card or land in your bank account — typically in about 15 minutes after load verification, with the balance released when your customer pays.",
  },
  {
    n: "03",
    title: "Grow your business",
    body: "Add trucks, hire drivers and take bigger loads without borrowing. Your funding line grows with your sales, because factoring scales with revenue.",
  },
  {
    n: "04",
    title: "Repeat",
    body: "No minimums and no long-term contract means you factor what you want, when you want — and we keep billing and chasing payment in the background.",
  },
];

const programs = [
  {
    name: "Recourse factoring",
    price: "Lowest fee",
    creditRisk: "You carry it",
    bankruptcy: "Not protected",
    bestFor: "Carriers with strong brokers and cash reserves",
    tone: "light" as const,
  },
  {
    name: "Non-recourse factoring",
    price: "Discounted rate available",
    creditRisk: "QP carries default",
    bankruptcy: "Protected inside a 60–90 day window",
    bestFor: "Carriers who want bankruptcy protection at a lower cost",
    tone: "light" as const,
  },
  {
    name: "Pure Non-Recourse™",
    price: "Flat, disclosed fee",
    creditRisk: "QP carries everything",
    bankruptcy: "Protected with no time window",
    bestFor: "New authorities and anyone who cannot absorb a $10–15K chargeback",
    tone: "gold" as const,
  },
];

const programCards = [
  {
    eyebrow: "Referral program",
    title: "Ambassador Program",
    blurb: "Earn $500–$700 per qualified factoring referral — plus payouts on insurance, fuel cards, dispatch and authority services.",
    stat: "$500–$700 per referral",
    href: "/programs/ambassador",
  },
  {
    eyebrow: "Premium member tier",
    title: "Circle Network",
    blurb: "0% factoring fees, free fuel card setup, complimentary IFTA & IRP processing and a 40+ broker directory for new authorities.",
    stat: "$2,000+ in annual value",
    href: "/programs/circle-network",
  },
  {
    eyebrow: "Fuel savings",
    title: "QP Fuel Card",
    blurb: "48¢/gal average savings at 9,000+ stations, zero POS fees and flexible approvals with no traditional credit needed.",
    stat: "48¢/gal average savings",
    href: "/programs/fuel-card",
  },
  {
    eyebrow: "Fleet growth",
    title: "Equipment Finance",
    blurb: "Tractors, trailers and rolling equipment financed through the same team that factors your invoices.",
    stat: "One application, one team",
    href: "/programs/equipment-finance",
  },
];

export default function HomePage() {
  const allServices = [...factoringServices, ...insuranceServices, ...complianceServices];

  return (
    <>
      {/* 3D truck splash — plays whenever the user comes to the Home page */}
      <SiteIntro />

      <JsonLd
        data={[
          faqSchema(homeFaqs),
          howToSchema({
            name: "How trucking factoring works with QP Trucking Solutions",
            description:
              "Three steps: deliver the load and send paperwork, receive funds in minutes after verification, and grow without debt.",
            steps: [
              { title: "Deliver your load", body: "Haul the freight exactly as your rate confirmation specifies." },
              { title: "Send paperwork", body: "Snap the rate confirmation and proof of delivery in the QP app, or email them in." },
              { title: "Get paid", body: "Funds upload to your QP Card or arrive by ACH, usually within minutes of verification." },
            ],
          }),
        ]}
      />

      <HomeHero />

      <TrustMarquee items={trust.badges} />

      {/* ------------------------------------------------------------------ */}
      {/*  WHAT WE DO                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Who we are"
                title="The factoring company for trucking solutions"
                intro="Trucking businesses and owner-operators are the backbone of our economy. QP Capital is here to help you succeed and keep business moving — with cash flow today and compliance handled for the long haul."
              />
              <div className="mt-6 grid gap-4 max-w-2xl">
                <p className="text-[1rem] leading-relaxed text-steel-700">
                  QP Trucking Solutions is a financial institution offering alternative business funding without the
                  acquisition of debt. We purchase your outstanding receivables and turn paper invoices into real cash,
                  providing working capital for start-up, growth and expansion.
                </p>
                <p className="text-[1rem] leading-relaxed text-steel-700">
                  Everything a trucking company needs lives under one roof: insurance, factoring, compliance, permits,
                  dispatch support and equipment finance. One team, one phone number, no juggling vendors while your
                  trucks sit.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Btn href="/factoring" variant="primary" withArrow>
                  Explore factoring
                </Btn>
                <Btn href="/services" variant="outlineDark">
                  Authority &amp; compliance services
                </Btn>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="grid gap-4">
                <AnswerBox
                  question="What does QP Trucking Solutions do?"
                  answer="QP Trucking Solutions (QP Capital LLC) is a Louisville, Kentucky based factoring company and licensed insurance agency serving trucking companies nationwide. It buys freight invoices so carriers get paid in minutes instead of 30–45 days, and it also handles trucking insurance, new authority setup, permits and FMCSA compliance."
                />
                <div className="relative overflow-hidden rounded-[1.15rem] border border-steel-200 bg-bone p-6">
                  <p className="eyebrow text-brand-500">Get paid in three steps</p>
                  <ol className="mt-4 grid gap-3">
                    {["Deliver your load", "Send paperwork", "Get paid"].map((s, i) => (
                      <li key={s} className="flex items-center gap-3 border-t border-steel-200 pt-3 first:border-0 first:pt-0">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-mono text-[0.75rem] font-semibold text-white">
                          {i + 1}
                        </span>
                        <span className="font-display text-[1rem] font-bold text-navy-900">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  CASH CYCLE                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="steel">
        <Container>
          <SectionHead
            eyebrow="Funding solutions for your industry"
            title="Convert your invoices into cash"
            intro="Standard payment terms in transportation are net 30 — but the majority of checks actually arrive between 33 and 45 days. Factoring closes that gap without adding debt."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cashCycle.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} className="border-t border-steel-200 pt-5">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-500">{step.n}</span>
                <h3 className="mt-3 font-display text-[1.1rem] font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-steel-600">{step.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Btn href="/factoring/trucking-factoring" variant="primary" withArrow>
              How transportation factoring works
            </Btn>
            <p className="text-[0.9rem] text-steel-600">
              Or call <a href={`tel:${org.salesPhone}`} className="font-bold text-brand-500 link-sweep">{org.salesPhoneDisplay}</a> for a
              same-day quote.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  SERVICES GRID                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="paper" id="services">
        <Container>
          <SectionHead
            eyebrow="Everything under one roof"
            title="Services built for owner-operators and fleets"
            intro="Transparent pricing, filed by the same team that knows your account — from your first MC number to your hundredth truck."
            cta={
              <Btn href="/store" variant="outlineDark" withArrow>
                Full catalog &amp; pricing
              </Btn>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s, i) => (
              <ServiceCard key={s.slug} service={s} href={servicePath(s)} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  PROGRAMS & FUNDING                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="bone">
        <Container>
          <SectionHead
            eyebrow="Programs & funding"
            title="Built to keep you moving — and pay you while you do"
            intro="Beyond factoring and compliance: referral payouts, premium membership, fuel savings and equipment finance, all under the same roof."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="h-full">
                <Link
                  href={c.href}
                  className="card-hover group flex h-full flex-col justify-between rounded-[1.15rem] border border-steel-200 bg-paper p-6"
                >
                  <div>
                    <span className="eyebrow text-brand-500">{c.eyebrow}</span>
                    <h3 className="mt-3 font-display text-[1.15rem] font-bold leading-snug text-navy-900 group-hover:text-brand-500">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-steel-600">{c.blurb}</p>
                  </div>
                  <div className="mt-5 border-t border-steel-100 pt-4">
                    <p className="font-mono text-[0.78rem] font-medium text-gold-600">{c.stat}</p>
                    <span className="mt-2 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-brand-500">
                      Explore
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                        <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  PROGRAM COMPARISON                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="navy">
        <Container>
          <SectionHead
            tone="light"
            eyebrow="Choose your risk tolerance"
            title="Recourse, non-recourse or Pure Non-Recourse™"
            intro="Most factoring companies offer 'non-recourse' and stop there. Read the aging window before you sign: if bankruptcy is not declared inside 60 or 90 days, many competitors still charge the invoice back to you."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[1.1rem] border p-6 ${
                    p.tone === "gold" ? "border-gold-400/50 bg-gold-400/[0.05]" : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  {p.tone === "gold" ? (
                    <span className="absolute right-5 top-5 rounded-full bg-gold-400 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-navy-950">
                      Flagship
                    </span>
                  ) : null}
                  <h3 className="font-display text-[1.25rem] font-bold text-white">{p.name}</h3>
                  <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gold-400">{p.price}</p>
                  <dl className="mt-5 grid gap-3.5 text-[0.92rem]">
                    <div className="border-t border-white/10 pt-3">
                      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/50">Credit risk</dt>
                      <dd className="mt-1 font-semibold text-white">{p.creditRisk}</dd>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/50">
                        Broker bankruptcy
                      </dt>
                      <dd className="mt-1 font-semibold text-white">{p.bankruptcy}</dd>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/50">Best for</dt>
                      <dd className="mt-1 text-white/80">{p.bestFor}</dd>
                    </div>
                  </dl>
                  <div className="mt-6">
                    <Btn
                      href={p.tone === "gold" ? "/factoring/pure-non-recourse" : "/factoring/trucking-factoring"}
                      variant={p.tone === "gold" ? "gold" : "outline"}
                      className="w-full"
                    >
                      {p.tone === "gold" ? "See Pure Non-Recourse™" : "Compare programs"}
                    </Btn>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  PROCESS + STATS                                                   */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="How QP works"
            title="Get started, grow quickly, and operate profitably"
            intro="Three commitments we make to every carrier: a fast answer, a flat fee and a team that already knows your file."
          />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} tone="dark" />
          </div>

          <div className="mt-16 border-t border-steel-200 pt-10">
            <StatStrip
              stats={[
                { value: 1000, suffix: "+", label: "Carriers funded & set up", sub: "owner-operators to 200-truck fleets" },
                { value: 24, suffix: " hrs", label: "Typical setup time", sub: "signed agreement to first advance" },
                { value: 15, suffix: " min", label: "Average funding time", sub: "after load verification" },
                { value: 0, suffix: "", label: "Long-term contracts", sub: "factor what you want" },
              ]}
              tone="light"
            />
            <div className="mt-8 border-t border-steel-200 pt-6">
              <TrustBadges items={trust.badges} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  TESTIMONIALS                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="navy">
        <span aria-hidden="true" className="stripe-band pointer-events-none absolute inset-0 opacity-25" />
        <Container className="relative">
          <SectionHead
            tone="light"
            eyebrow="What others say about us"
            title="Carriers who stayed, and why"
            intro="Client feedback from the fleets and owner-operators QP funds every week."
          />
          <div className="mt-10">
            <Testimonials items={testimonials} />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  REVIEWS SIDE SCROLLER — YouTube · Google · Trustpilot             */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="ink">
        <span aria-hidden="true" className="stripe-band pointer-events-none absolute inset-0 opacity-25" />
        <Container className="relative">
          <SectionHead
            tone="light"
            eyebrow="Verified reviews"
            title="YouTube, Google & Trustpilot reviews"
            intro="Video reviews with real client faces, featured Google feedback and verified Trustpilot reviews — side-scroll them all."
          />
          <ReviewsRail />
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  INSURANCE SPOTLIGHT                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="paper">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Reveal>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[1.35rem] border border-steel-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero/insurance.jpg"
                    alt="QP Trucking Insurance covering owner-operators and fleets nationwide"
                    className="h-full w-full object-cover"
                    width={1200}
                    height={800}
                    loading="lazy"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                </div>
                <div className="ticket absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-auto sm:w-[290px]">
                  <div className="p-5">
                    <p className="eyebrow text-brand-500">Coverage we place</p>
                    <p className="mt-2 font-display text-[1.02rem] font-bold text-navy-900">
                      Liability · Cargo · Bobtail · Physical damage · NTL · General liability
                    </p>
                    <a href={`tel:${org.salesPhone}`} className="mt-3 inline-flex text-[0.88rem] font-bold text-brand-500 link-sweep">
                      Call {org.salesPhoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="pt-8 lg:pt-0">
              <SectionHead
                eyebrow="QP Trucking Insurance"
                title="Coverage bound fast, priced right"
                intro="An active insurance policy is required before your authority becomes active. We coordinate insurance, BOC-3 and permits so your MC number goes live without gaps."
              />
              <ul className="mt-6 grid gap-3.5 max-w-xl">
                {[
                  "Licensed agents who only write transportation risks",
                  "Certificates and FMCSA filings issued the same day whenever possible",
                  "Broker-required limits and endorsements handled for you",
                  "Bundle with factoring for preferred pricing",
                  "Annual reviews to catch rate drops and coverage gaps",
                  "Claims advocacy — we help you through the hard days",
                ].map((b) => (
                  <li key={b} className="flex gap-3 text-[0.98rem] leading-relaxed text-steel-700">
                    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true">
                      <path d="m5 10.5 3.2 3.2L15 6.9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Btn href="/insurance" variant="primary" withArrow>
                  Get a trucking insurance quote
                </Btn>
                <Btn href={`tel:${org.salesPhone}`} variant="outlineDark">
                  Call {org.salesPhoneDisplay}
                </Btn>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  FAQ                                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">
            <div>
              <SectionHead
                eyebrow="FAQ"
                title="Trucking factoring, insurance &amp; compliance — answered"
                intro="Straight answers to the questions carriers ask before they call. Every answer is also published as structured data so search engines and AI assistants can quote it accurately."
              />
              <Btn href="/faq" variant="outlineDark" className="mt-6" withArrow>
                Read the full FAQ library
              </Btn>
            </div>
            <FaqAccordion faqs={homeFaqs} columns={2} />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  INSIGHTS                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="Insights"
            title="Trucking money &amp; compliance briefings"
            intro="Industry news, cost benchmarks and plain-English guides — the same material we hand new clients."
            cta={
              <Btn href="/insights" variant="outlineDark" withArrow>
                All insights
              </Btn>
            }
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {insights.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="card-hover group flex h-full flex-col rounded-[1.15rem] border border-steel-200 bg-paper p-6"
                >
                  <span className="eyebrow text-brand-500">{post.category}</span>
                  <h3 className="mt-3 font-display text-[1.15rem] font-bold leading-snug text-navy-900 group-hover:text-brand-500">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[0.92rem] leading-relaxed text-steel-600">{post.excerpt}</p>
                  <span className="mt-5 flex items-center gap-2 border-t border-steel-100 pt-4 text-[0.82rem] font-semibold text-steel-400">
                    {post.readingMinutes} min read
                    <span aria-hidden="true">·</span>
                    <span className="text-brand-500 group-hover:underline">Read</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Free consultation"
        title="Let's get your cash flowing this week"
        body={`Tell us about your trucks and your customers, and a QP specialist will call you back the same business day with a flat rate and a straight answer. Or simply dial ${org.salesPhoneDisplay}.`}
        primaryLabel="Become a QP client"
      />
    </>
  );
}
