"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AccentKey, HeroVariant } from "@/lib/types";
import { useEntranceAnimation } from "@/components/EntranceSession";

/**
 * Per-page hero data. Each service page gets its own variant: its own label,
 * stamp, progress meter and key facts — the "page-specific banner" identity,
 * now shown as a compact spec card next to the full-bleed photograph instead of
 * a second image.
 */
type ArtConfig = {
  plateLabel: string;
  stamp: string;
  meterLabel: string;
  meter: number;
  rows: { k: string; v: string }[];
  accent: AccentKey;
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

const ACCENTS: Record<AccentKey, { dot: string; bar: string; stamp: string }> = {
  blue: { dot: "bg-brand-400", bar: "from-brand-400 to-brand-300", stamp: "bg-brand-500 text-white" },
  gold: { dot: "bg-gold-400", bar: "from-gold-400 to-gold-500", stamp: "bg-gold-400 text-navy-950" },
  teal: { dot: "bg-teal-400", bar: "from-teal-400 to-teal-500", stamp: "bg-teal-400 text-navy-950" },
};

/** Compact glass spec card — the per-page banner details, kept minimal. */
export function HeroSpecCard({ variant, className }: { variant: HeroVariant; className?: string }) {
  const cfg = HERO_ART[variant];
  const accent = ACCENTS[cfg.accent];
  const ref = useRef<HTMLDivElement | null>(null);
  const animateEntrance = useEntranceAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el || !animateEntrance) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.45, ease: "power3.out" });
      gsap.fromTo("[data-spec-row]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.6, stagger: 0.07 });
      gsap.fromTo(
        "[data-spec-meter]",
        { scaleX: 0 },
        { scaleX: cfg.meter, duration: 1.1, delay: 0.85, ease: "power2.inOut" },
      );
    }, el);

    return () => ctx.revert();
  }, [animateEntrance, cfg.meter]);

  return (
    <div ref={ref} className={`glass rounded-[1.15rem] p-5 sm:p-6 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/70">{cfg.plateLabel}</span>
        </span>
        <span className={`rounded-md px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${accent.stamp}`}>
          {cfg.stamp}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/60">{cfg.meterLabel}</p>
        <p className="font-display text-[0.9rem] font-bold text-white">{Math.round(cfg.meter * 100)}%</p>
      </div>
      <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-white/12">
        <span
          data-spec-meter
          className={`block h-full w-full origin-left rounded-full bg-gradient-to-r ${accent.bar}`}
          style={{ transform: `scaleX(${cfg.meter})` }}
        />
      </div>

      <dl className="mt-4 grid gap-2.5 border-t border-white/10 pt-4">
        {cfg.rows.map((r) => (
          <div data-spec-row key={r.k} className="flex items-center justify-between gap-3">
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/55">{r.k}</dt>
            <dd className="text-right text-[0.85rem] font-semibold text-white">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
