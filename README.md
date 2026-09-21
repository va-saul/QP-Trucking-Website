# QP Trucking Solutions — Website Redesign

A ground-up redesign of **[qpfactoring.com](https://qpfactoring.com)** built with Next.js 16 (App Router), Tailwind CSS v4 and GSAP 3. Every page from the original WordPress site is preserved — content, services, pricing and URLs — but rebuilt with per-page hero banners, a modern conversion architecture, and SEO / AEO / GEO infrastructure.

> **Live preview:** run `npm run dev` (the dev server binds to `0.0.0.0:3000`).

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (38 routes, all statically prerendered)
npm start        # serve the production build
npm run lint     # typecheck (tsc --noEmit)
npm test         # original-logo integrity + session-animation regression tests
```

> Don't run `npm run build` while `npm run dev` is serving the preview — both write to `.next` and
> the dev server will start 404-ing. Stop the dev server (or `rm -rf .next` and restart it) instead.

Node 20+ required. No environment variables are needed to run the site.

---

## What's inside

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16.3 (App Router, Turbopack), React 19 |
| Styling | Tailwind CSS v4 with a custom `@theme` design system (`src/app/globals.css`) |
| Type | Bitter Variable (display), Inter Variable (body), IBM Plex Mono (labels) — self-hosted via Fontsource, no third-party font requests |
| Motion | GSAP 3.15 (`ScrollTrigger`, `SplitText`) — `src/components/motion.tsx` |
| Imagery | 16 page-specific hero banners in `public/images/hero/`, rendered **full-bleed** by `HeroBackdrop` at every breakpoint (`fill` + `object-cover`, `sizes="100vw"`), served through `next/image` (AVIF/WebP) |
| Brand | **Original artwork only** — `Logo.png`, served unchanged as `public/images/brand/qp-logo-original.png` — used by the header, mobile drawer, footer, marquee, 404, the browser tab, the iOS home screen and the PWA manifest. Nothing is redrawn or re-typeset |
| Forms | `LeadForm` client component → `POST /api/lead` → optional webhook (`LEAD_WEBHOOK_URL`) |
| SEO | Per-page metadata, canonicals, OpenGraph/Twitter, `sitemap.xml`, `robots.txt`, 40+ JSON-LD graphs |

### Entrance animation behavior

- GSAP entrances and decorative scroll effects run only on the **first page of a fresh tab session** — including direct visits to About, Services or any other route.
- Navigating between pages, using Back/Forward, or refreshing does **not** replay the opening effects. A genuinely fresh tab session gets the entrance again.
- `sessionStorage["qp:entrance-seen:v1"]` is set before hydration; `EntranceSession` shares one decision with all effects and cleans them up on navigation. This is per visitor, not a server-wide flag or a permanent `localStorage` setting.
- Reduced-motion visitors and browsers that block storage get static, fully visible content. No-JS rendering includes the real statistics and meter values, not zeroes.
- Navigation hover/focus, the mobile menu, FAQ toggles and reading progress remain usable. The original logo is never hidden, recolored or scaled by GSAP.

### Brand assets (original artwork is authoritative)

**`Logo.png` at the repository root is the original supplied artwork.** It is a
560×560 transparent blue mark. Do not substitute the legacy white/gold icon,
retype a wordmark beside it, recolor it, or animate its size.

`src/content/brand.ts` is the shared asset reference for components, metadata,
schema and the manifest. `public/images/brand/qp-logo-original.png` and
`src/app/icon.png` are byte-for-byte copies of `Logo.png`. Brand components serve
the PNG directly (`unoptimized`) with a transparent CSS background so the original
alpha channel is preserved visually. No white box or other opaque canvas is added;
the artwork itself is not flattened or edited.
The distinct public filename prevents cached copies of the incorrect legacy logo
from being served. `public/images/brand/qp-logo.png` is legacy artwork and is no
longer used by the app.

Only favicon/iOS sizes are mechanically resized from the original, without
reconstructing the mark. To synchronize after an **explicitly approved** source
replacement, update the pinned source hash/dimensions in the brand tests too:

```bash
cp Logo.png public/images/brand/qp-logo-original.png
cp Logo.png src/app/icon.png
convert Logo.png -resize 180x180 -background white -alpha remove -alpha off src/app/apple-icon.png
convert Logo.png -resize 256x256 -define icon:auto-resize=48,32,16 src/app/favicon.ico
npm test
```

### Routes

```
/                                    Home (dedicated hero + full section stack)
/factoring                           Factoring hub + program comparison
/factoring/trucking-factoring        Transportation factoring
/factoring/pure-non-recourse         Pure Non-Recourse™
/insurance                           Trucking insurance + quote form
/services                            Authority & compliance hub
/services/{new-authority, boc-3, form-2290, irp, ifta, ucr,
           mcs-150, scac, dot-binder, drug-alcohol-consortium, eld-dashcam}
/store                               Full service catalog with published pricing
/faq                                 Master FAQ hub (5 topic clusters)
/about                               Company + video reviews
/contact                             Contact, NAP, map, routing
/get-started                         Consultation form + application path
/insights                            Editorial hub
/insights/[slug]                     7 articles (incl. the 80-term glossary)
/privacy-policy                      Privacy notice
/sitemap.xml · /robots.txt · /manifest.webmanifest · /icon.svg
/api/lead                            Lead intake endpoint
```

**30 legacy WordPress URLs** (`/trucking-factoring`, `/2290-2`, `/oil-and-gas-factoring`, `/scac-2`, `/store/*` duplicates, `/get-started-2`, …) are 308-redirected in `next.config.ts` — no indexed URL or backlink is lost.

---

## Configuration for launch

1. **Lead routing** — set `LEAD_WEBHOOK_URL` (and optionally `LEAD_WEBHOOK_TOKEN`) to forward form submissions to your CRM/Zapier/Slack. Without it, submissions are logged server-side.
2. **Domain** — `SITE_URL` in `src/content/site.ts` is used for canonicals, JSON-LD, sitemap and OG URLs.
3. **Analytics** — add your tag in `src/app/layout.tsx`; the site ships with zero third-party scripts by default (fast Core Web Vitals).
4. **Payments** — the original site's cart links pointed at `https://qpfactoring.com/cart/?ec_action=addtocart&model_number=…`. The redesign routes orders through `/get-started?service=…` (a human confirms every order) and keeps the loan-application link (`deciphercredit.net`) intact on the factoring and get-started pages.

---

## Content & documentation

- **`CONTENT-RECORD.md`** — the content ledger: every original page, its copy, pricing and where it now lives.
- **`REDESIGN-NOTES.md`** — design system, the per-page hero banner system, GSAP animation inventory, the mobile-fold contract, and the full SEO / AEO / GEO workstream.

## Deployment

Any Node host works (Vercel, Netlify, Render, a VPS with `npm run build && npm start`). The build output is fully static except `/api/lead`. `sharp` is included for image optimization; `next.config.ts` also sets long-lived cache headers for `/images/*`.
