/**
 * Renders the QP Trucking Solutions brand assets from the canonical SVG logo
 * (public/images/brand/qp-logo.png, qp-icon.png, qp-og.png).
 *
 * Usage: node scripts/render-brand.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (...p) => join(root, "public", "images", "brand", ...p);
mkdirSync(out(), { recursive: true });

const NAVY = "#1b4fa0"; // brand-500 — sampled from the delivered logo
const INK = "#0a2450";

/**
 * The official QP mark: outer ring, Q/P bows sharing one stem, crossbar,
 * and the flared foot where the stem meets the ring.
 * Geometry lives in a 96×96 box; colour is injected per use.
 */
export function qpMark(color, { decor } = {}) {
  return `
  <g fill="none" stroke="${color}">
    <circle cx="48" cy="48" r="40" stroke-width="6.8"/>
    <path d="M16 48a32 32 0 0 1 64 0" stroke-width="7"/>
    <path d="M12 48h72" stroke-width="7"/>
  </g>
  <path fill="${color}" d="M44.5 10.5h7v63.4l6.6 12.6H37.9l6.6-12.6z"/>
  ${decor ?? ""}`;
}

/* 512×512 — the full logo lockup exactly as delivered: mark on white with
   the two-line serif wordmark beneath. Used for schema.org + manifest. */
const lockup = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#ffffff"/>
  <g transform="translate(118 26) scale(2.875)">${qpMark(NAVY)}</g>
  <text x="256" y="392" text-anchor="middle" font-family="DejaVu Serif" font-weight="700"
        font-size="58" fill="${NAVY}">QP Trucking</text>
  <text x="256" y="458" text-anchor="middle" font-family="DejaVu Serif" font-weight="700"
        font-size="58" fill="${NAVY}">Solutions</text>
</svg>`;

/* 512×512 — app icon: navy rounded square, white mark with safe padding
   so it also works as an adaptive/maskable icon. */
const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="${INK}"/>
  <g transform="translate(88 88) scale(3.5)">${qpMark("#ffffff")}</g>
</svg>`;

/* 1200×630 — OpenGraph card: mark + wordmark over the site's navy
   blueprint field with a gold rule. */
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#04122a"/>
      <stop offset="0.6" stop-color="#0a2450"/>
      <stop offset="1" stop-color="#061a38"/>
    </linearGradient>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M46 0H0v46" fill="none" stroke="#ffffff" stroke-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1000" cy="520" r="330" fill="#2f6fe0" opacity="0.14"/>
  <circle cx="120" cy="110" r="230" fill="#f2b441" opacity="0.08"/>
  <g transform="translate(96 192) scale(2.6)">${qpMark("#ffffff")}</g>
  <text x="420" y="316" font-family="DejaVu Serif" font-weight="700" font-size="92" fill="#ffffff">QP Trucking</text>
  <text x="420" y="424" font-family="DejaVu Serif" font-weight="700" font-size="92" fill="#7fa7ec">Solutions</text>
  <rect x="424" y="470" width="340" height="6" fill="#f2b441"/>
  <text x="424" y="530" font-family="DejaVu Sans" font-size="32" fill="#e9eef6">Factoring · Insurance · Compliance</text>
</svg>`;

const jobs = [
  [lockup, out("qp-logo.png")],
  [icon, out("qp-icon.png")],
  [og, out("qp-og.png")],
];

for (const [svg, dest] of jobs) {
  await sharp(Buffer.from(svg), { density: 96 }).png().toFile(dest);
  console.log("wrote", dest);
}
