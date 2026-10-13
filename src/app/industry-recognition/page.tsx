import Image from "next/image";
import { Btn, Container } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";
import { certificate, deepDiveBlocks, profileBlocks, type Block } from "@/content/recognition";

const BADGE = "/images/recognition/top-trucking-factoring-solution-2026-badge.png";

export const metadata = buildMetadata({
  title: "Top Trucking Factoring Solution 2026 | QP Trucking Solutions",
  description:
    "QP Trucking Solutions was named Top Trucking Factoring Solution 2026 by Transportation Review. Read the featured profile, the Deep Dive article and the certificate of recognition.",
  path: "/industry-recognition",
  keywords: [
    "Top Trucking Factoring Solution 2026",
    "Transportation Review QP Trucking Solutions",
    "best trucking factoring company",
    "trucking factoring award",
  ],
  image: BADGE,
  imageWidth: 550,
  imageHeight: 550,
});

const links = [
  ["Featured profile: QP Trucking Solutions", "https://www.transportationreview.com/qp-trucking-solutions-2026"],
  ["Factoring Solutions directory", "https://factoring-solutions.transportationreview.com/"],
  ["Trucking Factoring Solutions", "https://www.transportationreview.com/a/trucking-factoring-solutions"],
  ["Top Transportation Factoring Services", "https://factoring-solutions.transportationreview.com/vendors/top-transportation-factoring-services.html"],
  ["Buyer’s Guide: Turning Freight Receivables Into Working Cash", "https://www.transportationreview.com/deep-dive/turning-freight-receivables-into-working-cash-nwid-1104.html"],
] as const;

function Blocks({ items }: { items: Block[] }) {
  return (
    <>
      {items.map(([k, t], i) => {
        if (k === "h") return <h3 key={i} className="mt-10 font-display text-lg font-bold uppercase tracking-wide text-brand-500">{t}</h3>;
        if (k === "pull") return <blockquote key={i} className="my-8 border-l-4 border-brand-500 pl-5 font-display text-xl italic leading-snug text-navy-900">{t}</blockquote>;
        if (k === "quote") return <p key={i} className="my-8 rounded-2xl border border-steel-200 bg-steel-50 p-6 leading-relaxed text-navy-900">{t}</p>;
        return <p key={i} className="mt-4 leading-relaxed text-steel-700">{t}</p>;
      })}
    </>
  );
}

export default function IndustryRecognitionPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Industry recognition", href: "/industry-recognition" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Top Trucking Factoring Solution 2026 — QP Trucking Solutions",
            url: `${SITE_URL}/industry-recognition`,
            about: { "@id": `${SITE_URL}/#organization` },
            primaryImageOfPage: `${SITE_URL}${BADGE}`,
          },
        ]}
      />

      <header className="bg-navy-950 pt-[120px] pb-16 text-white lg:pt-[168px] lg:pb-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="eyebrow text-brand-300">Industry recognition</p>
              <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-tight text-white">
                QP Trucking Solutions is featured by Transportation Review
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
                Named <strong className="text-white">Top Trucking Factoring Solution 2026</strong> by the Editorial Board of Transportation Review. Explore our featured profile and learn why carriers choose QP for trucking factoring, freight receivables financing, and transportation business solutions.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                {["Featured company", "Top transportation factoring service", "Trucking factoring solutions"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold-400" />{t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href="#profile">Featured profile</Btn>
                <Btn href="#deep-dive" variant="outline">Deep Dive article</Btn>
                <Btn href="#certificate" variant="outline">Certificate</Btn>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[380px] rounded-3xl bg-white p-5 shadow-2xl">
              <Image src={BADGE} alt="Top Trucking Factoring Solution 2026 award — QP Trucking Solutions, awarded by Transportation Review" width={550} height={550} priority className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </header>

      <section id="profile" className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-brand-500">Featured profile · Top Trucking Factoring Solution 2026</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold text-navy-900">QP Trucking Solutions</h2>
            <p className="mt-2 text-xl text-navy-900">Helping Trucking Companies Move Forward With Confidence</p>
            <Blocks items={profileBlocks} />
            <figure className="mt-10">
              <Image src="/images/recognition/reprint-featured-profile.jpg" alt="Transportation Review featured profile page: QP Trucking Solutions" width={1296} height={880} className="h-auto w-full rounded-xl border border-steel-200 shadow-lg" />
              <figcaption className="mt-2 text-sm text-steel-600">Featured profile as published in Transportation Review.</figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section id="deep-dive" className="bg-steel-50 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-brand-500">Deep Dive</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold text-navy-900">Turning Freight Receivables Into Working Cash</h2>
            <Blocks items={deepDiveBlocks} />
            <figure className="mt-10">
              <Image src="/images/recognition/reprint-cover-deep-dive.jpg" alt="Transportation Review cover and Deep Dive article: Turning Freight Receivables Into Working Cash" width={1296} height={880} className="h-auto w-full rounded-xl border border-steel-200 shadow-lg" />
              <figcaption className="mt-2 text-sm text-steel-600">Cover and Deep Dive article as published in Transportation Review (ISSN {certificate.issn}).</figcaption>
            </figure>
            <div className="mt-8">
              <Btn href="/downloads/qp-trucking-solutions-transportation-review-reprint.pdf" variant="outlineDark">Download the reprint (PDF)</Btn>
            </div>
          </div>
        </Container>
      </section>

      <section id="certificate" className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="eyebrow text-brand-500">Certificate of recognition</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold text-navy-900">Recognized by the Editorial Board of Transportation Review</h2>
              <p className="mt-4 leading-relaxed text-steel-700">
                This is to certify that QP Trucking Solutions has been recognized by the Editorial Board of Transportation Review as <strong className="text-navy-900">{certificate.title}</strong>. Dated {certificate.dated}. Signed by {certificate.signedBy}.
              </p>
              <p className="mt-4 leading-relaxed text-steel-700"><strong className="text-navy-900">Editorial attestation:</strong> {certificate.attestation}</p>
              <div className="mt-6"><Btn href="/downloads/qp-trucking-solutions-certificate-of-recognition.pdf" variant="outlineDark">Download the certificate (PDF)</Btn></div>
            </div>
            <Image src="/images/recognition/certificate-of-recognition.jpg" alt="Certificate of Recognition — QP Trucking Solutions, Top Trucking Factoring Solution 2026" width={837} height={1126} className="mx-auto h-auto w-full max-w-[420px] rounded-xl border border-steel-200 shadow-lg" />
          </div>
        </Container>
      </section>

      <section className="bg-steel-50 py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-brand-500">Keep exploring</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy-900">More from Transportation Review</h2>
            <ul className="mt-6 grid gap-3">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-steel-200 bg-white px-5 py-4 transition-colors hover:border-brand-500">
                    <span className="font-semibold text-navy-900">{label}</span>
                    <span aria-hidden="true" className="ml-4 text-brand-500 transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
