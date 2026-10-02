import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * GEO (Generative Engine Optimization): crawlers used by AI answer engines are
 * explicitly welcomed, because being quotable in ChatGPT, Perplexity, Gemini,
 * Copilot, Claude and Grok is now a primary acquisition channel for search.
 */
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /_next/ must stay crawlable: Google needs its JS/CSS to render pages (blocking it triggers
      // "resources blocked" issues in Search Console). Only the API routes are off-limits.
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiAgents.map((ua) => ({ userAgent: ua, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
