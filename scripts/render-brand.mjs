/**
 * Renders the QP Trucking Solutions brand assets from the canonical SVG logo
 * (public/images/brand/qp-logo.png, qp-icon.png, qp-og.png).
 *
 * Geometry is hand-matched to the delivered artwork (96-unit box):
 * outer ring ≈0.98 of frame, uniform strokes ≈0.10R, the inner Q/P dome
 * radius ≈0.32R, full-width crossbar, stem with flared foot into the ring.
 *
 * Usage: npm run brand
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (...p) => join(root, "public", "images", "brand", ...p);
mkdirSync(out(), { recursive: true });

const NAVY = "#17479b"; // sampled from the delivered logo
const INK = "#0a2450";

export function qpMark(color) {
  return `
  <g fill="none" stroke="${color}" stroke-width="4.6">
    <circle cx="48" cy="48" r="44.5"/>
    <path d="M33 48a15 15 0 0 1 30 0"/>
    <path d="M4.5 48h87"/>
  </g>
  <path fill="${color}" d="M45.7 3.4H50.3V76.5l2.9 13H42.8l2.9-13z"/>`;
}

/* 512×512 — the delivered lockup: navy mark on white with the two-line
   serif wordmark beneath. Used for schema.org + manifest. */
const lockup = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#ffffff"/>
  <g transform="translate(139 14) scale(2.44)">${qpMark(NAVY)}</g>
  <text x="256" y="388" text-anchor="middle" font-family="DejaVu Serif" font-weight="700"
        font-size="56" fill="${NAVY}">QP Trucking</text>
  <text x="256" y="456" text-anchor="middle" font-family="DejaVu Serif" font-weight="700"
        font-size="56" fill="${NAVY}">Solutions</text>
</svg>`;

/* 512×512 — app icon: navy rounded square, white mark with safe padding
   so it also works as an adaptive/maskable icon. */
const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="${INK}"/>
  <g transform="translate(71 71) scale(3.85)">${qpMark("#ffffff")}</g>
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
  <g transform="translate(103 194) scale(2.5)">${qpMark("#ffffff")}</g>
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
