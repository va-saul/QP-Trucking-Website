import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { insights, glossaryTerms } from "@/content/insights";
import { org } from "@/content/site";

export const metadata = buildMetadata({
  title: "Trucking Insights — Freight Fraud, Insurance Costs & Industry Data",
  description:
    "Plain-English briefings for carriers: freight fraud prevention, why insurance premiums move, bottleneck data, freight sentiment and a full trucking terminology glossary.",
  path: "/insights",
  keywords: [
    "trucking industry news",
    "freight fraud prevention",
    "trucking insurance costs",
    "trucking terminology glossary",
    "freight market data",
  ],
  image: "/images/hero/factoring.jpg",
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "QP Trucking Solutions Insights",
            url: "https://qpfactoring.com/insights",
            publisher: { "@id": "https://qpfactoring.com/#organization" },
            blogPost: insights.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://qpfactoring.com/insights/${p.slug}`,
              datePublished: p.date,
              description: p.description,
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Insights"
        title="Trucking money & compliance briefings"
        tagline="The material we hand new clients: how fraud works, why premiums move, what the data says about freight, and the working vocabulary of the industry."
        image="/images/hero/factoring.jpg"
        imageAlt="QP Trucking Solutions insights and industry briefings for carriers"
        variant="tech"
        accent="teal"
        trail={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
        ]}
        chips={[`${insights.length} articles`, `${glossaryTerms.length}+ glossary terms`, "Updated regularly"]}
        stats={[
          { label: "Articles", value: `${insights.length}` },
          { label: "Glossary terms", value: `${glossaryTerms.length}+` },
          { label: "Reading time", value: "3–12 min" },
          { label: "Cost", value: "Free" },
        ]}
        primaryHref="/get-started"
        primaryLabel="Talk to a specialist"
        priority
      />

      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="Latest"
            title="Read, then call us with better questions"
            intro="Every article is written for owner-operators and fleet managers who need the practical takeaway, not the press release."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* lead article */}
            <Reveal>
              <Link
                href={`/insights/${insights[0].slug}`}
                className="card-hover group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-steel-200 bg-paper"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={insights[0].image}
                    alt={insights[0].title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/85 to-navy-950/10" />
                  <span className="absolute left-4 top-4 chip bg-gold-400 text-navy-950">{insights[0].category}</span>
                  <h3 className="absolute bottom-4 left-4 right-4 font-display text-[1.35rem] font-extrabold leading-snug text-white">
                    {insights[0].title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.98rem] leading-relaxed text-steel-600">{insights[0].excerpt}</p>
                  <span className="mt-5 flex items-center gap-2 border-t border-steel-100 pt-4 text-[0.82rem] font-semibold text-steel-400">
                    {insights[0].readingMinutes} min read
                    <span aria-hidden="true">·</span>
                    <span className="text-brand-500 group-hover:underline">Read the guide</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* secondary list */}
            <div className="grid gap-4">
              {insights.slice(1, 5).map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.06}>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="card-hover group flex h-full flex-col rounded-[1.1rem] border border-steel-200 bg-paper p-5"
                  >
                    <span className="eyebrow text-brand-500">{post.category}</span>
                    <h3 className="mt-2 font-display text-[1.05rem] font-bold leading-snug text-navy-900 group-hover:text-brand-500">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-steel-600">{post.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <SectionHead
              eyebrow="Reference"
              title="Trucking terminology glossary"
              intro="Roughly 80 terms used daily by carriers, brokers and shippers — defined in one plain-English page, from accessorial charges to white glove logistics."
            />
            <Reveal>
              <div className="rounded-[1.2rem] border border-steel-200 bg-paper p-6">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {glossaryTerms.slice(0, 12).map((t) => (
                    <li key={t.term} className="text-[0.9rem] text-steel-700">
                      <span className="font-semibold text-navy-900">{t.term}</span>
                    </li>
                  ))}
                </ul>
                <Btn href="/insights/get-to-know-your-trucking-terms" variant="primary" withArrow className="mt-6">
                  Open the full glossary ({glossaryTerms.length} terms)
                </Btn>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="From reading to doing"
        title="Curious what factoring would cost your fleet?"
        body={`Reading is free, and so is a quote. Call ${org.salesPhoneDisplay} or send your details and we will price your volume the same day.`}
        primaryLabel="Get my flat rate"
      />
    </>
  );
}
