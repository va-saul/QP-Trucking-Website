import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import {
  AnswerBox,
  Btn,
  Container,
  CtaBand,
  ProcessSteps,
  RelatedServices,
  Section,
  SectionHead,
  TrustBadges,
} from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { servicesBySlug, servicePath } from "@/content/services";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Trucking Factoring Programs — Recourse, Non-Recourse & Pure Non-Recourse™",
  description:
    "Compare QP's recourse, non-recourse and Pure Non-Recourse™ freight factoring programs. Get paid in minutes after load verification with flat fees, no minimums and no long-term contract.",
  path: "/factoring",
  keywords: [
    "trucking factoring programs",
    "freight factoring companies",
    "non-recourse factoring",
    "pure non-recourse factoring",
    "invoice factoring for trucking",
    "broker credit checks",
  ],
  image: "/images/hero/factoring.jpg",
});

const factoringFaqs: Faq[] = [
  {
    q: "How does freight factoring work at QP?",
    a: "You deliver the load and send the rate confirmation and proof of delivery. We verify the load, credit-check the broker for free, invoice your customer for you, and advance funds — typically within minutes on a QP Card or by ACH.",
  },
  {
    q: "Which factoring program should I choose?",
    a: "If your brokers are strong and you keep a cash cushion, recourse factoring is the cheapest. If you want bankruptcy protection, standard non-recourse fits. If you cannot absorb a $10,000–$15,000 chargeback, Pure Non-Recourse™ is the safest program we offer.",
  },
  {
    q: "Is there a minimum volume or long-term contract?",
    a: "No. QP has no minimums and no long-term contract. Factor one invoice or every invoice — you can pause, scale up or leave at any time without penalty.",
  },
  {
    q: "Do you check the brokers I haul for?",
    a: "Yes, and it is free and unlimited. Before you commit your truck, QP reports the broker's credit limit and payment history so you can decline weak customers instead of financing them.",
  },
  {
    q: "What paperwork do I need to send for each load?",
    a: "A legible rate confirmation plus a signed bill of lading or proof of delivery. Snap both with the QP app from the cab and the documents reach our funding desk instantly.",
  },
  {
    q: "Does factoring affect my credit or add debt?",
    a: "No. Factoring is the sale of an asset — your receivable — not borrowing, so it does not appear as debt on your balance sheet and it is approved on your customers' credit rather than yours.",
  },
];

const steps = [
  {
    title: "Get set up in under 24 hours",
    body: "Send your authority, insurance certificate, W-9 and customer list. We run credit on your brokers and issue rate agreements the same day.",
  },
  {
    title: "Deliver, send, get funded",
    body: "Haul the load, snap the paperwork in the QP app, and watch funds land on your QP Card or in your bank account, usually within minutes of verification.",
  },
  {
    title: "Stay in control",
    body: "Billing, collections and follow-up are ours. You keep the flexibility: no minimums, no long-term contract, factor exactly what you choose.",
  },
];

export default function FactoringHubPage() {
  const trucking = servicesBySlug["trucking-factoring"];
  const pure = servicesBySlug["pure-non-recourse"];

  return (
    <>
      <JsonLd
        data={[
          faqSchema(factoringFaqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Factoring", href: "/factoring" },
          ]),
          howToSchema({
            name: "How freight factoring works with QP Trucking Solutions",
            description: "Set up in a day, deliver loads, get funded in minutes and keep full flexibility.",
            steps,
          }),
        ]}
      />

      <PageHero
        eyebrow="Factoring"
        title="Freight factoring that pays like a credit card — without the debt"
        tagline="Recourse, non-recourse and Pure Non-Recourse™ programs. Unlimited broker credit checks, a fuel-discount QP Card, and money in your account minutes after load verification."
        image="/images/hero/factoring.jpg"
        imageAlt="QP factoring client truck backed into a dock at dusk"
        variant="invoice"
        accent="blue"
        trail={[
          { label: "Home", href: "/" },
          { label: "Factoring", href: "/factoring" },
        ]}
        stats={[
          { label: "Typical funding", value: "~15 min" },
          { label: "Setup time", value: "Under 24 hrs" },
          { label: "Chargebacks (Pure)", value: "None" },
          { label: "Minimums", value: "$0" },
        ]}
        primaryHref="/get-started?service=trucking-factoring"
        primaryLabel="Start my application"
        priority
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div className="max-w-2xl">
              <AnswerBox
                question="What is trucking factoring?"
                answer="Trucking factoring is selling your freight invoices to a factoring company at a small discount so you are paid in hours instead of the 30–45 days brokers typically take. It is not a loan: no debt is created, approval is based on your customers' credit, and funding scales automatically with your sales."
              />
              <div className="mt-6 grid gap-4">
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  Standard payment terms in transportation are net 30 days, which means the majority of checks actually
                  arrive between 33 and 45 days. That gap is where good trucking companies get squeezed — fuel, driver
                  pay, leases and insurance do not wait for a broker's accounting department.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-steel-700">
                  QP Trucking Solutions closes that gap. We purchase your receivables, handle all the billing and
                  collection, and advance cash the same day. You get the working capital of a big fleet while running
                  the truck you actually own.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              {[trucking, pure].map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08}>
                  <Link
                    href={servicePath(s)}
                    className="card-hover group block overflow-hidden rounded-[1.2rem] border border-steel-200 bg-paper p-6"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <span className="chip bg-navy-900/5 text-navy-800 border border-navy-900/10">
                        {i === 1 ? "Flagship" : "Most popular"}
                      </span>
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold-600">
                        {s.price?.tiers?.[0]?.price ?? "Flat fee"}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-[1.25rem] font-bold text-navy-900 group-hover:text-brand-500">
                      {s.name}
                    </h2>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-steel-600">{s.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.88rem] font-bold text-brand-500">
                      Read the full breakdown
                      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                        <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
              <Reveal delay={0.16}>
                <div className="rounded-[1.2rem] border border-steel-200 bg-bone p-6">
                  <p className="eyebrow text-brand-500">Included with every program</p>
                  <ul className="mt-4 grid gap-2.5">
                    {[
                      "Unlimited free broker credit checks",
                      "QP Card with the nation's largest fuel discount network",
                      "Quick Pay options and same-day ACH",
                      "App-based paperwork submission from the cab",
                      "Dedicated account rep who knows your file",
                    ].map((b) => (
                      <li key={b} className="flex gap-2.5 text-[0.93rem] text-navy-800">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container>
          <SectionHead
            eyebrow="How it works"
            title="Three steps from load to cash"
            intro="Factoring should feel invisible. Here is the entire process, end to end."
          />
          <div className="mt-10">
            <ProcessSteps steps={steps} tone="dark" />
          </div>
          <div className="mt-8">
            <TrustBadges
              items={[
                "No hidden fees",
                "Flat, disclosed rates",
                "No long-term contract",
                "Fund what you want",
                "Billing & collections included",
                "24/7 client portal",
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <SectionHead
            tone="light"
            eyebrow="Compare"
            title="Which factoring program fits your risk tolerance?"
            intro="Chargebacks are rare but expensive. Most new carriers cannot absorb a $10,000–$15,000 shortfall early in business — that is exactly the risk Pure Non-Recourse™ removes."
          />
          <Reveal className="mt-10 overflow-x-auto scroller">
            <table className="w-full min-w-[720px] border-collapse">
              <caption className="sr-only">
                Comparison of recourse factoring, non-recourse factoring and Pure Non-Recourse™ factoring
              </caption>
              <thead>
                <tr className="border-b border-white/15">
                  <th scope="col" className="py-4 pr-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/60">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-4 font-display text-[1rem] font-bold text-white">
                    Recourse
                  </th>
                  <th scope="col" className="px-4 py-4 font-display text-[1rem] font-bold text-white">
                    Non-Recourse
                  </th>
                  <th scope="col" className="px-4 py-4 font-display text-[1rem] font-bold text-gold-400">
                    Pure Non-Recourse™
                  </th>
                </tr>
              </thead>
              <tbody className="text-[0.95rem] text-white/85">
                {[
                  ["Cost", "Lowest fee", "Discounted rate", "Flat, disclosed fee"],
                  ["Broker credit risk", "Carried by you", "QP carries default", "QP carries everything"],
                  ["Bankruptcy protection", "None", "Inside 60–90 day window", "No time limit"],
                  ["Chargeback exposure", "Yes — buyback", "Window-limited", "Zero on qualifying loads"],
                  ["Best for", "Strong brokers, cash reserves", "Fleets wanting protection cheaper", "New authorities & tight reserves"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-white/10">
                    <th scope="row" className="py-4 pr-4 font-semibold text-white/70">
                      {row[0]}
                    </th>
                    <td className="px-4 py-4">{row[1]}</td>
                    <td className="px-4 py-4">{row[2]}</td>
                    <td className="px-4 py-4 font-semibold text-gold-400">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-6 text-[0.9rem] text-white/60">
            Not sure which is right? Our specialists will quote both and show you the arithmetic — no pressure.
          </p>
        </Container>
      </Section>

      <Section tone="bone" id="faq">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
            <SectionHead
              eyebrow="Factoring FAQ"
              title="Freight factoring questions, answered"
              intro="Everything carriers ask before they sign — fees, paperwork, credit checks and how fast money moves."
            />
            <FaqAccordion faqs={factoringFaqs} />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="Pair it with"
            title="Factoring works better with the rest of the QP stack"
            intro="One vendor, one file, fewer places for money to get stuck."
          />
          <div className="mt-8">
            <RelatedServices
              items={["insurance", "new-authority", "drug-alcohol-consortium", "dot-binder"]
                .map((slug) => servicesBySlug[slug])
                .filter(Boolean)
                .map((s) => ({ label: s.short, href: servicePath(s), blurb: s.tagline }))}
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Factoring · next step"
        title="See your factoring rate today"
        body="Tell us your monthly volume and the brokers you haul for. We will quote a flat rate the same business day — no application fee, no obligation."
        serviceId="trucking-factoring"
        primaryLabel="Start my application"
      />
    </>
  );
}
