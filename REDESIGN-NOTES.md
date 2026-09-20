# Redesign Notes — QP Trucking Solutions

**Document of record** for the qpfactoring.com redesign.
Branch: `arena/01a0b213-qp-trucking-website` · Built: September 2026 · Stack: Next.js 16, Tailwind v4, GSAP 3.15

---

## 1. What was asked for, and where it lives

| Requirement | Implementation |
| --- | --- |
| Redesign the site | 38 routes rebuilt from the original WordPress site — same company voice, same services, same pricing, new architecture and UI |
| Keep the documents on record | `CONTENT-RECORD.md` (page-by-page ledger) + every original URL 308-redirected in `next.config.ts` + original copy carried into `src/content/*` |
| Keep the vibe | Brand navy + royal blue from the QP monogram, slab-serif display type matching the wordmark, the diagonal "freight stripe" motif, red/gold accents, and the original headline promise: *"get started, grow quickly, AND operate profitably — without incurring debt!"* |
| Hero banners per page | 14 distinct hero variants → `src/components/hero/HeroArt.tsx` (`HERO_ART` map) + a dedicated banner image per page (`public/images/hero/*`) |
| Full on mobile | Mobile-fold contract in §4 — `svh` heights, clamped type, compact artwork, no horizontal overflow, hero content visible without cropping |
| GSAP animations where they help | §3 — hero art timeline, split-text headings, scroll reveals, counters, parallax, route-progress bar, magnetic CTAs |
| Unique, attractive UI | §2 — ticket-stub pricing, glass data cards, blueprint/grain texture, truck-lane strip, marquee ticker, dieline tables |
| Strong SEO / AEO / GEO | §5 — entity graph, per-page metadata, FAQPage/HowTo/Service/Article schema, AI-crawler policy, citable answer blocks |
| CTAs on every service page | Every service page carries 6 conversion points: hero CTAs, sticky pricing ticket, mid-page call card, FAQ-side call card, related-services grid, closing CTA band + the always-visible mobile bar |

---

## 2. Design system

**Palette** (Tailwind `@theme` tokens in `src/app/globals.css`)

- `navy-950 #04122a` → `navy-800 #0a2450` — hero and footer grounds
- `brand-500 #1b4fa0` / `brand-400 #2f6fe0` — the QP monogram blue, used for CTAs and links
- `gold-400 #f2b441` — accent for stamps, "flagship" marks, focus rings
- `teal-400 #2fb3a6` — secondary accent (insurance/technology pages)
- `signal #d8322c` — reserved for warnings and the YouTube mark
- `bone #f7f5f0` — warm off-white section ground (avoids the flat-white template look)

**Typography** — Bitter Variable (slab serif, matches the wordmark) for all display type; Inter Variable for body; IBM Plex Mono for eyebrows, prices, spec labels and stamps. Fluid `--text-display-*` clamps scale from 320 px to 1920 px with no breakpoint jumps.

**Signature UI elements**

- `.ticket` — price cards with punched side notches and a perforated divider
- `.glass` — frosted data cards over hero imagery
- `.stripe-band` / `.blueprint` / `.grain` — the diagonal-stripe and blueprint-grid textures that echo the original artwork, plus film grain so flat navy areas don't band on phones
- `.route-rule` / `.lane-line` — dashed highway-lane rules used as section dividers
- `TruckLane` — a CSS-animated QP truck rolling along the bottom of every hero
- Ticket-stub tables, mono spec rows, and numbered "01/02/03" process blocks

**Official logo rollout (September 2026)** — the delivered navy QP logo was rebuilt as a single canonical SVG `QPMark` (`src/components/brand.tsx`): outer ring, shared Q/P stem with its flared foot, crossbar and the two bows. It now appears everywhere the brand shows up: header + footer lockups, favicon (`src/app/icon.svg`), PWA manifest icons, schema.org `logo`, the OpenGraph/Twitter card, the marquee separators, the 404 page — and as the door/grille decal and trailer artwork on the 3D intro truck. Raster derivatives (`public/images/brand/qp-logo.png` full lockup on white, `qp-icon.png` app icon, `qp-og.png` 1200×630 social card) are regenerated from the same geometry with `npm run brand` (`scripts/render-brand.mjs`, sharp).

---

## 3. GSAP animation inventory

All motion lives in `src/components/motion.tsx` (client) and `src/components/hero/HeroArt.tsx`.

| Animation | Where | Notes |
| --- | --- | --- |
| `SiteIntro` — the 3D truck opener | first visit of each session | a CSS-3D semi (`src/components/intro/Truck3D.tsx` — real preserve-3d boxes: trailer, cab, chrome stacks, spinning alloy wheels) hauls across a perspective freeway (`SiteIntro.tsx`); wheels and lane dashes are perpetual GSAP tweens throttled by `timeScale` so the rig eases in, idles under the brand lockup, then launches off as the curtain lifts; tap/Escape skips; gated by `js-anim` + `intro-skip` html classes (inline script), removed for reduced-motion, and armed with a CSS + try/catch failsafe so it can never trap the page; fires `qp:reveal` so the homepage H1 starts exactly as the curtain lifts |
| `SplitHeading` | every H1 + key H2s | `SplitText` word-by-word mask reveal; waits for `document.fonts.ready` so line breaks measure correctly; `aria: "auto"` keeps headings readable to screen readers; homepage H1 additionally waits for the intro's `qp:reveal` curtain event |
| Hero art timeline | every page hero | plate → glass card → rows → rubber stamp → progress meter, sequenced on mount |
| `Reveal` | section blocks, cards, grids | `ScrollTrigger` fade + rise, optional child stagger |
| `CountUp` | stat strips | numbers count up when scrolled into view |
| `Parallax` | decorative hero glows | scrubbed, subtle |
| `RouteProgress` | global | top gradient bar tracking read progress — the "freight run" indicator |
| `Magnetic` | desktop only | pointer-reactive CTA lift (`hover: hover` + `pointer: fine` guard) |
| `Float` | hero accents | slow yoyo drift |

**Guardrails:** every effect checks `prefers-reduced-motion`; `[data-reveal]` hidden states only apply when the `js-anim` class is present (set by an inline script), so no-JS visitors and crawlers always see the copy. GSAP contexts are reverted on unmount — no leaks, no hydration mismatches.

---

## 4. Mobile-fold contract (hero must show full on phones)

1. Heroes use `min-h-[100svh]` (small-viewport units) so iOS/Android browser chrome never crops them; content is laid out with `flex-1` and never absolutely positioned.
2. Type scales with `clamp()` — the H1 tops out at ~34 px on a 390 px screen.
3. The hero artwork is a 168 px plate on phones (`sm:` restores the 16:9 → 4:3 ratios), and the glass data card keeps two rows on phones, all three from `sm` up.
4. Secondary hero furniture (trust bullets, third/fourth stats) is `sm:` and up only, so the essential stack — eyebrow → H1 → promise → CTAs → artwork — fits the first screen.
5. `html, body { overflow-x: clip }` plus `.hero-shell > * { min-width: 0 }` guarantees no horizontal scroll at 320 px.
6. Primary CTAs are full-width on phones; the sticky mobile bar (`Call now` + `Start application`) appears after 520 px of scroll and respects `env(safe-area-inset-bottom)`.
7. Verified at 360/390/414 px widths in markup terms; type, spacing and art all scale from the same clamps (no fixed pixel heights other than the intentional 168 px mobile plate).

---

## 5. SEO · AEO · GEO

**SEO (classic)**
- Per-page `title`/`description`/keywords via `buildMetadata()` (`src/lib/seo.ts`), canonical URLs, OpenGraph + Twitter cards with absolute images, per-page `robots` directives, `max-image-preview: large`.
- `sitemap.xml` (32 URLs with priorities) and `robots.txt` generated by Next metadata routes.
- **30 legacy URLs 308-redirected** to their new homes (service slugs, WooCommerce `/store/*` duplicates, utility pages) — preserves rankings and backlink equity.
- Duplicate-content consolidation: `/store/<service>` pages (previously thin WooCommerce duplicates) now redirect to the canonical service page, and `/store` became a single pricing catalog.
- Semantic HTML throughout: one `h1` per page, ordered headings, `<address>` for NAP, `<caption>` on data tables, breadcrumb navigation on every interior page.
- Performance: static prerendering, self-hosted fonts, `next/image` AVIF/WebP, zero third-party scripts, no layout shift (all media has intrinsic aspect ratios).

**AEO (answer engines)**
- Every service page opens with a **"Quick answer"** block: a 40–60 word, self-contained definition written to be quoted verbatim (Question + Answer pairs are also emitted as `FAQPage` schema).
- FAQ sections on all 14 service pages, the factoring hub, store, insurance, get-started, about and the 5-cluster `/faq` hub — 90+ question/answer pairs total with schema.
- Structured data emits `Organization` + `FinancialService` + `LocalBusiness`, `WebSite`, `Service` (with `Offer` pricing), `FAQPage`, `HowTo` (the 3-step funding process), `BreadcrumbList`, `Article`, `ItemList`, `ContactPage`, `AboutPage` and `InsuranceAgency`.
- `HowTo` blocks describe QP's actual process ("Get paid in 3 steps"), making the workflow machine-readable.

**GEO (generative engine optimization)**
- `robots.txt` explicitly welcomes AI crawlers: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Bytespider`, `cohere-ai`, `Meta-ExternalAgent`, `DuckAssistBot`, `YouBot`.
- Entity clarity: consistent `QP Trucking Solutions` / `QP Capital LLC` naming, NAP block, geo coordinates, opening hours, `sameAs` links, and an `knowsAbout` list so models can bind the brand to "trucking factoring", "FMCSA compliance", "IRP", "IFTA" and so on.
- Citable specificity everywhere: real prices ($200 authority, $60 filings, $40 client rate), named forms (BOC-3, MCS-150, Form 2290), exact addresses and phone numbers — the details generative answers need.
- Content depth for retrieval: the 80-term trucking glossary, freight-fraud guidance, insurance-cost analysis and bottleneck data give the domain topical authority in the trucking-finance cluster.
- No `noindex`, no gating, no walled content on any public page.

---

## 6. Accessibility

Skip link, visible gold focus rings, `aria-expanded` on menus and accordions, keyboard-operable mobile drawer and accordion, `aria-hidden` on decorative layers, `<caption>` + `scope` on tables, 4.5:1+ contrast on dark grounds, and full reduced-motion support.

## 7. Known follow-ups

1. **Lead delivery** — `/api/lead` logs submissions until `LEAD_WEBHOOK_URL` is configured.
2. **Six derived banners** — `eld.jpg`, `about.jpg`, `contact.jpg`, `get-started.jpg`, `faq.jpg` and `insights.jpg` were produced as graded crops of the primary shoots (unique per page, brand-graded). They can be swapped for bespoke shoots or fresh AI frames at any time by replacing the file — the components reference paths only.
3. **Video reviews** — the about page links to the original YouTube reviews; embedding them via `next/third-parties` is a one-line change if wanted.
4. **Analytics/consent** — Google Analytics and a consent banner were intentionally left out of this build.
