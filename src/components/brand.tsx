import Link from "next/link";
import Image from "next/image";
import { org } from "@/content/site";

/**
 * QP Trucking Solutions — official navy mark.
 * Replaces the older ring/cross monogram with the authentic split-circle
 * Q/P emblem matching the brand's navy final logo. The transparent PNG is
 * used for photographic/dark contexts; the SVG variant is kept for
 * crisp small-footprint rendering.
 */
export function QPMark({ className, tone = "navy" }: { className?: string; tone?: "navy" | "white" | "gold" }) {
  const color = tone === "white" ? "#ffffff" : tone === "gold" ? "#f2b441" : "#0d47a1";
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="QP Trucking Solutions">
      {/* Outer ring — split at top, bottom, and the vertical center */}
      {/* Top-left arc */}
      <path
        d="M50 6 A44 44 0 0 0 13.8 32"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="butt"
      />
      {/* Bottom-left arc */}
      <path
        d="M13.8 68 A44 44 0 0 0 50 94"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="butt"
      />
      {/* Top-right arc */}
      <path
        d="M50 6 A44 44 0 0 1 86.2 32"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="butt"
      />
      {/* Bottom-right arc */}
      <path
        d="M86.2 68 A44 44 0 0 1 50 94"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="butt"
      />

      {/* Inner Q (left half) — a C that opens to the right at the vertical split */}
      <path
        d="M50 22 A28 28 0 0 0 22 50 A28 28 0 0 0 50 78 L50 62 A16 16 0 0 1 34 50 A16 16 0 0 1 50 38 Z"
        fill={color}
      />

      {/* Inner P (right half) */}
      <path
        d="M50 22 V78 L50 62 H62 A16 16 0 0 0 62 38 H50 L50 22 Z"
        fill={color}
      />
      {/* P's bowl (the open counter on the right) is transparent — already shows through from inner arc gap */}

      {/* Vertical split line center */}
      <line x1="50" y1="6" x2="50" y2="94" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

export function Logo({
  tone = "navy",
  className,
}: {
  tone?: "navy" | "white";
  className?: string;
}) {
  const isDark = tone === "white";
  return (
    <Link
      href="/"
      aria-label={`${org.name} — home`}
      className={`group flex items-center gap-3 ${className ?? ""}`}
    >
      <QPMark tone={tone === "white" ? "white" : "navy"} className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.15rem] font-extrabold tracking-tight sm:text-[1.3rem] ${
            isDark ? "text-white" : "text-[#0d47a1]"
          }`}
        >
          QP Trucking
        </span>
        <span
          className={`font-display text-[0.82rem] font-semibold tracking-[0.04em] sm:text-[0.92rem] ${
            isDark ? "text-brand-300" : "text-[#0d47a1]/80"
          }`}
        >
          Solutions
        </span>
      </span>
    </Link>
  );
}

/** Full-color logo wordmark (transparent PNG) for hero/brand moments */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/brand/qp-logo-navy.png"
      alt="QP Trucking Solutions"
      width={420}
      height={480}
      className={className}
      priority
    />
  );
}
