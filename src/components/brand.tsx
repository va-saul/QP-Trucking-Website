import Link from "next/link";
import Image from "next/image";
import { org } from "@/content/site";
import { LOGO_SRC, LOGO_INTRINSIC } from "@/content/brand";

export { LOGO_SRC, LOGO_INTRINSIC } from "@/content/brand";
export const BRAND = { logo: LOGO_SRC } as const;
export const BRAND_RATIO = { logo: LOGO_INTRINSIC } as const;

/**
 * Render the original Logo.png, unchanged. No replacement symbol, recoloring,
 * generated wordmark, image filter or opaque canvas. Preserve the original
 * transparency so the surrounding site background shows through.
 * `unoptimized` serves the actual PNG bytes rather than a re-encoded variant.
 */
export function QPMark({
  className,
  priority = false,
  alt = "",
}: {
  className?: string;
  /** API compatibility only; the original artwork has no color variants. */
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
      unoptimized
      className={`bg-transparent object-contain ${className ?? ""}`}
    />
  );
}

/** Header identity is only the supplied artwork — never separately typed lettering. */
export function Logo({
  className,
  priority = false,
  size = "md",
}: {
  /** API compatibility only; the image is never recolored to match the header. */
  tone?: "navy" | "white";
  className?: string;
  priority?: boolean;
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "h-16 w-16 sm:h-20 sm:w-20" : "h-14 w-14 sm:h-16 sm:w-16";

  return (
    <Link
      href="/"
      aria-label={`${org.name} — home`}
      className={`inline-flex shrink-0 ${className ?? ""}`}
    >
      <span data-brand-logo className={`block shrink-0 ${box}`}>
        <QPMark priority={priority} className="block h-full w-full" />
      </span>
    </Link>
  );
}

/** The same untouched artwork for the footer and other identity surfaces. */
export function BrandLockup({
  className,
  height = 96,
  priority = false,
}: {
  /** API compatibility only; the image is never recolored. */
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
      unoptimized
      className={`bg-transparent object-contain ${className ?? ""}`}
    />
  );
}
