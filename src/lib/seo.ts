import type { Metadata } from "next";
import { SITE_URL, org } from "@/content/site";

/** The original logo file and its intrinsic square size (see components/brand.tsx). */
const LOGO_FILE = "/Logo.png";
const LOGO_PX = 560;

/* ------------------------------------------------------------------ */
/*  SERP TITLE CONTRACT                                                */
/* ------------------------------------------------------------------ */
/**
 * Google rewrites a title it does not trust — when it is too long (the SERP
 * clips at ~580px, roughly 60 characters), keyword-stuffed, or generic enough
 * that it could describe any page on the web. So titles are composed in one
 * place, from one rule set, and asserted by `tests/seo.test.cjs`:
 *
 *  1. A page passes the *subject* of the page ("IFTA Registration & Filing"),
 *     not a marketing sentence and not a keyword list.
 *  2. The brand suffix is appended here, never by hand, so every title in the
 *     SERP ends the same way (mixed "| QP Trucking" / "| QP Trucking Solutions"
 *     / no-brand titles are exactly what makes Google substitute its own).
 *  3. The composed title always fits the pixel budget. If subject + suffix
 *     overflows, the suffix is dropped before the words are; a page never ships
 *     a mid-sentence truncation.
 *  4. `ogTitle` may carry the full editorial headline — social cards are not
 *     length-limited the way a SERP snippet is.
 */
export const SERP_TITLE_MAX = 60;
export const SERP_TITLE_MIN = 30;
/** Google clips meta descriptions at ~160 characters. */
export const SERP_DESCRIPTION_MAX = 160;
export const SERP_DESCRIPTION_MIN = 70;

/** Short, consistent brand tail. Kept under 14 chars so subjects stay readable. */
export const BRAND_SUFFIX = "| QP Trucking";

/** Anything that already names the company keeps its own tail untouched. */
const MENTIONS_BRAND = /QP Trucking|QP Capital|QP Factoring/i;

const clip = (value: string, max: number) => {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const atSpace = cut.lastIndexOf(" ");
  return `${(atSpace > max * 0.6 ? cut.slice(0, atSpace) : cut).trimEnd()}…`;
};

/**
 * The single place a `<title>` is assembled. Exposed so the audit test can
 * assert on the exact string a page renders rather than on raw source.
 */
export function composeTitle(subject: string): string {
  const trimmed = subject.trim();
  if (MENTIONS_BRAND.test(trimmed)) return clip(trimmed, SERP_TITLE_MAX);

  const withBrand = `${trimmed} ${BRAND_SUFFIX}`;
  if (withBrand.length <= SERP_TITLE_MAX) return withBrand;
  if (trimmed.length <= SERP_TITLE_MAX) return trimmed;
  return clip(trimmed, SERP_TITLE_MAX);
}

const warn = (message: string) => {
  if (process.env.NODE_ENV !== "production") console.warn(`[seo] ${message}`);
};

type SeoInput = {
  /** Page subject without the brand tail — see the SERP TITLE CONTRACT above. */
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  /** Intrinsic size of `image` — defaults match the 1376×860 page banners. */
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Full headline for social cards when `title` is the shortened SERP variant. */
  ogTitle?: string;
};

/**
 * Central metadata factory. Every page gets: a length-governed title with a
 * consistent brand tail, canonical URL, OpenGraph, Twitter card, keyword set and
 * an absolute image — the baseline Google, Bing, and answer engines (ChatGPT,
 * Perplexity, Gemini, Claude) need.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  // Default share image = the page banner family (1376×860). Pages that do not
  // pass an image of their own still share the brand's own photograph, never a
  // stretched logo.
  image = "/images/hero/home.jpg",
  imageWidth = image.endsWith(LOGO_FILE) ? LOGO_PX : 1376,
  imageHeight = image.endsWith(LOGO_FILE) ? LOGO_PX : 860,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  ogTitle,
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  // `absolute` skips the root layout's template — the suffix is already applied
  // by `composeTitle`, so the brand can never be doubled.
  const serpTitle = composeTitle(title);
  const shareTitle = (ogTitle ?? serpTitle).trim();

  if (serpTitle.length > SERP_TITLE_MAX) warn(`"${path}" title is ${serpTitle.length} chars (limit ${SERP_TITLE_MAX}): ${serpTitle}`);
  if (serpTitle.length < SERP_TITLE_MIN) warn(`"${path}" title is only ${serpTitle.length} chars and may read as generic: ${serpTitle}`);
  if (description.length > SERP_DESCRIPTION_MAX) warn(`"${path}" description is ${description.length} chars (limit ${SERP_DESCRIPTION_MAX})`);

  return {
    title: { absolute: serpTitle },
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
    openGraph: {
      type,
      url,
      siteName: org.name,
      title: shareTitle,
      description,
      locale: "en_US",
      images: [{ url: ogImage, width: imageWidth, height: imageHeight, alt: shareTitle }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage],
    },
  };
}
