"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand";
import { navigation, org } from "@/content/site";
import { servicePath } from "@/content/services";
import { servicesBySlug } from "@/content/services";

const FEATURED = ["pure-non-recourse", "insurance", "new-authority"].map((s) => servicesBySlug[s]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    setHovered(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <>
      {/* utility strip */}
      <div className="fixed inset-x-0 top-0 z-[55] hidden h-9 items-center border-b border-white/10 bg-navy-950/85 text-white backdrop-blur-sm lg:flex">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-7 text-[0.76rem]">
          <p className="flex items-center gap-2 text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Family-owned in Louisville, KY · {org.hoursDisplay}
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${org.officePhone}`} className="text-white/80 hover:text-white">
              Office / accounting: <span className="font-semibold text-white">{org.officePhoneDisplay}</span>
            </a>
            <Link href="/faq" className="text-white/80 hover:text-white">
              FAQ
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-50 transition-all duration-300 lg:top-9 ${
          solid
            ? "top-0 border-b border-navy-900/10 bg-white/95 shadow-[0_10px_30px_-24px_rgba(4,18,42,.6)] backdrop-blur-md"
            : "top-0 border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-7 sm:py-3.5 lg:px-8">
          <Logo tone={solid ? "navy" : "white"} />

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => {
              const active = hovered === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9rem] font-semibold transition-colors ${
                      solid ? "text-navy-800 hover:text-brand-500" : "text-white/90 hover:text-white"
                    }`}
                    aria-expanded={item.children ? active : undefined}
                  >
                    {item.label}
                    {item.children ? (
                      <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform ${active ? "rotate-180" : ""}`} aria-hidden="true">
                        <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    ) : null}
                  </Link>

                  {item.children && active ? (
                    <div className="absolute left-1/2 top-full z-50 w-[min(680px,88vw)] -translate-x-1/2 pt-3">
                      <div className="overflow-hidden rounded-[1.1rem] border border-steel-200 bg-white p-3 shadow-[0_40px_80px_-40px_rgba(4,18,42,.55)]">
                        <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr]">
                          <ul className="grid gap-0.5">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="group flex flex-col rounded-[0.8rem] px-3.5 py-2.5 transition-colors hover:bg-steel-50"
                                >
                                  <span className="font-display text-[0.95rem] font-bold text-navy-900 group-hover:text-brand-500">
                                    {child.label}
                                  </span>
                                  {child.blurb ? (
                                    <span className="mt-0.5 text-[0.8rem] leading-snug text-steel-600">{child.blurb}</span>
                                  ) : null}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="relative overflow-hidden rounded-[0.9rem] bg-navy-900 p-4 text-white">
                            <p className="relative font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-400">
                              Client favourite
                            </p>
                            <p className="relative mt-2 font-display text-[1.05rem] font-bold leading-snug">
                              Pure Non-Recourse™ — never buy back a load again.
                            </p>
                            <Link
                              href="/factoring/pure-non-recourse"
                              className="relative mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-gold-400 hover:underline"
                            >
                              See how it works
                              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
                                <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* desktop CTAs */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={`tel:${org.salesPhone}`}
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.88rem] font-bold transition-colors ${
                solid ? "text-navy-900 hover:text-brand-500" : "text-white hover:text-gold-400"
              }`}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M4.2 3.3h3l1.4 3.5-2 1.4a10.4 10.4 0 0 0 5.2 5.2l1.4-2 3.5 1.4v3c0 .8-.7 1.4-1.5 1.4A14.6 14.6 0 0 1 2.8 4.8c0-.8.6-1.5 1.4-1.5Z"
                  fill="currentColor"
                />
              </svg>
              {org.salesPhoneDisplay}
            </a>
            <Link href="/get-started" className="btn btn-primary px-5 py-3 text-[0.9rem]">
              Get started
            </Link>
          </div>

          {/* mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${org.salesPhone}`}
              aria-label={`Call ${org.salesPhoneDisplay}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                solid ? "border-navy-900/15 text-navy-900" : "border-white/30 text-white"
              }`}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M4.2 3.3h3l1.4 3.5-2 1.4a10.4 10.4 0 0 0 5.2 5.2l1.4-2 3.5 1.4v3c0 .8-.7 1.4-1.5 1.4A14.6 14.6 0 0 1 2.8 4.8c0-.8.6-1.5 1.4-1.5Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                solid ? "border-navy-900/15 text-navy-900" : "border-white/30 text-white"
              }`}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[2px] w-4 bg-current transition-all duration-300 ${mobileOpen ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[2px] w-4 bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-4 bg-current transition-all duration-300 ${mobileOpen ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-navy-950 pb-28 pt-[86px] text-white transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="relative px-5">
          <ul className="divide-y divide-white/10">
            {navigation.map((item) => {
              const open = openGroup === item.label;
              return (
                <li key={item.label} className="py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex-1 py-3.5 font-display text-[1.15rem] font-bold text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} links`}
                        aria-expanded={open}
                        onClick={() => setOpenGroup(open ? null : item.label)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
                      >
                        <span className={`inline-block transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
                      </button>
                    ) : null}
                  </div>
                  {item.children && open ? (
                    <ul className="mb-3 grid gap-1 rounded-[1rem] bg-white/[0.06] p-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-[0.75rem] px-3.5 py-2.5"
                          >
                            <span className="block text-[0.95rem] font-bold text-white">{child.label}</span>
                            {child.blurb ? (
                              <span className="mt-0.5 block text-[0.78rem] leading-snug text-white/60">{child.blurb}</span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* featured services on mobile */}
          <div className="mt-6 grid gap-3">
            {FEATURED.map((s) => (
              <Link
                key={s.slug}
                href={servicePath(s)}
                onClick={() => setMobileOpen(false)}
                className="glass flex items-center justify-between rounded-[1rem] p-4"
              >
                <span>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-400">
                    {s.category}
                  </span>
                  <span className="mt-1 block font-display text-[1rem] font-bold text-white">{s.short}</span>
                </span>
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/70" aria-hidden="true">
                  <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-7 grid gap-3">
            <Link href="/get-started" onClick={() => setMobileOpen(false)} className="btn btn-primary py-4">
              Become a QP client
            </Link>
            <a href={`tel:${org.salesPhone}`} className="btn btn-outline py-4">
              Call {org.salesPhoneDisplay}
            </a>
            <a href={`tel:${org.officePhone}`} className="btn btn-outline py-4">
              Office / accounting: {org.officePhoneDisplay}
            </a>
          </div>

          <p className="mt-6 text-center text-[0.8rem] text-white/60">
            {org.street} · {org.city}, {org.region} {org.postalCode}
            <br />
            {org.hoursDisplay}
          </p>
        </nav>
      </div>
    </>
  );
}
