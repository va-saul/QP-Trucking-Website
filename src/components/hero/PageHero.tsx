"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container, Btn, Breadcrumbs, Chip } from "@/components/ui";
import { SplitHeading, prefersReducedMotion } from "@/components/motion";
import { org } from "@/content/site";
import type { AccentKey, HeroVariant } from "@/lib/types";

/**
 * Interior page hero — full-screen photographic banner, identical on
 * desktop and mobile: same image, same framing, same gradient treatment,
 * with page title, breadcrumbs and CTAs laid out over the photo.
 */
export function PageHero({
  eyebrow,
  title,
  tagline,
  image,
  imageAlt,
  variant: _variant,
  accent = "blue",
  trail,
  chips = [],
  stats = [],
  primaryHref,
  primaryLabel = "Apply now",
  secondaryHref,
  secondaryLabel,
  priority = false,
  children,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  variant: HeroVariant;
  accent?: AccentKey;
  trail: { label: string; href?: string }[];
  chips?: string[];
  stats?: { label: string; value: string }[];
  primaryHref: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  const accentDot: Record<AccentKey, string> = {
    blue: "bg-brand-300",
    gold: "bg-gold-400",
    teal: "bg-teal-400",
  };

  const bgRef = useRef<HTMLDivElement | null>(null);

  // subtle parallax on the background (desktop only, respects reduced motion)
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
      {/* Full-screen hero image (same on all screen sizes) */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="h-full w-full object-cover"
          style={{ objectPosition: "55% 40%" }}
        />
        {/* Clean gradient overlay (no stripe/blueprint noise) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/50 to-navy-950/90"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-navy-950/30 to-navy-950/40"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 100%, rgba(4,18,42,0.6), transparent 60%)",
          }}
        />
      </div>

      {/* Soft color glows */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 z-[1] h-[420px] w-[420px] rounded-full bg-brand-400/20 blur-[110px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-[-10%] z-[1] h-[380px] w-[380px] rounded-full bg-gold-500/15 blur-[120px]"
      />

      <Container className="relative z-10 flex flex-1 items-center justify-center py-8">
        <div className="mx-auto grid w-full max-w-4xl items-center gap-6 text-center">
          {/* Copy */}
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Breadcrumbs trail={trail} />
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Chip tone="gold">{eyebrow}</Chip>
              {chips.slice(0, 3).map((c) => (
                <Chip key={c} tone="dark">
                  {c}
                </Chip>
              ))}
            </div>

            <SplitHeading
              as="h1"
              text={title}
              immediate
              delay={0.15}
              className="mx-auto font-display text-display-lg font-extrabold text-white max-w-[20ch] sm:max-w-[24ch]"
            />

            <p className="mx-auto mt-4 max-w-[58ch] text-hero-body text-steel-100/90 sm:mt-5">{tagline}</p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:justify-center">
              <Btn href={primaryHref} variant="primary" size="lg" withArrow className="w-full py-3.5 sm:w-auto sm:py-4">
                {primaryLabel}
              </Btn>
              <Btn
                href={secondaryHref ?? `tel:${org.salesPhone}`}
                variant="outline"
                size="lg"
                className="w-full py-3.5 sm:w-auto sm:py-4"
              >
                {secondaryLabel ?? `Call ${org.salesPhoneDisplay}`}
              </Btn>
            </div>

            <ul className="mt-6 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.8rem] text-white/75 sm:mt-7 sm:flex">
              {[
                { icon: "shield", text: "No long-term contract" },
                { icon: "bolt", text: "Setup in under 24 hours" },
                { icon: "pin", text: `Louisville, KY · serving 48 states` },
              ].map((t) => (
                <li key={t.text} className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${accentDot[accent]}`} />
                  {t.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats strip */}
          {stats.length > 0 && (
            <div className="mx-auto hidden w-full max-w-2xl lg:block">
              <div className="glass grid grid-cols-4 gap-2 rounded-[1.4rem] p-5">
                {stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-[1.2rem] font-extrabold text-gold-400">{s.value}</p>
                    <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/65">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Stat rail (mobile shows 2, desktop shows 4) */}
      {stats.length > 0 && (
        <div className="relative z-10 border-t border-white/10 bg-navy-950/55 backdrop-blur-sm">
          <Container>
            <dl className="grid grid-cols-2 gap-y-4 py-4 sm:grid-cols-4">
              {stats.slice(0, 4).map((s, i) => (
                <div
                  key={s.label}
                  className={`min-w-0 ${i > 1 ? "hidden sm:block" : ""} ${
                    i > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""
                  }`}
                >
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/60">{s.label}</dt>
                  <dd className="mt-1 truncate font-display text-[1rem] font-bold text-white sm:text-[1.08rem]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      )}

      <HeroTruckLane />
      {children}
    </header>
  );
}

/** GSAP-powered truck along the bottom of every interior hero */
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
      gsap.to(truck, { xPercent: 120, duration: 16, ease: "none", repeat: -1 });
      gsap.to(lane, {
        backgroundPosition: "-120px 0",
        duration: 1.3,
        ease: "none",
        repeat: -1,
      });
      gsap.to(el.querySelectorAll("circle.wheel"), {
        rotation: 360,
        transformOrigin: "center",
        duration: 0.9,
        ease: "none",
        repeat: -1,
      });
      gsap.to(truck, { y: -2, duration: 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
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
          <rect x="2" y="6" width="86" height="26" rx="2.5" fill="#eef3fa" />
          <rect x="2" y="6" width="86" height="26" rx="2.5" fill="url(#ip-hero-truck-grad)" opacity="0.2" />
          <rect x="6" y="10" width="78" height="14" rx="1" fill="#061a38" opacity="0.12" />
          <text x="45" y="24" textAnchor="middle" fontFamily="Bitter, Georgia, serif" fontWeight="800" fontSize="10" fill="#061a38">
            QP TRUCKING
          </text>
          <path d="M92 11h22l10 11v9H92V11Z" fill="#2f6fe0" />
          <rect x="116" y="16" width="18" height="13" rx="2" fill="#1b4fa0" />
          <path d="M134 20h10l4 7v4h-14V20Z" fill="#eef3fa" />
          <rect x="92" y="30" width="56" height="4" rx="2" fill="#123a72" />
          <rect x="92" y="28" width="56" height="2" fill="#f2b441" />
          <rect x="88" y="4" width="5" height="22" rx="1" fill="#4a5770" />
          {[18, 68, 104, 134].map((cx) => (
            <g key={cx} className="wheel" style={{ transformOrigin: `${cx}px 37px` }}>
              <circle cx={cx} cy={37} r="5.5" fill="#04122a" />
              <circle cx={cx} cy={37} r="2.2" fill="#8a98ac" />
            </g>
          ))}
          <defs>
            <linearGradient id="ip-hero-truck-grad" x1="0" y1="0" x2="88" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2f6fe0" />
              <stop offset="1" stopColor="#04122a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
