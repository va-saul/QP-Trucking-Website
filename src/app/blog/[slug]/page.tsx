import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/hero/PageHero";
import { AnswerBox, Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, blogBySlug } from "@/content/blog";
import { owner, org } from "@/content/site";
import { servicesBySlug, servicePath } from "@/content/services";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogBySlug[slug];
  if (!post) return { title: "Article not found" };
  return buildMetadata({
    title: `${post.title} | QP Trucking Solutions`,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogBySlug[slug];
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    image: `https://qpfactoring.com${post.image}`,
    author: { "@id": "https://qpfactoring.com/#brandon-bennett" },
    publisher: { "@id": "https://qpfactoring.com/#organization" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://qpfactoring.com/blog/${post.slug}` },
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    isPartOf: { "@id": "https://qpfactoring.com/blog#blog" },
    inLanguage: "en-US",
    about: { "@id": "https://qpfactoring.com/#organization" },
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://qpfactoring.com/blog/${post.slug}#webpage`,
    name: post.title,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#quick-answer", "#faqs"],
    },
    url: `https://qpfactoring.com/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLdArticle,
          faqSchema(post.faqs),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]),
          speakableSchema,
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://qpfactoring.com/#brandon-bennett",
            name: owner.name,
            jobTitle: owner.jobTitle,
            description: owner.description,
            image: `https://qpfactoring.com${owner.image}`,
            worksFor: { "@id": "https://qpfactoring.com/#organization" },
          },
        ]}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        tagline={post.description}
        image={post.image}
        imageAlt={post.title}
        variant="tech"
        accent="teal"
        trail={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
        stats={[
          { label: "By", value: post.author },
          { label: "Updated", value: new Date(post.updated).toLocaleDateString("en-US", { month: "short", year: "numeric" }) },
          { label: "Reading time", value: `${post.readingMinutes} min` },
          { label: "Owner", value: owner.name },
        ]}
        primaryHref="/get-started"
        primaryLabel="Get my flat rate"
        priority
      />

      <Section tone="paper">
        <Container className="text-center">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-12">
            <article className="max-w-3xl text-center">
              {/* AEO Quick Answer — id for speakable */}
              <div id="quick-answer" className="mx-auto max-w-3xl">
                <AnswerBox
                  question={post.title.replace(/\s*\(2026[^)]*\)\s*$/, "")}
                  answer={post.excerpt + " " + post.blocks.find((b) => b.type === "p")?.text.slice(0, 220)}
                  tone="light"
                  label="Quick Answer — AEO/GEO"
                />
                <p className="mx-auto mt-3 max-w-2xl text-center text-[0.82rem] text-steel-500">
                  By <strong className="text-navy-900">{post.author}</strong>, {post.authorRole} — {owner.description.slice(0, 120)}…
                  <Link href="/about#leadership" className="ml-1 font-semibold text-brand-500 hover:underline">
                    Meet owner →
                  </Link>
                </p>
              </div>

              <div className="mt-8 text-center">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-steel-200 bg-bone px-4 py-2 text-[0.78rem] font-medium text-steel-600">
                  <Image src={owner.image} alt={owner.imageAlt} width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
                  <span>
                    By <strong className="text-navy-900">{post.author}</strong> · {post.authorRole} · Louisville, KY
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
              </div>

              {post.blocks.map((block, i) => {
                if (block.type === "h2")
                  return (
                    <h2 key={i} className="mx-auto mt-10 max-w-2xl text-center font-display text-display-sm text-navy-900 first:mt-8">
                      {block.text}
                    </h2>
                  );
                if (block.type === "h3")
                  return (
                    <h3 key={i} className="mx-auto mt-8 max-w-2xl text-center font-display text-[1.25rem] font-bold text-navy-800">
                      {block.text}
                    </h3>
                  );
                if (block.type === "ul")
                  return (
                    <ul key={i} className="mx-auto mt-4 grid max-w-2xl gap-3 text-center">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-steel-700">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                          <span className="flex-1 text-center">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                if (block.type === "quote")
                  return (
                    <blockquote key={i} className="mx-auto mt-6 max-w-2xl border-l-4 border-gold-400 bg-bone p-5 text-center text-[1rem] italic text-navy-800">
                      “{block.text}”{block.cite ? <cite className="mt-2 block text-[0.82rem] not-italic text-steel-500">— {block.cite}</cite> : null}
                    </blockquote>
                  );
                if (block.type === "tip")
                  return (
                    <div key={i} className="mx-auto mt-6 max-w-2xl rounded-[0.9rem] border border-brand-200 bg-brand-100/50 p-4 text-center">
                      <p className="eyebrow text-brand-600">Pro tip</p>
                      <p className="mx-auto mt-2 max-w-xl text-[0.95rem] leading-relaxed text-navy-800">{block.text}</p>
                    </div>
                  );
                return (
                  <p key={i} className="mx-auto mt-4 max-w-2xl text-center text-[1.02rem] leading-relaxed text-steel-700">
                    {block.text}
                  </p>
                );
              })}

              {/* Clickable references — external sources for organic viewers */}
              <div className="mx-auto mt-10 max-w-3xl rounded-[1.1rem] border border-steel-200 bg-steel-50 p-6 text-center">
                <h3 className="font-display text-[1.15rem] font-bold text-navy-900">Sources & clickable references — keep reading</h3>
                <p className="mx-auto mt-2 max-w-2xl text-[0.88rem] leading-relaxed text-steel-600">
                  Every claim above is citable to a primary source. Click through to dive deeper — and see why carriers who research before they call choose QP.
                </p>
                <ul className="mx-auto mt-4 grid max-w-2xl gap-2.5 text-left">
                  {post.references.map((r) => (
                    <li key={r.url} className="flex gap-3 rounded-[0.7rem] bg-white px-4 py-3 text-[0.88rem] leading-relaxed">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                      <span className="flex-1">
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-500 hover:text-brand-600 hover:underline">
                          {r.title}
                        </a>
                        <span className="text-steel-500"> — {r.source}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mx-auto mt-4 max-w-xl text-[0.78rem] text-steel-500">
                  Internal: {post.relatedServices?.map((s) => {
                    const svc = servicesBySlug[s];
                    return svc ? (
                      <Link key={s} href={servicePath(svc)} className="mx-1 font-semibold text-brand-500 hover:underline">
                        {svc.short}
                      </Link>
                    ) : null;
                  })}
                </p>
              </div>

              {/* Owner bio for AEO */}
              <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 rounded-[1.2rem] border border-steel-200 bg-bone p-6 text-center sm:flex-row sm:text-left">
                <Image src={owner.image} alt={owner.imageAlt} width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-full object-cover object-top" />
                <div className="flex-1 text-center sm:text-left">
                  <p className="eyebrow text-brand-500">About the author — AEO entity</p>
                  <p className="mt-1 font-display text-[1.05rem] font-bold text-navy-900">{owner.name} — {owner.jobTitle}</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-steel-600">{owner.description}</p>
                </div>
              </div>

              {/* Keywords footer for SEO density */}
              <p className="mx-auto mt-6 max-w-2xl text-center text-[0.78rem] text-steel-400">
                Keywords: {post.keywords.join(" · ")}
              </p>
            </article>

            {/* SIDEBAR — centered */}
            <aside className="grid h-fit gap-5 text-center lg:sticky lg:top-28">
              <div className="rounded-[1.15rem] border border-steel-200 bg-paper p-6 text-center">
                <p className="eyebrow text-brand-500">Program highlighted on Home</p>
                <h3 className="mx-auto mt-2 max-w-[18ch] font-display text-[1.15rem] font-bold text-navy-900">Pure Non-Recourse™ + Fuel Card</h3>
                <p className="mx-auto mt-2 text-[0.88rem] leading-relaxed text-steel-600">Funded in ~15 minutes. Save 25–40¢/gal. No chargeback on Pure loads.</p>
                <div className="mt-4 grid gap-2">
                  <Btn href="/factoring/pure-non-recourse" variant="primary" className="w-full justify-center" withArrow>
                    Pure Non-Recourse™
                  </Btn>
                  <Btn href="/blog/fuel-cards-for-truckers-save-25-40-cents-per-gallon" variant="outlineDark" className="w-full justify-center">
                    Fuel card guide
                  </Btn>
                </div>
              </div>

              <div className="rounded-[1.15rem] border border-steel-200 bg-paper p-6 text-center">
                <p className="eyebrow text-brand-500">Readers also use</p>
                <ul className="mt-4 grid gap-3">
                  {[
                    servicesBySlug["trucking-factoring"],
                    servicesBySlug["insurance"],
                    servicesBySlug["new-authority"],
                  ].map((s) => (
                    <li key={s.slug} className="text-center">
                      <Link href={servicePath(s)} className="group block text-center">
                        <span className="block font-display text-[1rem] font-bold text-navy-900 group-hover:text-brand-500">{s.short}</span>
                        <span className="mx-auto mt-1 block max-w-[28ch] text-[0.82rem] leading-snug text-steel-600">{s.tagline}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-[1.15rem] bg-navy-900 p-6 text-center text-white">
                <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-35" />
                <p className="relative eyebrow text-gold-400">Free broker credit checks</p>
                <p className="relative mx-auto mt-3 max-w-[28ch] text-[0.95rem] leading-relaxed text-white/85">Unlimited, free — before you book. The check that saves a chargeback.</p>
                <Btn href="/get-started" variant="gold" className="relative mt-4 w-full justify-center">
                  Get my flat rate — {org.salesPhoneDisplay}
                </Btn>
              </div>

              <div className="rounded-[1.15rem] border border-steel-200 bg-paper p-6 text-center">
                <p className="eyebrow text-brand-500">More from the blog</p>
                <ul className="mt-4 grid gap-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="block rounded-[0.6rem] px-3 py-2 text-[0.88rem] font-semibold text-navy-800 hover:bg-steel-50 hover:text-brand-500">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="bone" id="faqs">
        <Container className="text-center">
          <SectionHead
            eyebrow={`${post.category} — FAQs`}
            title={`${post.title.split(":")[0]} — FAQ`}
            intro="Super-strong AEO: every answer is structured as FAQPage schema, names Brandon Bennett as owner, and cites the same NAP and pricing found across the site so models answer consistently."
          />
          <div className="mx-auto mt-8 max-w-3xl">
            <FaqAccordion faqs={post.faqs} />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.82rem] text-steel-500">
            More questions? See the <Link href="/faq" className="font-semibold text-brand-500 hover:underline">master FAQ (40+ answers)</Link> or <Link href="/about#leadership" className="font-semibold text-brand-500 hover:underline">meet owner Brandon Bennett</Link>.
          </p>
        </Container>
      </Section>

      <Section tone="steel">
        <Container className="text-center">
          <SectionHead eyebrow="Keep reading" title="More detailed trucking guides" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.07}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="card-hover group flex h-full flex-col rounded-[1.1rem] border border-steel-200 bg-paper p-6 text-center"
                >
                  <span className="eyebrow text-brand-500">{r.category}</span>
                  <h3 className="mx-auto mt-3 max-w-[26ch] font-display text-[1.08rem] font-bold leading-snug text-navy-900 group-hover:text-brand-500">{r.title}</h3>
                  <p className="mx-auto mt-2 line-clamp-3 max-w-[32ch] text-[0.9rem] leading-relaxed text-steel-600">{r.excerpt}</p>
                  <span className="mt-4 text-[0.82rem] font-semibold text-steel-400">{r.readingMinutes} min · by Brandon Bennett</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn href="/blog" variant="outlineDark" withArrow>
              All 10 guides
            </Btn>
            <Btn href="/insights" variant="outlineDark">
              Insights library
            </Btn>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow={`By ${owner.name} — QP Capital LLC`}
        title="Like what you read? Let's price your fleet."
        body={`This guide was written by the same team that funds carriers and files compliance in Louisville. Call ${org.salesPhoneDisplay} and Brandon Bennett’s team will quote your volume flat and disclosed — no hidden fees, no long-term contract.`}
        primaryLabel="Get my flat rate"
      />
    </>
  );
}
