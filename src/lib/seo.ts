import type { Metadata } from "next";
import { SITE_URL, org } from "@/content/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

/**
 * Central metadata factory. Every page gets: canonical URL, OpenGraph,
 * Twitter card, keyword set and an absolute image — the baseline Google,
 * Bing, and answer engines (ChatGPT, Perplexity, Gemini, Claude) need.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = "/images/hero/home.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    // `absolute` keeps the root layout's "| QP Trucking Solutions" template
    // from doubling the brand on pages whose title already includes it.
    title: { absolute: title },
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
      title,
      description,
      locale: "en_US",
      images: [{ url: ogImage, width: 1376, height: 860, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
