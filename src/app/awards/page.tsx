import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { Btn, Container, CtaBand, Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { org } from "@/content/site";

export const metadata = buildMetadata({
  title: "Top Trucking Factoring Solution 2026 — QP Trucking Solutions Award",
  description:
    "QP Trucking Solutions has been named Top Trucking Factoring Solution 2026 by the Editorial Board of Transportation Review. View the official certificate and award logo.",
  path: "/awards",
  keywords: [
    "Top Trucking Factoring Solution 2026",
    "Transportation Review award",
    "QP Trucking Solutions award",
    "best trucking factoring company 2026",
    "trucking factoring award",
  ],
  image: "/images/awards/certificate.jpg",
  imageWidth: 1368,
  imageHeight: 1843,
});

export default function AwardsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Awards & Recognition", href: "/awards" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Award",
            name: "Top Trucking Factoring Solution 2026",
            description:
              "Certificate of Recognition awarded by the Editorial Board of Transportation Review to QP Trucking Solutions, September 2026.",
            recipient: {
              "@type": "Organization",
              name: "QP Trucking Solutions",
              legalName: "QP Capital LLC",
            },
            awardingOrganization: {
              "@type": "Organization",
              name: "Transportation Review",
              issn: "2993-0391",
              url: "https://www.transportationreview.com/",
            },
            date: "2026-09",
          },
        ]}
      />

      <PageHero
        eyebrow="Awards & recognition"
        title="Top Trucking Factoring Solution 2026"
        tagline="QP Trucking Solutions has been recognized by the Editorial Board of Transportation Review as a Top Trucking Factoring Solution for 2026."
        image="/images/hero/home.jpg"
        imageAlt="QP Trucking Solutions — award-winning trucking factoring, insurance and FMCSA compliance"
        variant="team"
        accent="gold"
        trail={[
          { label: "Home", href: "/" },
          { label: "Awards & Recognition", href: "/awards" },
        ]}
        stats={[
          { label: "Award", value: "Top Trucking Factoring Solution" },
          { label: "Year", value: "2026" },
          { label: "Awarded by", value: "Transportation Review" },
          { label: "Dated", value: "September 2026" },
        ]}
        primaryHref="/factoring"
        primaryLabel="Explore our factoring"
      />

      {/* ------------------------------------------------------------------ */}
      {/*  CERTIFICATE + BADGE DISPLAY                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="paper">
        <Container>
          <SectionHead
            eyebrow="Official recognition"
            title="Transportation Review — Certificate of Recognition"
            intro="Below is the official certificate presented by Transportation Review to QP Trucking Solutions, along with the 2026 Top Trucking Factoring Solution award logo, exactly as issued by the Editorial Board."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            {/* Certificate */}
            <Reveal>
              <figure className="overflow-hidden rounded-[1.25rem] border border-steel-200 bg-white shadow-lg shadow-navy-950/5">
                <a
                  href="/images/awards/certificate.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Open the full-size Transportation Review certificate of recognition"
                >
                  <Image
                    src="/images/awards/certificate.jpg"
                    alt="Certificate of Recognition — QP Trucking Solutions named Top Trucking Factoring Solution 2026 by Transportation Review, signed by Managing Editor Charles Carter, dated September 2026"
                    width={1368}
                    height={1843}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </a>
                <figcaption className="border-t border-steel-200 px-5 py-4 text-[0.88rem] text-steel-600 sm:px-6">
                  <span className="font-semibold text-navy-900">Certificate of Recognition</span> · Awarded by the
                  Editorial Board of Transportation Review (ISSN 2993-0391) · Dated September 2026.{" "}
                  <span className="text-brand-500">Click image to open full size ↗</span>
                </figcaption>
              </figure>
            </Reveal>

            {/* Award logo + attestation copy */}
            <Reveal delay={0.08}>
              <div className="grid gap-6">
                <figure className="overflow-hidden rounded-[1.25rem] border border-gold-200 bg-gradient-to-b from-gold-50 to-white p-6 shadow-sm">
                  <Image
                    src="/images/awards/award-logo.jpg"
                    alt="Top Trucking Factoring Solution 2026 award seal — QP Trucking Solutions, awarded by Transportation Review"
                    width={750}
                    height={750}
                    className="mx-auto h-auto w-full max-w-[360px] object-contain"
                  />
                  <figcaption className="mt-5 text-center text-[0.88rem] text-steel-600">
                    <span className="font-semibold text-navy-900">Official 2026 Award Seal</span>
                    <br />
                    Awarded by Transportation Review
                  </figcaption>
                </figure>

                <div className="rounded-[1.15rem] border border-steel-200 bg-bone p-6">
                  <p className="eyebrow text-brand-500">Editorial attestation</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
                    This recognition is determined through a bona fide editorial process based on the Transportation
                    Value Assessment Model and its defined methodology. It draws on independent editorial research,
                    subscriber nominations and industry input, assessing impact on mobility efficiency, network
                    performance, alignment with transportation operations, execution in time-sensitive environments and
                    industry credibility.
                  </p>
                  <p className="mt-4 text-[0.82rem] font-mono uppercase tracking-wider text-gold-600">
                    Signed · Charles Carter, Managing Editor
                  </p>
                </div>

                <div className="rounded-[1.15rem] bg-navy-900 p-6 text-white">
                  <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-25" />
                  <div className="relative">
                    <p className="eyebrow text-gold-400">Featured profile</p>
                    <p className="mt-3 font-display text-[1.1rem] font-bold leading-snug">
                      View QP Trucking Solutions on Transportation Review
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-white/70">
                      Read our featured company profile and coverage on TransportationReview.com.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href="https://www.transportationreview.com/qp-trucking-solutions-2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold"
                      >
                        View featured profile ↗
                      </a>
                      <Link href="/factoring" className="btn btn-outline">
                        Our factoring programs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  WHY WE WON                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="bone">
        <Container>
          <SectionHead
            eyebrow="Why carriers choose QP"
            title="The performance behind the recognition"
            intro="The Transportation Value Assessment Model evaluates impact across the categories below. Every program at QP is built around these same commitments to carriers."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Mobility efficiency",
                body: "Funds land in minutes after load verification via the QP Pay Card, so carriers can take the next load without waiting on net-30 pay.",
              },
              {
                title: "Network performance",
                body: "Licensed insurance, compliance, fuel cards, dispatch support and equipment finance all live under one roof — no juggling vendors.",
              },
              {
                title: "Operations alignment",
                body: "Same-day authority setup, free broker credit checks and a specialist who already knows your file when you call.",
              },
              {
                title: "Time-sensitive execution",
                body: "Pure Non-Recourse™ protects carriers against broker bankruptcy and chargebacks, with typical funding in about 15 minutes after verification.",
              },
              {
                title: "Industry credibility",
                body: "Family-owned in Louisville, KY, serving 1,000+ carriers across 48 states with no long-term contract and flat, disclosed fees.",
              },
              {
                title: "Editorial independence",
                body: "Transportation Review selected QP through editorial research and subscriber nominations — not a paid listing.",
              },
            ].map((c) => (
              <Reveal key={c.title}>
                <div className="h-full rounded-[1.1rem] border border-steel-200 bg-white p-6">
                  <p className="eyebrow text-brand-500">{c.title}</p>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-steel-700">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Btn href="/factoring/trucking-factoring" variant="primary" withArrow>
              How transportation factoring works
            </Btn>
            <Btn href={`tel:${org.salesPhone}`} variant="outlineDark">
              Call {org.salesPhoneDisplay}
            </Btn>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Work with an award-winning factoring partner"
        title="Get paid in minutes — not 30–45 days"
        body={`Named a Top Trucking Factoring Solution for 2026. Tell us about your trucks and your customers, and a QP specialist will call you back the same business day with a flat, disclosed rate — or dial ${org.salesPhoneDisplay} right now.`}
        primaryLabel="Become a QP client"
      />
    </>
  );
}
