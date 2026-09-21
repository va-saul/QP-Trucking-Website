export type Faq = { q: string; a: string };

export type PriceTier = {
  label: string;
  price: string;
  note?: string;
};

export type HeroVariant =
  | "highway"
  | "invoice"
  | "shield"
  | "paperwork"
  | "sunrise"
  | "fuel"
  | "plate"
  | "safety"
  | "binder"
  | "tech"
  | "support"
  | "team"
  | "counter"
  | "ambassador"
  | "circle"
  | "fuelcard"
  | "equipment";

export type AccentKey = "blue" | "gold" | "teal";

export type ServiceCategory = "Factoring" | "Insurance" | "Authority & Compliance";

export type ServiceSection = {
  h: string;
  /** Paragraphs of plain, citable prose. */
  p?: string[];
  bullets?: string[];
};

export type Service = {
  slug: string;
  /** Full page title (H1). */
  name: string;
  /** Short label for nav / cards. */
  short: string;
  category: ServiceCategory;
  /** Mono eyebrow shown above the H1. */
  eyebrow: string;
  /** One-line hero sub-headline. */
  tagline: string;
  /** 40–60 word direct answer used in the hero answer box + FAQPage/defined-term. */
  answer: string;
  heroVariant: HeroVariant;
  heroImage: string;
  accent: AccentKey;
  price?: {
    summary: string;
    tiers?: PriceTier[];
    fine?: string;
  };
  /** Old site "Add to cart" / application link kept for continuity. */
  checkoutUrl?: string;
  intro: string[];
  sections: ServiceSection[];
  benefits: string[];
  process?: { title: string; body: string }[];
  faqs: Faq[];
  related: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  /** Cards shown in the hero art panel. */
  heroStats: { label: string; value: string }[];
};
