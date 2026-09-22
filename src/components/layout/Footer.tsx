import Link from "next/link";
import { QPMark, BrandLockup } from "@/components/brand";
import { Container } from "@/components/ui";
import { org, trust } from "@/content/site";
import { complianceServices, factoringServices, servicePath } from "@/content/services";

const columns = [
  {
    title: "Factoring",
    links: factoringServices.map((s) => ({ label: s.short, href: servicePath(s) })),
  },
  {
    title: "Authority & compliance",
    links: complianceServices.slice(0, 8).map((s) => ({ label: s.short, href: servicePath(s) })),
  },
  {
    title: "Company",
    links: [
      { label: "About QP — Brandon Bennett", href: "/about" },
      { label: "Blog — 10 guides", href: "/blog" },
      { label: "Insurance", href: "/insurance" },
      { label: "All services & pricing", href: "/store" },
      { label: "Insights", href: "/insights" },
      { label: "FAQ — Owner: Brandon Bennett", href: "/faq" },
      { label: "Get started", href: "/get-started" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <span aria-hidden="true" className="stripe-band pointer-events-none absolute inset-0 opacity-25" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-brand-500/15 blur-[120px]"
      />

      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_2.4fr]">
          {/* identity + NAP (critical for local SEO & AEO entity matching) */}
          <div>
            {/* the official stacked lockup, exactly as supplied */}
            <BrandLockup tone="white" height={108} className="h-[108px] w-auto" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
              Factoring, trucking insurance, authority setup and FMCSA compliance for owner-operators and fleets —
              everything a trucking company needs under one roof.
            </p>

            <address className="mt-6 not-italic">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-400">Visit / mail us</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/85">
                {org.legalName}
                <br />
                {org.street}
                <br />
                {org.city}, {org.region} {org.postalCode}
              </p>
              <p className="mt-3 text-[0.9rem] text-white/70">{org.hoursDisplay}</p>
              <div className="mt-4 grid gap-2">
                <a href={`tel:${org.salesPhone}`} className="text-[0.95rem] font-bold text-white hover:text-gold-400">
                  Sales & new clients: {org.salesPhoneDisplay}
                </a>
                <a href={`tel:${org.officePhone}`} className="text-[0.95rem] font-bold text-white hover:text-gold-400">
                  Office / accounting: {org.officePhoneDisplay}
                </a>
                <a href={`mailto:${org.email}`} className="text-[0.95rem] text-white/85 hover:text-gold-400">
                  {org.email}
                </a>
              </div>
            </address>
          </div>

          {/* link columns */}
          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-400">{col.title}</h2>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.9rem] text-white/75 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* trust ticker */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8">
          {trust.badges.slice(0, 6).map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-[0.78rem] font-semibold text-white/80"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.8rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {org.legalName}. All rights reserved. Pure Non-Recourse™ is a trademark of {org.legalName}.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy policy
            </Link>
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
            <a href={org.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Directions
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
