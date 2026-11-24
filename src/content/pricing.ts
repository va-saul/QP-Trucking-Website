/**
 * Canonical ancillary service price list — single source of truth.
 *
 * Mirrors the published "QP Trucking Solutions — Ancillary Services Service
 * Price List | October 2026" PDF, including its three client tiers:
 *
 *   circle    → Circle Network members ................ FREE processing
 *   paid      → Factoring or Insurance clients ........ discounted rate
 *   ancillary → Ancillary-only (no QP factoring/insurance) .. full rate
 *
 * Every price rendered anywhere on the site reads from this file, so updating
 * a figure here updates the catalog, service pages, FAQs, metadata and the
 * structured-data offers together.
 *
 * IMPORTANT: prices are QP *processing fees* only. Government fees and taxes
 * (FMCSA authority fee, IRP apportioned fees, IRS HVUT, state UCR fees) are
 * additional and are always disclosed separately — see `PRICING_DISCLAIMER`.
 */

export type PriceTierKey = "circle" | "paid" | "ancillary";

export type AncillaryPrice = {
  /** Matches a `Service.slug` in src/content/services.ts */
  slug: string;
  /** Label as printed on the published price list */
  label: string;
  circle: string;
  paid: string;
  ancillary: string;
  /** Optional qualifier shown under the price (e.g. per-truck charges) */
  note?: string;
};

/** Column headings used anywhere a tiered price is displayed. */
export const PRICE_TIER_LABELS: Record<PriceTierKey, { short: string; long: string }> = {
  circle: { short: "Circle Network", long: "Circle Network members" },
  paid: { short: "Factoring or Insurance", long: "Factoring or Insurance clients" },
  ancillary: { short: "Ancillary only", long: "Ancillary services only" },
};

/** Effective date printed on the published list. */
export const PRICE_LIST_EFFECTIVE = "October 2026";

/** The line that must accompany every published price. */
export const PRICING_DISCLAIMER =
  "All prices are QP processing fees only. Clients are responsible for all applicable government fees and taxes, which are additional and are not included in the prices shown.";

/** Circle Network footnote, verbatim from the published list. */
export const CIRCLE_NETWORK_FOOTNOTE =
  "All services listed above are processed free for Circle Network members. Members are responsible for applicable government fees and taxes.";

/** IFTA footnote, verbatim from the published list. */
export const IFTA_FOOTNOTE =
  "IFTA: $50 for each additional truck. Applies to both paid tiers; no processing charge for Circle Network.";

/**
 * The published price list, in the same order as the PDF.
 * Services that are not on the published list (UCR, ELD & dashcam, factoring,
 * insurance, fuel card, equipment finance) intentionally do not appear here.
 */
export const ancillaryPrices: AncillaryPrice[] = [
  {
    slug: "authority-application",
    label: "Authority application",
    circle: "FREE",
    paid: "$150",
    ancillary: "$300",
  },
  {
    slug: "llc-formation",
    label: "LLC formation",
    circle: "FREE",
    paid: "$150",
    ancillary: "$300",
  },
  {
    slug: "ein-application",
    label: "EIN application",
    circle: "FREE",
    paid: "$100",
    ancillary: "$200",
  },
  {
    slug: "boc-3",
    label: "BOC-3",
    circle: "FREE",
    paid: "$99",
    ancillary: "$198",
  },
  {
    slug: "scac",
    label: "SCAC code",
    circle: "FREE",
    paid: "$99",
    ancillary: "$199",
  },
  {
    slug: "form-2290",
    label: "Form 2290",
    circle: "FREE",
    paid: "$150",
    ancillary: "$300",
  },
  {
    slug: "irp",
    label: "IRP",
    circle: "FREE",
    paid: "$149",
    ancillary: "$298",
  },
  {
    slug: "dot-binder",
    label: "DOT binder",
    circle: "FREE",
    paid: "$99",
    ancillary: "$198",
  },
  {
    slug: "ifta",
    label: "IFTA",
    circle: "FREE",
    paid: "$149",
    ancillary: "$298",
    note: "$50 for each additional truck",
  },
  {
    slug: "drug-alcohol-consortium",
    label: "Drug & Alcohol Consortium",
    circle: "FREE",
    paid: "$199",
    ancillary: "$398",
  },
  {
    slug: "mcs-150",
    label: "MCS-150",
    circle: "FREE",
    paid: "$99",
    ancillary: "$198",
  },
];

/** Lookup by service slug — `undefined` when the service is not on the list. */
export const priceBySlug: Record<string, AncillaryPrice> = Object.fromEntries(
  ancillaryPrices.map((p) => [p.slug, p]),
);

/**
 * Standard `Service.price.tiers` representation: the two published paid tiers.
 * Tier order is significant — `tiers[0]` is the primary "from" price used on
 * cards and in structured data, `tiers[1]` is the secondary rate.
 */
export const priceTiers = (slug: string) => {
  const p = priceBySlug[slug];
  if (!p) return undefined;
  return [
    { label: PRICE_TIER_LABELS.paid.short, price: p.paid, note: p.note },
    { label: PRICE_TIER_LABELS.ancillary.short, price: p.ancillary, note: p.note },
  ];
};

/** One-line summary used above the tiers, e.g. "$150 factoring or insurance · $300 ancillary only". */
export const priceSummary = (slug: string) => {
  const p = priceBySlug[slug];
  if (!p) return undefined;
  return `${p.paid} factoring or insurance clients · ${p.ancillary} ancillary only · FREE for Circle Network`;
};

/** The short note shown beside the headline price on service pages. */
export const priceNote = (slug: string) => {
  const p = priceBySlug[slug];
  if (!p) return undefined;
  return `${p.ancillary} ancillary only · FREE for Circle Network`;
};

/**
 * Builds the complete `Service.price` object for a listed service so service
 * records never restate a number. `fine` adds service-specific fine print.
 */
export const priceBlock = (slug: string, fine?: string) => {
  const p = priceBySlug[slug];
  if (!p) throw new Error(`No published price for "${slug}" — add it to ancillaryPrices first.`);
  return {
    summary: priceSummary(slug) as string,
    tiers: priceTiers(slug) as { label: string; price: string; note?: string }[],
    fine: fine ?? PRICING_DISCLAIMER,
  };
};

/**
 * The published catalog table — grouped exactly as the PDF presents it.
 * `circle` is uniform (FREE) for this list but stays per-row so a future list
 * that charges Circle members can change one value without touching markup.
 */
export const catalogRows = ancillaryPrices.map((p) => ({
  slug: p.slug,
  label: p.label,
  circle: p.circle,
  paid: p.paid,
  ancillary: p.ancillary,
  note: p.note,
}));
