"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Container, Btn, Chip } from "@/components/ui";
import { SplitHeading, Reveal, prefersReducedMotion } from "@/components/motion";
import { org, trust } from "@/content/site";

/**
 * Homepage banner — full-screen photographic hero with the truck running
 * across the bottom. Responsive from 320 px up to 4K: the hero image fills
 * the entire viewport, the overlay text stays readable, and nothing is
 * cropped or hidden behind browser chrome.
 */
export function HomeHero() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  // subtle parallax on the background image (desktop only)
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to(bg, { x, y, duration: 1.2, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(bg, { x: 0, y: 0, duration: 1.2, ease: "power2.out" });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <header className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[68px] sm:pt-[80px] lg:min-h-[100svh] lg:pt-[116px]">
      {/* Full-screen hero image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/images/hero/home.jpg"
          alt="QP Trucking Solutions fleet running interstate at golden hour"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
          style={{ objectPosition: "60% 40%" }}
        />
        {/* Clean gradient overlay (no stripe / blueprint texture) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/55 to-navy-950/90"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/40"
        />
        {/* Subtle vignette for depth */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 100%, rgba(4,18,42,0.6), transparent 60%)",
          }}
        />
      </div>

      {/* Decorative accents — soft, unobtrusive */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 z-[1] h-[440px] w-[440px] rounded-full bg-brand-400/20 blur-[120px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 z-[1] h-[360px] w-[360px] rounded-full bg-gold-500/15 blur-[120px]"
      />

      <Container className="relative z-10 flex flex-1 items-center justify-center py-8">
        <div className="mx-auto grid w-full max-w-4xl items-center gap-6 text-center">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Chip tone="gold">Pure Non-Recourse™ factoring</Chip>
              <Chip tone="dark">Insurance</Chip>
              <Chip tone="dark">Authority &amp; compliance</Chip>
            </div>

            <SplitHeading
              as="h1"
              immediate
              delay={0.12}
              text="Get started, grow quickly, and operate profitably — without incurring debt!"
              className="mx-auto font-display text-display-lg font-extrabold text-white max-w-[18ch] sm:max-w-[22ch]"
            />

            <Reveal delay={0.35}>
              <p className="mx-auto mt-4 max-w-[58ch] text-hero-body text-steel-100/90 sm:mt-5">
                QP Trucking Solutions turns your freight invoices into same-day cash, keeps your authority compliant,
                and places the insurance brokers demand — all from one family-owned team in Louisville, Kentucky.
              </p>
            </Reveal>

            <Reveal delay={0.5} className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:justify-center">
              <Btn href="/get-started" variant="primary" size="lg" withArrow className="w-full py-3.5 sm:w-auto sm:py-4">
                Become a QP client
              </Btn>
              <Btn href={`tel:${org.salesPhone}`} variant="outline" size="lg" className="w-full py-3.5 sm:w-auto sm:py-4">
                Call {org.salesPhoneDisplay}
              </Btn>
            </Reveal>

            {/* Single primary phone touchpoint */}
            <Reveal delay={0.6} className="mt-6 flex justify-center">
              <a
                href={`tel:${org.salesPhone}`}
                className="glass mx-auto flex w-full max-w-md items-center justify-between gap-3 rounded-[1rem] px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-gold-400">
                    Talk to a QP specialist today
                  </span>
                  <span className="mt-1 block font-display text-[1.15rem] font-bold text-white">
                    {org.salesPhoneDisplay}
                  </span>
                  <span className="mt-0.5 block text-[0.78rem] text-white/70">
                    Sales · Quotes · New authority setup
                  </span>
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-950">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M4.2 3.3h3l1.4 3.5-2 1.4a10.4 10.4 0 0 0 5.2 5.2l1.4-2 3.5 1.4v3c0 .8-.7 1.4-1.5 1.4A14.6 14.6 0 0 1 2.8 4.8c0-.8.6-1.5 1.4-1.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.75} className="mt-4 hidden sm:block">
              <p className="text-center text-[0.82rem] text-white/70">
                Not sure how to get started?{" "}
                <Link
                  href="/get-started"
                  className="font-semibold text-white underline decoration-gold-400/60 underline-offset-4 hover:decoration-gold-400"
                >
                  Have one of our experts contact you
                </Link>{" "}
                for a free consultation.
              </p>
            </Reveal>
          </div>

          {/* Inline at-a-glance stats (hidden on mobile, shown on desktop centered) */}
          <Reveal delay={0.45} className="mx-auto hidden w-full max-w-xl lg:block">
            <div className="glass grid grid-cols-3 gap-4 rounded-[1.4rem] p-5">
              {[
                { value: "~15 min", label: "Funded in" },
                { value: "24 hrs", label: "Setup" },
                { value: "Zero", label: "Long-term contract" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-[1.4rem] font-extrabold text-gold-400">{s.value}</p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Trust strip */}
      <div className="relative z-10 border-t border-white/10 bg-navy-950/55 backdrop-blur-sm">
        <Container>
          <dl className="grid grid-cols-2 gap-y-4 py-4 sm:grid-cols-4">
            {trust.stats.map((s, i) => (
              <div
                key={s.label}
                className={`min-w-0 ${i > 1 ? "hidden sm:block" : ""} ${
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""
                }`}
              >
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/60">{s.label}</dt>
                <dd className="mt-1 truncate font-display text-[1rem] font-bold text-white sm:text-[1.06rem]">
                  {s.value.toLocaleString()}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* GSAP-animated truck along the bottom */}
      <HeroTruckLane />
    </header>
  );
}

/**
 * GSAP-powered truck driving across the bottom of the hero.
 * Smoother than the CSS version because it uses GSAP's ticker, and it
 * pauses correctly for reduced-motion users.
 */
function HeroTruckLane() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const truck = el.querySelector("[data-hero-truck]");
      const lane = el.querySelector("[data-hero-lane]");
      if (!truck || !lane) return;

      gsap.set(truck, { xPercent: -110 });

      // infinite truck drive
      gsap.to(truck, {
        xPercent: 120,
        duration: 14,
        ease: "none",
        repeat: -1,
      });

      // lane markers scrolling
      gsap.to(lane, {
        backgroundPosition: "-120px 0",
        duration: 1.2,
        ease: "none",
        repeat: -1,
      });

      // wheel spin
      gsap.to(el.querySelectorAll("circle.wheel"), {
        rotation: 360,
        transformOrigin: "center",
        duration: 0.9,
        ease: "none",
        repeat: -1,
      });

      // gentle bob
      gsap.to(truck, {
        y: -2,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[64px] z-10 h-12 overflow-hidden sm:bottom-[76px]"
    >
      <div
        data-hero-lane
        className="absolute bottom-1 left-0 h-[3px] w-full opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #f2b441 0, #f2b441 40px, transparent 40px, transparent 80px)",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div data-hero-truck className="absolute bottom-0">
        <svg width="150" height="48" viewBox="0 0 150 48" fill="none" className="drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
          {/* Trailer */}
          <rect x="2" y="6" width="86" height="26" rx="2.5" fill="#eef3fa" />
          <rect x="2" y="6" width="86" height="26" rx="2.5" fill="url(#hero-truck-grad)" opacity="0.2" />
          <rect x="6" y="10" width="78" height="14" rx="1" fill="#061a38" opacity="0.12" />
          <text x="45" y="24" textAnchor="middle" fontFamily="Bitter, Georgia, serif" fontWeight="800" fontSize="10" fill="#061a38">
            QP TRUCKING
          </text>
          {/* Tractor */}
          <path d="M92 11h22l10 11v9H92V11Z" fill="#2f6fe0" />
          <rect x="116" y="16" width="18" height="13" rx="2" fill="#1b4fa0" />
          <path d="M134 20h10l4 7v4h-14V20Z" fill="#eef3fa" />
          <rect x="92" y="30" width="56" height="4" rx="2" fill="#123a72" />
          <rect x="92" y="28" width="56" height="2" fill="#f2b441" />
          {/* Exhaust */}
          <rect x="88" y="4" width="5" height="22" rx="1" fill="#4a5770" />
          {/* Wheels */}
          {[18, 68, 104, 134].map((cx) => (
            <g key={cx} className="wheel" style={{ transformOrigin: `${cx}px 37px` }}>
              <circle cx={cx} cy={37} r="5.5" fill="#04122a" />
              <circle cx={cx} cy={37} r="2.2" fill="#8a98ac" />
            </g>
          ))}
          <defs>
            <linearGradient id="hero-truck-grad" x1="0" y1="0" x2="88" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2f6fe0" />
              <stop offset="1" stopColor="#04122a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
