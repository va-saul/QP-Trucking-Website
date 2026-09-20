import Link from "next/link";
import Image from "next/image";
import { org } from "@/content/site";

/**
 * Brand assets.
 *
 * ONE source of truth — `/public/images/brand/qp-logo.png`. The mark is never
 * redrawn, traced or re-exported as SVG: header, footer, 404 page, trust
 * marquee, OpenGraph data, the web manifest and the browser tab icon
 * (`app/favicon.ico` + `app/icon.png`, both rendered from this same PNG) all
 * point at this single file so the logo can never drift out of sync again.
 */
export const LOGO_SRC = "/images/brand/qp-logo.png";
export const LOGO_SIZE = 512;

/** The QP mark, exactly as supplied — a plain <img> of the brand PNG. */
export function QPMark({
  className,
  tone = "navy",
}: {
  className?: string;
  /** Kept for call-site compatibility; the PNG already carries the brand tile. */
  tone?: "navy" | "white" | "gold";
}) {
  void tone;
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={LOGO_SIZE}
      height={LOGO_SIZE}
      sizes="80px"
      className={`shrink-0 object-contain ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

/**
 * Mark + wordmark lockup, used by the header and the footer so both render the
 * identical logo file and the identical type treatment.
 */
export function LogoLockup({
  tone = "navy",
  markClassName = "h-9 w-9 sm:h-10 sm:w-10",
  nameClassName = "text-[1.05rem] sm:text-[1.15rem]",
  subClassName = "text-[0.72rem] sm:text-[0.78rem]",
  priority = false,
}: {
  tone?: "navy" | "white";
  markClassName?: string;
  nameClassName?: string;
  subClassName?: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={LOGO_SRC}
        alt={`${org.name} logo`}
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        priority={priority}
        sizes="(max-width: 640px) 36px, 60px"
        className={`shrink-0 rounded-[0.6rem] object-contain ${markClassName}`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-tight ${nameClassName} ${
            tone === "white" ? "text-white" : "text-navy-900"
          }`}
        >
          QP Trucking
        </span>
        <span
          className={`font-display font-semibold tracking-[0.06em] ${subClassName} ${
            tone === "white" ? "text-brand-300" : "text-brand-500"
          }`}
        >
          Solutions
        </span>
      </span>
    </>
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
  void compact;
  return (
    <Link
      href="/"
      aria-label={`${org.name} — home`}
      className={`group flex items-center gap-2.5 ${className ?? ""}`}
    >
      <LogoLockup tone={tone} priority />
    </Link>
  );
}
