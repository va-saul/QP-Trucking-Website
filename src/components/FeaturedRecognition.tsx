import { Container, TrustBadges } from "@/components/ui";

const links = [
  ["Featured profile: QP Trucking Solutions", "https://www.transportationreview.com/qp-trucking-solutions-2026"],
  ["Factoring Solutions directory", "https://factoring-solutions.transportationreview.com/"],
  ["Trucking Factoring Solutions", "https://www.transportationreview.com/a/trucking-factoring-solutions"],
  ["Top Transportation Factoring Services", "https://factoring-solutions.transportationreview.com/vendors/top-transportation-factoring-services.html"],
  ["Buyer’s Guide: Turning Freight Receivables Into Working Cash", "https://www.transportationreview.com/deep-dive/turning-freight-receivables-into-working-cash-nwid-1104.html"],
] as const;

export function FeaturedRecognition({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="featured-recognition" className={compact ? "bg-navy-950 py-10 text-white" : "bg-gold-50 py-16"}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-center">
          <div>
            <p className="eyebrow text-brand-500">Industry recognition</p>
            <h2 id="featured-recognition" className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight text-navy-900">
              QP Trucking Solutions is featured by Transportation Review
            </h2>
            <p className={compact ? "mt-4 leading-relaxed text-white/75" : "mt-4 leading-relaxed text-steel-700"}>
              Explore our featured profile and learn why carriers choose QP for trucking factoring, freight receivables financing, and transportation business solutions.
            </p>
            <div className="mt-6">
              <TrustBadges items={["Featured company", "Top transportation factoring service", "Trucking factoring solutions"]} tone={compact ? "dark" : "light"} />
            </div>
          </div>
          <nav aria-label="QP Trucking Solutions featured coverage">
            <ul className="grid gap-3">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`group flex items-center justify-between rounded-xl border px-5 py-4 transition-colors ${compact ? "border-white/15 bg-white/5 hover:bg-white/10" : "border-gold-200 bg-white hover:border-brand-500"}`}>
                    <span className={`font-semibold ${compact ? "text-white" : "text-navy-900"}`}>{label}</span>
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
