import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/hero/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { insights, insightsBySlug } from "@/content/insights";
import { org } from "@/content/site";
import { servicesBySlug, servicePath } from "@/content/services";

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = insightsBySlug[slug];
  if (!post) return { title: "Article not found" };
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    keywords: post.keywords,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = insightsBySlug[slug];
  if (!post) notFound();

  const related = insights.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            slug: post.slug,
            title: post.title,
            description: post.description,
            date: post.date,
            updated: post.updated,
            image: post.image,
          }),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: post.title, href: `/insights/${post.slug}` },
          ]),
          ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
        ]}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        tagline={post.description}
        image={post.image}
        imageAlt={post.title}
        variant={post.category === "Glossary" ? "binder" : "tech"}
        accent="teal"
        trail={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title, href: `/insights/${post.slug}` },
        ]}
        stats={[
          { label: "Category", value: post.category },
          { label: "Published", value: new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) },
          { label: "Reading time", value: `${post.readingMinutes} min` },
          { label: "Author", value: "QP Trucking Solutions" },
        ]}
        primaryHref="/get-started"
        primaryLabel="Talk to a specialist"
        priority
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <article className="max-w-3xl">
              {post.blocks.map((block, i) => {
                if (block.type === "h2")
                  return (
                    <h2 key={i} className="mt-10 font-display text-display-sm text-navy-900 first:mt-0">
                      {block.text}
                    </h2>
                  );
                if (block.type === "ul")
                  return (
                    <ul key={i} className="mt-4 grid gap-3">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-steel-700">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                if (block.type === "quote")
                  return (
                    <blockquote key={i} className="mt-6 border-l-4 border-gold-400 bg-bone p-5 text-[1rem] italic text-navy-800">
                      {block.text}
                    </blockquote>
                  );
                return (
                  <p key={i} className="mt-4 text-[1.02rem] leading-relaxed text-steel-700">
                    {block.text}
                  </p>
                );
              })}

              {/* glossary rendering for the terminology article */}
              {post.glossary?.length ? (
                <div className="mt-10">
                  <h2 className="font-display text-display-sm text-navy-900">
                    Trucking terminology, A–Z ({post.glossary.length} terms)
                  </h2>
                  <dl className="mt-5 divide-y divide-steel-100 border-t border-steel-100">
                    {post.glossary.map((t) => (
                      <div key={t.term} id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="py-4">
                        <dt className="font-display text-[1.02rem] font-bold text-navy-900">{t.term}</dt>
                        <dd className="mt-1.5 text-[0.97rem] leading-relaxed text-steel-700">{t.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              <div className="mt-12 rounded-[1.2rem] border border-steel-200 bg-bone p-6">
                <p className="eyebrow text-brand-500">About the author</p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-steel-700">
                  <strong className="text-navy-900">QP Trucking Solutions</strong> ({org.legalName}) is a family-owned
                  factoring company, licensed trucking insurance agency and FMCSA compliance partner in Louisville,
                  Kentucky. The team has helped more than a thousand carriers get funded, insured and compliant.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Btn href="/get-started" variant="primary" withArrow>
                    Get a free consultation
                  </Btn>
                  <Btn href={`tel:${org.salesPhone}`} variant="outlineDark">
                    Call {org.salesPhoneDisplay}
                  </Btn>
                </div>
              </div>
            </article>

            {/* sidebar */}
            <aside className="grid h-fit gap-5 lg:sticky lg:top-28">
              <div className="rounded-[1.15rem] border border-steel-200 bg-paper p-6">
                <p className="eyebrow text-brand-500">Readers also use</p>
                <ul className="mt-4 grid gap-3">
                  {[servicesBySlug["trucking-factoring"], servicesBySlug["insurance"], servicesBySlug["new-authority"]].map((s) => (
                    <li key={s.slug}>
                      <Link href={servicePath(s)} className="group block">
                        <span className="block font-display text-[1rem] font-bold text-navy-900 group-hover:text-brand-500">
                          {s.short}
                        </span>
                        <span className="mt-1 block text-[0.85rem] leading-snug text-steel-600">{s.tagline}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-[1.15rem] bg-navy-900 p-6 text-white">
                <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-35" />
                <p className="relative eyebrow text-gold-400">Free broker credit checks</p>
                <p className="relative mt-3 text-[0.95rem] leading-relaxed text-white/85">
                  QP clients can verify any broker's credit before booking a load — no cost, no limit.
                </p>
                <Btn href="/factoring/trucking-factoring" variant="gold" className="relative mt-4 w-full">
                  How factoring works
                </Btn>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {post.faqs?.length ? (
        <Section tone="steel" id="article-faqs">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
              <SectionHead
                eyebrow="Article FAQs"
                title={`Questions about ${post.title.toLowerCase()}`}
                intro="Quick, direct answers to common follow-up questions. Confirm current requirements and your written agreement for your specific operation."
              />
              <FaqAccordion faqs={post.faqs} defaultOpen={null} />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="steel">
        <Container>
          <SectionHead eyebrow="Keep reading" title="More from the insights library" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.07}>
                <Link
                  href={`/insights/${r.slug}`}
                  className="card-hover group flex h-full flex-col rounded-[1.1rem] border border-steel-200 bg-paper p-6"
                >
                  <span className="eyebrow text-brand-500">{r.category}</span>
                  <h3 className="mt-3 font-display text-[1.08rem] font-bold leading-snug text-navy-900 group-hover:text-brand-500">
                    {r.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[0.9rem] leading-relaxed text-steel-600">{r.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Questions about this article?"
        title="Ask us — we answer the phone"
        body={`Call ${org.salesPhoneDisplay} and talk to someone who funds carriers and files compliance documents every day.`}
        primaryLabel="Talk to a specialist"
      />
    </>
  );
}
