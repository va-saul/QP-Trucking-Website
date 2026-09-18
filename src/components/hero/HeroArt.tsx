"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { AccentKey, HeroVariant } from "@/lib/types";
import { prefersReducedMotion } from "@/components/motion";

/**
 * Per-page hero artwork.
 * Every page gets its own banner composition: a photographic plate (distinct
 * image per service), a status card with that service's own data, an accent
 * treatment and an animated progress/draw sequence — so no two heroes repeat.
 */

type ArtConfig = {
  /** Small mono label pinned to the top-left of the plate. */
  plateLabel: string;
  /** Stamp / ribbon text rendered on the glass card. */
  stamp: string;
  /** Row label rendered above the meter. */
  meterLabel: string;
  /** Meter fill (0–1). */
  meter: number;
  /** Key/value rows on the glass card. */
  rows: { k: string; v: string }[];
  accent: AccentKey;
};

const ACCENTS: Record<AccentKey, { dot: string; bar: string; stamp: string; ring: string }> = {
  blue: {
    dot: "bg-brand-400",
    bar: "from-brand-400 to-brand-300",
    stamp: "text-white bg-brand-500",
    ring: "ring-brand-300/40",
  },
  gold: {
    dot: "bg-gold-400",
    bar: "from-gold-400 to-gold-500",
    stamp: "text-navy-950 bg-gold-400",
    ring: "ring-gold-400/40",
  },
  teal: {
    dot: "bg-teal-400",
    bar: "from-teal-400 to-teal-500",
    stamp: "text-navy-950 bg-teal-400",
    ring: "ring-teal-400/40",
  },
};

export const HERO_ART: Record<HeroVariant, ArtConfig> = {
  invoice: {
    plateLabel: "Rate confirmation → cash",
    stamp: "FUNDED",
    meterLabel: "Advance issued",
    meter: 0.92,
    rows: [
      { k: "Load", v: "LTL · 1,240 mi" },
      { k: "Broker", v: "Credit approved" },
      { k: "Paid in", v: "~15 minutes" },
    ],
    accent: "blue",
  },
  shield: {
    plateLabel: "Pure Non-Recourse™",
    stamp: "ZERO RISK",
    meterLabel: "Chargeback exposure",
    meter: 0,
    rows: [
      { k: "Chargebacks", v: "None, ever" },
      { k: "Window", v: "No 60/90-day cap" },
      { k: "Contract", v: "Month to month" },
    ],
    accent: "gold",
  },
  paperwork: {
    plateLabel: "Filed with the FMCSA",
    stamp: "FILED",
    meterLabel: "Compliance status",
    meter: 0.86,
    rows: [
      { k: "Processing", v: "1 business day" },
      { k: "Coverage", v: "All 50 states" },
      { k: "Client rate", v: "$40 with code" },
    ],
    accent: "blue",
  },
  sunrise: {
    plateLabel: "Authority launch checklist",
    stamp: "MC ACTIVE",
    meterLabel: "Setup progress",
    meter: 0.95,
    rows: [
      { k: "USDOT + MC", v: "Filed & linked" },
      { k: "Insurance", v: "Filed to FMCSA" },
      { k: "Next step", v: "First load" },
    ],
    accent: "gold",
  },
  fuel: {
    plateLabel: "Quarterly fuel tax",
    stamp: "ON TIME",
    meterLabel: "Return prepared",
    meter: 0.78,
    rows: [
      { k: "Period", v: "Q3 · all states" },
      { k: "Filing fee", v: "$60 · $40 client" },
      { k: "Deadline", v: "Tracked for you" },
    ],
    accent: "gold",
  },
  plate: {
    plateLabel: "Apportioned registration",
    stamp: "PLATED",
    meterLabel: "Jurisdiction coverage",
    meter: 0.88,
    rows: [
      { k: "Plate type", v: "IRP apportioned" },
      { k: "Cab card", v: "Per power unit" },
      { k: "Service fee", v: "$195" },
    ],
    accent: "blue",
  },
  safety: {
    plateLabel: "FMCSA testing program",
    stamp: "COMPLIANT",
    meterLabel: "Program readiness",
    meter: 0.9,
    rows: [
      { k: "Random pool", v: "Managed" },
      { k: "Clearinghouse", v: "Queries handled" },
      { k: "Enrollment", v: "$135 · $100 client" },
    ],
    accent: "gold",
  },
  binder: {
    plateLabel: "Inspection ready",
    stamp: "AUDIT READY",
    meterLabel: "Documents in place",
    meter: 0.83,
    rows: [
      { k: "Sections", v: "Tabbed & indexed" },
      { k: "Format", v: "PDF · Printed" },
      { k: "Price", v: "$99 · $139" },
    ],
    accent: "blue",
  },
  tech: {
    plateLabel: "ELD & dashcam program",
    stamp: "MEMBER PRICE",
    meterLabel: "Insurer credits applied",
    meter: 0.7,
    rows: [
      { k: "Devices", v: "FMCSA registered" },
      { k: "Contract", v: "Reviewed for you" },
      { k: "Savings", v: "Quoted by fleet" },
    ],
    accent: "teal",
  },
  counter: {
    plateLabel: "Intermodal & government",
    stamp: "SCAC ACTIVE",
    meterLabel: "Freight access unlocked",
    meter: 0.8,
    rows: [
      { k: "Issuer", v: "NMFTA registered" },
      { k: "Format", v: "2–4 letters" },
      { k: "Client rate", v: "$40 with code" },
    ],
    accent: "gold",
  },
  support: {
    plateLabel: "Louisville, KY · Mon–Fri",
    stamp: "8AM–8PM EST",
    meterLabel: "Average answer time",
    meter: 0.94,
    rows: [
      { k: "Sales", v: "833-762-3464" },
      { k: "Accounting", v: "502-398-6333" },
      { k: "Email", v: "info@qpfactoring.com" },
    ],
    accent: "blue",
  },
  team: {
    plateLabel: "Everything under one roof",
    stamp: "SINCE DAY ONE",
    meterLabel: "Carriers supported",
    meter: 0.9,
    rows: [
      { k: "Factoring", v: "In-house" },
      { k: "Insurance", v: "Licensed agency" },
      { k: "Compliance", v: "Full-service" },
    ],
    accent: "teal",
  },
  highway: {
    plateLabel: "Funding pipeline",
    stamp: "CASH FLOW",
    meterLabel: "Invoices cleared today",
    meter: 0.87,
    rows: [
      { k: "Advances", v: "Same business day" },
      { k: "Cost", v: "Flat, disclosed fee" },
      { k: "Contract", v: "None" },
    ],
    accent: "blue",
  },
};

export function HeroArt({
  variant,
  image,
  alt,
  priority = false,
  stats,
}: {
  variant: HeroVariant;
  image: string;
  alt: string;
  priority?: boolean;
  stats?: { label: string; value: string }[];
}) {
  const cfg = HERO_ART[variant];
  const accent = ACCENTS[cfg.accent];
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.25 });
      tl.fromTo(
        "[data-art-plate]",
        { opacity: 0, y: 26, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
      )
        .fromTo("[data-art-card]", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.85 }, "-=0.55")
        .fromTo("[data-art-row]", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
        .fromTo("[data-art-stamp]", { opacity: 0, scale: 0.7, rotate: -12 }, { opacity: 1, scale: 1, rotate: -8, duration: 0.6, ease: "back.out(2)" }, "-=0.3")
        .fromTo("[data-art-meter]", { scaleX: 0 }, { scaleX: cfg.meter, duration: 1.1, ease: "power2.inOut" }, "-=0.5");
    }, el);

    return () => ctx.revert();
  }, [cfg.meter]);

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* photographic plate — its own banner image on every page */}
      <div
        data-art-plate
        className="relative overflow-hidden rounded-[1.4rem] border border-white/12 bg-navy-800 shadow-[0_40px_90px_-45px_rgba(0,0,0,.8)]"
      >
        <div className="relative h-[168px] w-full sm:h-auto sm:aspect-[16/9] lg:aspect-[4/3]">
          <Image
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 560px"
            className="object-cover object-center"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/35 to-navy-950/10" />
          <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-40" />
          <span aria-hidden="true" className="blueprint absolute inset-0 opacity-60" />
        </div>

        {/* pinned plate label */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-navy-950/70 px-3 py-1.5 backdrop-blur-sm sm:left-4 sm:top-4">
          <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/85 sm:text-[0.66rem]">
            {cfg.plateLabel}
          </span>
        </div>

        {/* rubber stamp */}
        <span
          data-art-stamp
          className={`absolute right-3 top-3 inline-flex rotate-[-8deg] items-center rounded-md px-2.5 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] shadow-lg sm:right-4 sm:top-4 sm:text-[0.66rem] ${accent.stamp}`}
        >
          {cfg.stamp}
        </span>
      </div>

      {/* glass data card */}
      <div
        data-art-card
        className={`glass relative z-10 mx-3 -mt-8 rounded-[1.1rem] p-3.5 ring-1 sm:mx-5 sm:-mt-14 sm:p-5 ${accent.ring}`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/70">{cfg.meterLabel}</p>
          <p className="font-display text-[0.95rem] font-bold text-white">{Math.round(cfg.meter * 100)}%</p>
        </div>
        <div className="mt-2 h-[6px] w-full overflow-hidden rounded-full bg-white/12">
          <span
            data-art-meter
            className={`block h-full w-full origin-left rounded-full bg-gradient-to-r ${accent.bar}`}
          />
        </div>

        <dl className="mt-4 grid gap-2.5">
          {cfg.rows.map((r, i) => (
            <div
              data-art-row
              key={r.k}
              className={`items-center justify-between gap-3 border-t border-white/10 pt-2.5 ${
                i > 1 ? "hidden sm:flex" : "flex"
              }`}
            >
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-white/60">{r.k}</dt>
              <dd className="text-right text-[0.85rem] font-semibold text-white">{r.v}</dd>
            </div>
          ))}
        </dl>

        {stats?.length ? (
          <div className="mt-4 hidden grid-cols-3 gap-2 border-t border-white/10 pt-3 sm:grid">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="min-w-0">
                <p className="truncate font-display text-[0.9rem] font-bold text-gold-400">{s.value}</p>
                <p className="truncate font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
