"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo, QPMark } from "@/components/brand";
import { navigation, org } from "@/content/site";
import { servicePath, servicesBySlug } from "@/content/services";
import { prefersReducedMotion } from "@/components/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FEATURED = ["pure-non-recourse", "insurance", "new-authority"].map((s) => servicesBySlug[s]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const barRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const pillX = useRef<((v: number) => void) | null>(null);
  const pillW = useRef<((v: number) => void) | null>(null);

  /* ---------------- scroll state ---------------- */
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

  /* ---------------- GSAP: nav underline + entrance ---------------- */
  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill || prefersReducedMotion()) return;

    pillX.current = gsap.quickTo(pill, "x", { duration: 0.45, ease: "power3.out" });
    pillW.current = gsap.quickTo(pill, "width", { duration: 0.45, ease: "power3.out" });

    const links = Array.from(nav.querySelectorAll<HTMLElement>("[data-nav-link]"));
    const ctx = gsap.context(() => {
      // entrance: the header assembles itself on first paint
      gsap.fromTo(
        "[data-header-item]",
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.055, ease: "power3.out", delay: 0.1 },
      );
      gsap.fromTo(pill, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.5 });
    }, nav);

    const move = (el: HTMLElement) => {
      const navRect = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      pillX.current?.(r.left - navRect.left);
      pillW.current?.(r.width);
    };

    const onEnter = (e: Event) => move(e.currentTarget as HTMLElement);
    links.forEach((l) => l.addEventListener("pointerenter", onEnter));

    return () => {
      links.forEach((l) => l.removeEventListener("pointerenter", onEnter));
      ctx.revert();
    };
  }, []);

  /* ---------------- GSAP: smooth scroll shrink ---------------- */
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const trigger = {
        start: 60,
        end: 140,
        toggleActions: "play none none reverse",
        trigger: document.body,
      };
      // the bar tightens and the brand mark eases down a notch — one gesture
      gsap.to(shell, { paddingTop: 6, paddingBottom: 6, duration: 0.35, ease: "power2.out", scrollTrigger: trigger });
      gsap.to("[data-brand-logo]", {
        scale: 0.9,
        duration: 0.35,
        ease: "power2.out",
        scrollTrigger: trigger,
      });
    }, shell);
    return () => ctx.revert();
  }, []);

  const solid = scrolled || mobileOpen;

  return (
    <>
      {/* utility strip — desktop only */}
      <div className="fixed inset-x-0 top-0 z-[55] hidden h-10 items-center bg-navy-950/90 text-white backdrop-blur-sm lg:flex">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 text-[0.78rem] lg:px-8 xl:px-10">
          <p className="flex items-center gap-2 text-white/70">
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            Family-owned in Louisville, KY · {org.hoursDisplay}
          </p>
          <div className="flex items-center gap-5 xl:gap-7">
            <a
              href={`tel:${org.salesPhone}`}
              className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold-400" aria-hidden="true">
                <path
                  d="M4.2 3.3h3l1.4 3.5-2 1.4a10.4 10.4 0 0 0 5.2 5.2l1.4-2 3.5 1.4v3c0 .8-.7 1.4-1.5 1.4A14.6 14.6 0 0 1 2.8 4.8c0-.8.6-1.5 1.4-1.5Z"
                  fill="currentColor"
                />
              </svg>
              Sales <span className="font-bold text-gold-400">{org.salesPhoneDisplay}</span>
            </a>
            <a href={`tel:${org.officePhone}`} className="text-white/70 transition-colors hover:text-white">
              Office / accounting <span className="font-semibold text-white">{org.officePhoneDisplay}</span>
            </a>
            <Link href="/faq" className="text-white/70 transition-colors hover:text-white">
              FAQ
            </Link>
            <Link href="/contact" className="text-white/70 transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 lg:top-10 ${
          solid
            ? "border-b border-navy-900/8 bg-white/92 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          ref={shellRef}
          className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-8 xl:px-10"
        >
          <div data-header-item>
            <Logo tone={solid ? "navy" : "white"} priority />
          </div>

          {/* desktop nav with GSAP-driven hover indicator */}
          <nav ref={navRef} aria-label="Primary" className="relative hidden items-center lg:flex">
            <span
              ref={pillRef}
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 top-1/2 h-9 -translate-y-1/2 rounded-full ${
                solid ? "bg-navy-900/6" : "bg-white/12"
              }`}
              style={{ width: 0, opacity: 0 }}
            />
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  data-header-item
                  data-nav-link
                  href={item.href}
                  className={`relative z-10 flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2.5 text-[0.95rem] font-semibold transition-colors xl:px-3 2xl:px-3.5 2xl:text-[0.98rem] ${
                    solid ? "text-navy-800 hover:text-brand-500" : "text-white/90 hover:text-white"
                  }`}
                  aria-expanded={item.children ? hovered === item.label : undefined}
                >
                  {item.label}
                  {item.children ? (
                    <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform ${hovered === item.label ? "rotate-180" : ""}`} aria-hidden="true">
                      <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  ) : null}
                </Link>

                {item.children && hovered === item.label ? (
                  <div className="absolute left-1/2 top-full z-50 w-[min(640px,86vw)] -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-[1rem] border border-steel-200 bg-white p-2 shadow-[0_30px_70px_-40px_rgba(4,18,42,.5)]">
                      <ul className="grid">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="group flex flex-col rounded-[0.7rem] px-3.5 py-2.5 transition-colors hover:bg-steel-50"
                            >
                              <span className="font-display text-[0.94rem] font-bold text-navy-900 group-hover:text-brand-500">
                                {child.label}
                              </span>
                              {child.blurb ? (
                                <span className="mt-0.5 text-[0.79rem] leading-snug text-steel-600">{child.blurb}</span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              data-header-item
              href={`tel:${org.salesPhone}`}
              // clear phone button — the sales line yields to the nav until
              // there is real room (xl), and always appears in the utility bar
              className={`hidden items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[0.9rem] font-bold transition-colors xl:flex ${
                solid
                  ? "border-navy-900/15 text-navy-900 hover:border-brand-400 hover:text-brand-500"
                  : "border-white/35 text-white hover:border-gold-400 hover:text-gold-400"
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
            <Link data-header-item href="/get-started" className="btn btn-primary px-6 py-3.5 text-[0.95rem]">
              Get started
            </Link>
          </div>

          {/* mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${org.salesPhone}`}
              aria-label={`Call ${org.salesPhoneDisplay}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                solid ? "border-navy-900/12 text-navy-900" : "border-white/30 text-white"
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
                solid ? "border-navy-900/12 text-navy-900" : "border-white/30 text-white"
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
        <span aria-hidden="true" className="stripe-band pointer-events-none absolute inset-0 opacity-25" />
        <nav aria-label="Mobile" className="relative px-5">
          <ul className="divide-y divide-white/10">
            {navigation.map((item) => {
              const open = openGroup === item.label;
              return (
                <li key={item.label} className="py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex-1 py-3.5 font-display text-[1.12rem] font-bold text-white"
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
                    <ul className="mb-3 grid gap-1 rounded-[0.9rem] bg-white/[0.05] p-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-[0.7rem] px-3.5 py-2.5"
                          >
                            <span className="block text-[0.94rem] font-bold text-white">{child.label}</span>
                            {child.blurb ? (
                              <span className="mt-0.5 block text-[0.77rem] leading-snug text-white/55">{child.blurb}</span>
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

          <div className="mt-6 grid gap-3">
            {FEATURED.map((s) => (
              <Link
                key={s.slug}
                href={servicePath(s)}
                onClick={() => setMobileOpen(false)}
                className="glass flex items-center justify-between rounded-[0.9rem] p-4"
              >
                <span className="flex items-center gap-3">
                  <QPMark tone="white" className="h-5 w-auto opacity-80" />
                  <span>
                    <span className="block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-gold-400">
                      {s.category}
                    </span>
                    <span className="mt-0.5 block font-display text-[0.98rem] font-bold text-white">{s.short}</span>
                  </span>
                </span>
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/60" aria-hidden="true">
                  <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

          <p className="mt-6 text-center text-[0.78rem] text-white/50">
            {org.street} · {org.city}, {org.region} {org.postalCode}
            <br />
            {org.hoursDisplay}
          </p>
        </nav>
      </div>
    </>
  );
}
