import Image from "next/image";
import { Btn, Container, TrustBadges } from "@/components/ui";

const links = [
  ["Featured profile: QP Trucking Solutions", "https://www.transportationreview.com/qp-trucking-solutions-2026"],
  ["Factoring Solutions directory", "https://factoring-solutions.transportationreview.com/"],
  ["Trucking Factoring Solutions", "https://www.transportationreview.com/a/trucking-factoring-solutions"],
  ["Top Transportation Factoring Services", "https://factoring-solutions.transportationreview.com/vendors/top-transportation-factoring-services.html"],
  ["Buyer’s Guide: Turning Freight Receivables Into Working Cash", "https://www.transportationreview.com/deep-dive/turning-freight-receivables-into-working-cash-nwid-1104.html"],
] as const;

export function FeaturedRecognition({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="featured-recognition" className={compact ? "border-y border-steel-200 bg-white py-14" : "bg-gold-50 py-16"}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-center">
          <div>
            <Image src="/images/recognition/top-trucking-factoring-solution-2026-badge.png" alt="Top Trucking Factoring Solution 2026 — QP Trucking Solutions, awarded by Transportation Review" width={160} height={160} className="mb-4 h-auto w-32 sm:w-40" />
            <p className="eyebrow text-brand-500">Industry recognition</p>
            <h2 id="featured-recognition" className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight text-navy-900">
              QP Trucking Solutions is featured by Transportation Review
            </h2>
            <p className="mt-4 leading-relaxed text-steel-700">
              Explore our featured profile and learn why carriers choose QP for trucking factoring, freight receivables financing, and transportation business solutions.
            </p>
            <div className="mt-6">
              <TrustBadges items={["Featured company", "Top transportation factoring service", "Trucking factoring solutions"]} tone="light" />
            </div>
            <div className="mt-6"><Btn href="/industry-recognition">Read the full recognition</Btn></div>
          </div>
          <nav aria-label="QP Trucking Solutions featured coverage">
            <ul className="grid gap-3">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`group flex items-center justify-between rounded-xl border px-5 py-4 transition-colors ${compact ? "border-steel-200 bg-white hover:border-brand-500" : "border-gold-200 bg-white hover:border-brand-500"}`}>
                    <span className="font-semibold text-navy-900">{label}</span>
                    <span aria-hidden="true" className="ml-4 text-brand-500 transition-transform group-hover:translate-x-1">↗</span>
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
