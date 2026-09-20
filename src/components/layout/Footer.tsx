import Link from "next/link";
import { QPMark, Logo } from "@/components/brand";
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
    links: complianceServices.slice(0, 6).map((s) => ({ label: s.short, href: servicePath(s) })),
  },
  {
    title: "Company",
    links: [
      { label: "About QP", href: "/about" },
      { label: "Insurance", href: "/insurance" },
      { label: "All services & pricing", href: "/store" },
      { label: "Insights", href: "/insights" },
      { label: "FAQ", href: "/faq" },
      { label: "Get started", href: "/get-started" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: org.facebook,
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.6 1.6-1.6h1.7V3.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.7V13h2.7v8h3.1Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: org.instagram,
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "X",
    href: org.twitter,
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M18.2 3h3l-6.6 7.5L22.5 21h-6l-4.7-6.2L6.4 21h-3l7-8L2.5 3h6.1l4.2 5.6L18.2 3Zm-1 16.2h1.7L7 4.7H5.2L17.2 19.2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: org.linkedin,
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: org.youtube,
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M22 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7.2.2c-.4.1-1.2.1-2 .9C2.2 6.6 2 8 2 8S1.8 9.7 1.8 11.3v1.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 7.3.2 7.3.2s4.4 0 7.2-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.4C22.2 9.7 22 8 22 8ZM9.8 15V9l5.2 3-5.2 3Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: org.tiktok,
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M19.3 7.2a5.6 5.6 0 0 1-3.4-1.2V15a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v2.9a3 3 0 1 0 2.1 2.8V2h2.8a5.6 5.6 0 0 0 3.4 4.3v2.9Z" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 50% 0%, rgba(47,111,224,0.35), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-brand-500/15 blur-[120px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-gold-500/10 blur-[120px]"
      />

      <Container className="relative py-14 sm:py-18 lg:py-20">
        {/* Top: Logo + tagline centered */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Logo tone="white" className="justify-center" />
          <p className="mt-5 text-[0.98rem] leading-relaxed text-white/75">
            Factoring, trucking insurance, authority setup and FMCSA compliance for owner-operators and fleets —
            everything a trucking company needs under one roof.
          </p>

          {/* Social icons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <span className="transition-colors" style={{ color: "inherit" }}>
                  {s.icon}
                </span>
              </a>
            ))}
          </div>

          {/* Quick contact */}
          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <a href={`tel:${org.salesPhone}`} className="text-[0.95rem] font-bold text-white hover:text-gold-400">
              Sales: {org.salesPhoneDisplay}
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
            <a href={`tel:${org.officePhone}`} className="text-[0.95rem] font-bold text-white hover:text-gold-400">
              Office: {org.officePhoneDisplay}
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
            <a href={`mailto:${org.email}`} className="text-[0.92rem] text-white/80 hover:text-gold-400">
              {org.email}
            </a>
          </div>
        </div>

        {/* Center nav columns */}
        <div className="mt-12 grid gap-10 text-center sm:grid-cols-3 sm:text-left">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col items-center sm:items-start">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold-400">{col.title}</h2>
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

        {/* Address centered */}
        <div className="mt-12 flex flex-col items-center text-center">
          <address className="not-italic">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold-400">Visit / mail us</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/85">
              {org.legalName}
              <br />
              {org.street}
              <br />
              {org.city}, {org.region} {org.postalCode}
            </p>
            <p className="mt-2 text-[0.88rem] text-white/65">{org.hoursDisplay}</p>
          </address>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-8">
          {trust.badges.slice(0, 8).map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-[0.78rem] font-semibold text-white/80"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Bottom bar centered */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-[0.8rem] text-white/60 sm:flex-row sm:justify-center sm:gap-6">
          <p className="text-center">
            © {year} {org.legalName}. All rights reserved.
          </p>
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
      </Container>
    </footer>
  );
}
