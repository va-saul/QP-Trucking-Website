import Link from "next/link";
import { org } from "@/content/site";

/**
 * The official QP Trucking Solutions mark, rebuilt as crisp SVG from the
 * delivered brand file: the outer ring, the shared Q/P stem with its flared
 * foot, the crossbar, and the two bows that form the Q and P.
 * Single-colour, exactly like the source logo (96×96 box).
 */
export function QPMark({ className, tone = "navy" }: { className?: string; tone?: "navy" | "white" | "gold" }) {
  const c = tone === "white" ? "#ffffff" : tone === "gold" ? "#f2b441" : "#1b4fa0";

  return (
    <svg viewBox="0 0 96 96" className={className} role="img" aria-label="QP Trucking Solutions">
      <g fill="none" stroke={c}>
        <circle cx="48" cy="48" r="40" strokeWidth="6.8" />
        <path d="M16 48a32 32 0 0 1 64 0" strokeWidth="7" />
        <path d="M12 48h72" strokeWidth="7" />
      </g>
      <path fill={c} d="M44.5 10.5h7v63.4l6.6 12.6H37.9l6.6-12.6z" />
    </svg>
  );
}

/** Horizontal lockup — the mark plus the two-line wordmark from the logo. */
export function Logo({
  tone = "navy",
  className,
}: {
  tone?: "navy" | "white";
  className?: string;
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
          Solutions
        </span>
      </span>
    </Link>
  );
}

/** Vertical lockup — mark above the stacked wordmark (intro, not-found…). */
export function LogoStacked({
  tone = "white",
  className,
  markClassName,
}: {
  tone?: "navy" | "white";
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`flex flex-col items-center text-center ${className ?? ""}`}>
      <QPMark tone={tone} className={markClassName ?? "h-16 w-16"} />
      <span
        className={`mt-3 font-display text-[1.6rem] font-extrabold tracking-tight sm:text-[1.9rem] ${
          tone === "white" ? "text-white" : "text-navy-900"
        }`}
      >
        QP Trucking
      </span>
      <span
        className={`font-display text-[1.05rem] font-semibold tracking-[0.08em] sm:text-[1.2rem] ${
          tone === "white" ? "text-brand-300" : "text-brand-500"
        }`}
      >
        Solutions
      </span>
    </span>
  );
}
