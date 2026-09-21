import Link from "next/link";
import Image from "next/image";
import { org } from "@/content/site";

/**
 * THE LOGO — one file, used everywhere.
 *
 * `/Logo.png` is the original artwork from main branch (560×560: the navy field
 * with the QP ring/cross monogram — gold/blue segments). Restored per request;
 * header no longer uses the recreated simplified mark. Every logo surface now
 * renders this exact original file:
 *
 *   · header bar + mobile drawer        (<Logo /> / <QPMark />)
 *   · footer lockup                     (<BrandLockup />)
 *   · 404 page + trust marquee          (<QPMark />)
 *   · browser tab / favicon             src/app/icon.png  (+ favicon.ico) — copied from Logo.png
 *   · iOS home screen                   src/app/apple-icon.png — copied from Logo.png
 *   · web manifest (installed app)      src/app/manifest.ts
 *   · Organization schema (Rich Results) src/content/site.ts → org.logo
 *   · also available as /images/brand/qp-logo.png (mirrored copy for backwards-compat)
 */
export const LOGO_SRC = "/Logo.png";

/** Intrinsic size of the original Logo.png (560×560). */
export const LOGO_INTRINSIC = { w: 560, h: 560 } as const;

export const BRAND = { logo: LOGO_SRC } as const;
export const BRAND_RATIO = { logo: LOGO_INTRINSIC } as const;

/**
 * The mark alone. Decorative by default — every place it sits next to a real
 * heading or link already names the company, so it stays out of the a11y tree.
 */
export function QPMark({
  className,
  priority = false,
  alt = "",
}: {
  className?: string;
  /** kept for API compatibility — the supplied PNG is a single, fixed artwork */
  tone?: "navy" | "white";
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={LOGO_INTRINSIC.w}
      height={LOGO_INTRINSIC.h}
      priority={priority}
      className={className}
    />
  );
}

/**
 * Header logo: the supplied PNG next to the brand name set in the site's own
 * display type (the PNG contains the monogram only, so the name is live text —
 * never a second, hand-made logo image).
 */
export function Logo({
  tone = "navy",
  className,
  priority = false,
  size = "md",
}: {
  tone?: "navy" | "white";
  className?: string;
  priority?: boolean;
  /** md = header bar · lg = drawer / hero */
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "h-[50px] w-[50px] sm:h-[58px] sm:w-[58px]" : "h-[42px] w-[42px] sm:h-[46px] sm:w-[46px]";
  const isWhite = tone === "white";

  return (
    <Link href="/" aria-label={`${org.name} — home`} className={`group inline-flex shrink-0 items-center gap-2.5 ${className ?? ""}`}>
      <span data-brand-logo className={`relative block shrink-0 origin-left ${box}`}>
        <Image src={LOGO_SRC} alt="" priority={priority} fill sizes="58px" className="object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.02rem] font-extrabold tracking-tight sm:text-[1.12rem] ${
            isWhite ? "text-white" : "text-navy-900"
          }`}
        >
          QP Trucking
        </span>
        <span
          className={`mt-1 font-display text-[0.72rem] font-semibold tracking-[0.06em] sm:text-[0.78rem] ${
            isWhite ? "text-brand-300" : "text-brand-500"
          }`}
        >
          Solutions
        </span>
      </span>
    </Link>
  );
}

/** The same file as a standalone lockup — footer, hero cards, document headers. */
export function BrandLockup({
  tone,
  className,
  height = 96,
  priority = false,
}: {
  /** kept for API compatibility — the supplied PNG works on navy and on white */
  tone?: "navy" | "white";
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt={`${org.name} logo`}
      width={height}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
