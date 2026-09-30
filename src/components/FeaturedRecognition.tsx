import Image from "next/image";
import Link from "next/link";
import { Container, TrustBadges } from "@/components/ui";

const links = [
  ["Featured profile: QP Trucking Solutions", "https://www.transportationreview.com/qp-trucking-solutions-2026"],
  ["Factoring Solutions directory", "https://factoring-solutions.transportationreview.com/"],
  ["Trucking Factoring Solutions", "https://www.transportationreview.com/a/trucking-factoring-solutions"],
  ["Top Transportation Factoring Services", "https://factoring-solutions.transportationreview.com/vendors/top-transportation-factoring-services.html"],
  ["Buyer’s Guide: Turning Freight Receivables Into Working Cash", "https://www.transportationreview.com/deep-dive/turning-freight-receivables-into-working-cash-nwid-1104.html"],
] as const;

export function FeaturedRecognition({ compact = false }: { compact?: boolean }) {
  // compact mode = the pre-footer band (used on every page via Footer).
  // Light (white/bone) palette so text remains legible above the dark footer.
  const sectionClass = compact
    ? "bg-white py-10 border-t border-steel-200"
    : "bg-gold-50 py-16";
  const badgeCardClass = compact
    ? "border-gold-200 bg-gold-50 shadow-sm hover:border-brand-500"
    : "border-gold-200 bg-white shadow-sm hover:border-brand-500";
  const linkCardClass = compact
    ? "border-gold-200 bg-bone hover:border-brand-500"
    : "border-gold-200 bg-white hover:border-brand-500";

  return (
    <section aria-labelledby="featured-recognition" className={sectionClass}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[auto_1fr_1.25fr] lg:items-center">
          {/* Award logo (exact JPG rendered from the Transportation Review PDF) */}
          <Link
            href="/awards"
            className={`group mx-auto block w-full max-w-[220px] rounded-2xl border p-3 transition-all hover:-translate-y-1 ${badgeCardClass}`}
            aria-label="View the Top Trucking Factoring Solution 2026 award page"
          >
            <Image
              src="/images/awards/award-logo.jpg"
              alt="Top Trucking Factoring Solution 2026 — QP Trucking Solutions, awarded by Transportation Review"
              width={750}
              height={750}
              className="h-auto w-full"
            />
          </Link>

          <div>
            <p className="eyebrow text-brand-500">Industry recognition</p>
            <h2
              id="featured-recognition"
              className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight text-navy-900"
            >
              QP Trucking Solutions is featured by Transportation Review
            </h2>
            <p className="mt-4 leading-relaxed text-steel-700">
              Named a <strong className="text-brand-600">Top Trucking Factoring Solution for 2026</strong> by
              Transportation Review&apos;s Editorial Board. Explore our featured profile and official certificate.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/awards"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-[0.88rem] font-bold text-white transition-colors hover:bg-brand-600"
              >
                View award &amp; certificate
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://www.transportationreview.com/qp-trucking-solutions-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[0.88rem] font-semibold text-navy-800 underline-offset-4 hover:underline"
              >
                Featured profile ↗
              </a>
            </div>
            <div className="mt-5">
              <TrustBadges
                items={[
                  "Top Trucking Factoring Solution 2026",
                  "Featured company",
                  "Editorial board recognition",
                ]}
                tone="light"
              />
            </div>
          </div>

          <nav aria-label="QP Trucking Solutions featured coverage">
            <ul className="grid gap-3">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between rounded-xl border px-5 py-4 transition-colors ${linkCardClass}`}
                  >
                    <span className="font-semibold text-navy-900">{label}</span>
                    <span
                      aria-hidden="true"
                      className="ml-4 text-brand-500 transition-transform group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
