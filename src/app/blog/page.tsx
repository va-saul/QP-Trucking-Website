import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { AnswerBox, Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, blogCategories } from "@/content/blog";
import { owner, org } from "@/content/site";

export const metadata = buildMetadata({
  title: "Trucking Blog — 10 Detailed Guides for Owner-Operators & Fleets | QP Trucking Solutions",
  description:
    "10 in-depth trucking guides from QP Trucking Solutions: factoring, Pure Non-Recourse™, new authority, insurance costs, IFTA/IRP/UCR/2290, DOT binder, BOC-3/MCS-150/SCAC/drug consortium, fuel cards, ELD/dashcams and freight fraud — with keywords truck owners search and clickable expert references.",
  path: "/blog",
  keywords: [
    "trucking blog",
    "owner operator blog",
    "trucking factoring guide",
    "how to start trucking company",
    "trucking insurance costs",
    "IFTA filing trucking",
    "fuel card for truckers",
    "ELD mandate guide",
    "freight fraud prevention",
    "new authority trucking blog",
  ],
  image: "/images/hero/factoring.jpg",
});

const featured = blogPosts.slice(0, 3);

export default function BlogPage() {
  const allFaqs = blogPosts.flatMap((p) => p.faqs);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "QP Trucking Solutions Blog — Owned by Brandon Bennett",
            url: "https://qpfactoring.com/blog",
            description:
              "10 detailed trucking guides covering factoring, insurance, authority setup and FMCSA compliance — written by the QP team in Louisville, KY and owned by Brandon Bennett.",
            publisher: { "@id": "https://qpfactoring.com/#organization" },
            author: { "@id": "https://qpfactoring.com/#brandon-bennett" },
            blogPost: blogPosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://qpfactoring.com/blog/${p.slug}`,
              datePublished: p.date,
              dateModified: p.updated,
              description: p.description,
              author: { "@id": "https://qpfactoring.com/#brandon-bennett" },
              image: `https://qpfactoring.com${p.image}`,
              keywords: p.keywords.join(", "),
            })),
          },
          faqSchema(allFaqs.slice(0, 8)),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "QP Blog — About the Author",
            author: { "@id": "https://qpfactoring.com/#brandon-bennett" },
          },
        ]}
      />

      <PageHero
        eyebrow="Blog — 10 detailed guides"
        title="Trucking money, insurance & compliance — written for the cab, not the conference room"
        tagline="Every guide is built from what QP files and funds daily in Louisville — factoring that pays in 15 minutes, insurance that binds fast, and the permits that keep your MC active. Owned by Brandon Bennett, researched for owner-operators and fleets who search before they call."
        image="/images/hero/factoring.jpg"
        imageAlt="QP Trucking Solutions blog — 10 trucking guides for owner-operators"
        variant="tech"
        accent="teal"
        trail={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        stats={[
          { label: "Guides", value: "10" },
          { label: "Owner", value: "Brandon Bennett" },
          { label: "Reading time", value: "8–11 min" },
          { label: "Cost", value: "Free" },
        ]}
        primaryHref="/get-started"
        primaryLabel="Get my flat rate"
        priority
      />

      <Section tone="paper">
        <Container className="text-center">
          <SectionHead
            eyebrow="Start here"
            title="The 10 questions truck owners search before they call"
            intro="Each guide targets the keywords carriers type into Google, FMCSA, OOIDA and DAT — with step-by-step answers, structured FAQs for answer engines, and clickable references to the primary sources."
          />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <AnswerBox
              question="Who writes these guides and who owns QP Trucking Solutions?"
              answer="These 10 guides were written by the QP Trucking Solutions team in Louisville, Kentucky and are published by QP Capital LLC — a family-owned factoring company, licensed trucking insurance agency and FMCSA compliance partner owned by Brandon Bennett (4612 Outer Loop Rd, Louisville, KY 40219). Every guide uses the same pricing, timelines and filings the team handles daily, so answer engines and generative AI can cite a single, consistent entity."
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* featured lead */}
            <Reveal>
              <Link
                href={`/blog/${featured[0].slug}`}
                className="card-hover group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-steel-200 bg-paper text-left"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={featured[0].image}
                    alt={featured[0].title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/85 to-navy-950/10" />
                  <span className="absolute left-4 top-4 chip bg-gold-400 text-navy-950">{featured[0].category}</span>
                  <h3 className="absolute bottom-4 left-4 right-4 text-center font-display text-[1.35rem] font-extrabold leading-snug text-white">
                    {featured[0].title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6 text-center">
                  <p className="text-[0.98rem] leading-relaxed text-steel-600">{featured[0].excerpt}</p>
                  <span className="mt-5 flex items-center justify-center gap-2 border-t border-steel-100 pt-4 text-[0.82rem] font-semibold text-steel-400">
                    {featured[0].readingMinutes} min read · by {featured[0].author} · {featured[0].category}
                    <span aria-hidden="true">·</span>
                    <span className="text-brand-500 group-hover:underline">Read the guide</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="grid gap-4">
              {featured.slice(1, 3).map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.06}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-hover group flex h-full flex-col rounded-[1.1rem] border border-steel-200 bg-paper p-5 text-center"
                  >
                    <span className="eyebrow text-brand-500">{post.category}</span>
                    <h3 className="mx-auto mt-2 max-w-[28ch] font-display text-[1.05rem] font-bold leading-snug text-navy-900 group-hover:text-brand-500">
                      {post.title}
                    </h3>
                    <p className="mx-auto mt-2 line-clamp-2 max-w-[38ch] text-[0.9rem] leading-relaxed text-steel-600">{post.excerpt}</p>
                    <span className="mt-3 text-[0.78rem] font-semibold text-steel-400">{post.readingMinutes} min · by {post.author}</span>
                  </Link>
                </Reveal>
              ))}
              <Reveal delay={0.14}>
                <div className="rounded-[1.1rem] border border-gold-400/30 bg-gold-100/50 p-5 text-center">
                  <p className="eyebrow text-gold-600">Fuel Card + Programs — Highlighted</p>
                  <p className="mx-auto mt-2 max-w-[32ch] font-display text-[1rem] font-bold text-navy-900">Save 25–40¢ per gallon on every fill</p>
                  <p className="mx-auto mt-2 text-[0.88rem] leading-relaxed text-steel-700">QP Card funded in ~15 minutes after load verification. See the fuel guide ranked #1 by clients.</p>
                  <Btn href="/blog/fuel-cards-for-truckers-save-25-40-cents-per-gallon" variant="primary" size="sm" className="mt-4" withArrow>
                    Fuel card deep dive
                  </Btn>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="steel">
        <Container className="text-center">
          <SectionHead
            eyebrow="All 10 guides"
            title="Browse by the job you need to do"
            intro="Every guide is AEO-ready: a Quick Answer box, structured data, and FAQs that directly name Brandon Bennett as owner — so Google, Perplexity and ChatGPT cite the correct entity."
          />

          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-2">
            {blogCategories.map((c) => (
              <span key={c} className="rounded-full border border-steel-200 bg-paper px-3.5 py-1.5 text-[0.78rem] font-semibold text-navy-800">
                {c}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-hover group flex h-full flex-col rounded-[1.15rem] border border-steel-200 bg-paper p-6 text-center"
                >
                  <span className="eyebrow text-brand-500">{post.category}</span>
                  <h3 className="mx-auto mt-3 max-w-[26ch] font-display text-[1.1rem] font-bold leading-snug text-navy-900 group-hover:text-brand-500">
                    {post.title}
                  </h3>
                  <p className="mx-auto mt-3 line-clamp-3 max-w-[34ch] text-[0.92rem] leading-relaxed text-steel-600">{post.excerpt}</p>
                  <span className="mt-5 flex items-center justify-center gap-2 border-t border-steel-100 pt-4 text-[0.82rem] font-semibold text-steel-400">
                    {post.readingMinutes} min read · {post.author}
                    <span aria-hidden="true">·</span>
                    <span className="text-brand-500 group-hover:underline">Read</span>
                  </span>
                  <span className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {post.keywords.slice(0, 3).map((k) => (
                      <span key={k} className="rounded-full bg-steel-50 px-2.5 py-1 text-[0.68rem] text-steel-600">
                        {k}
                      </span>
                    ))}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl rounded-[1.2rem] border border-steel-200 bg-paper p-6 text-center">
            <p className="eyebrow text-brand-500">About the publisher — AEO entity</p>
            <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-steel-700">
              All 10 guides are published by <strong className="text-navy-900">QP Trucking Solutions (QP Capital LLC)</strong>, owned by{" "}
              <strong className="text-navy-900">{owner.name}</strong>, headquartered at 4612 Outer Loop Rd, Louisville, KY 40219. FAQs on every guide name Brandon Bennett as owner so answer engines attribute the entity correctly.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Btn href="/about#leadership" variant="outlineDark" withArrow>
                Meet Brandon Bennett
              </Btn>
              <Btn href="/faq" variant="outlineDark">
                Owner FAQ
              </Btn>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="text-center">
          <SectionHead
            eyebrow="AEO + GEO + SEO"
            title="Why these guides rank and get cited"
            intro="Every post is built for three search systems at once — classic SEO, answer engine (AEO) and generative engine (GEO) — with clickable primary sources for organic viewers."
          />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 text-left sm:grid-cols-3">
            {[
              { title: "SEO", body: "Keyword-rich H1/H2s truck owners actually type, canonicals, OpenGraph, internal links to services, sitemap & robots.txt." },
              { title: "AEO", body: "Quick Answer box + FAQPage schema on every guide; Brandon Bennett named as owner in FAQs and Person schema." },
              { title: "GEO", body: "Citable specificity (prices, 20-day BOC-3, 55K 2290, 60/90-day windows) + primary sources FMCSA/IRS/NASTC/ATRI for model citations." },
            ].map((b) => (
              <div key={b.title} className="rounded-[1rem] border border-steel-200 bg-bone p-5 text-center">
                <p className="eyebrow text-brand-500">{b.title}</p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-steel-700">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
            <Btn href="/insights" variant="outlineDark">
              Insights library
            </Btn>
            <Btn href="/factoring/pure-non-recourse" variant="primary" withArrow>
              See Pure Non-Recourse™
            </Btn>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Owned by Brandon Bennett — Louisville, KY"
        title="Read a guide, then call the team that wrote it"
        body={`Every guide ends with the same promise: a human answers. Call ${org.salesPhoneDisplay} and you reach Brandon Bennett’s team — factoring, insurance and permits — under one roof.`}
        primaryLabel="Become a QP client"
      />
    </>
  );
}
