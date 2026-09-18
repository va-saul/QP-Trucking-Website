import Link from "next/link";
import { org } from "@/content/site";

/** QP monogram — the ring + cross mark rebuilt as crisp, brand-matched SVG. */
export function QPMark({ className, tone = "navy" }: { className?: string; tone?: "navy" | "white" | "gold" }) {
  const ring = tone === "white" ? "#ffffff" : tone === "gold" ? "#f2b441" : "#1b4fa0";
  const inner = tone === "white" ? "rgba(255,255,255,.72)" : tone === "gold" ? "rgba(255,255,255,.65)" : "#2f6fe0";

  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="QP Trucking Solutions">
      <circle cx="24" cy="24" r="21.5" fill="none" stroke={ring} strokeWidth="4.5" />
      <path d="M24 3.5v41" stroke={ring} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M24 24h-20.5" stroke={ring} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M24 24h20.5" stroke={ring} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M10.5 24a13.5 13.5 0 0 1 13.5-13.5V24H10.5Z" fill={inner} opacity="0.55" />
      <path d="M37.5 24A13.5 13.5 0 0 1 24 37.5V24h13.5Z" fill={inner} opacity="0.28" />
    </svg>
  );
}

export function Logo({
  tone = "navy",
  className,
  compact = false,
}: {
  tone?: "navy" | "white";
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${org.name} — home`}
      className={`group flex items-center gap-2.5 ${className ?? ""}`}
    >
      <QPMark tone={tone === "white" ? "white" : "navy"} className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.05rem] font-extrabold tracking-tight sm:text-[1.15rem] ${
            tone === "white" ? "text-white" : "text-navy-900"
          }`}
        >
          QP Trucking
        </span>
        <span
          className={`font-display text-[0.72rem] font-semibold tracking-[0.06em] sm:text-[0.78rem] ${
            tone === "white" ? "text-brand-300" : "text-brand-500"
          }`}
        >
          {compact ? "Solutions" : "Solutions"}
        </span>
      </span>
    </Link>
  );
}
