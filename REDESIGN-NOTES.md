# Redesign Notes — QP Trucking Solutions

**Document of record** for the qpfactoring.com redesign.
Branch: `arena/01a0b213-qp-trucking-website` · Built: September 2026 · Stack: Next.js 16, Tailwind v4, GSAP 3.15

---

## 1. What was asked for, and where it lives

| Requirement | Implementation |
| --- | --- |
| Redesign the site | 38 routes rebuilt from the original WordPress site — same company voice, same services, same pricing, new architecture and UI |
| Keep the documents on record | `CONTENT-RECORD.md` (page-by-page ledger) + every original URL 308-redirected in `next.config.ts` + original copy carried into `src/content/*` |
| Official logo, used correctly | `src/components/brand.tsx` renders the supplied *QP Trucking Solutions Logo — Navy Final* artwork (§2.1) in the header, footer, favicon, app icon, OG card, mobile drawer and 404 |
| Keep the vibe | Brand navy + royal blue from the QP monogram, slab-serif display type matching the wordmark, the diagonal "freight stripe" motif, red/gold accents, and the original headline promise: *"get started, grow quickly, AND operate profitably — without incurring debt!"* |
| Hero banners per page | Every route has its own banner photograph (`public/images/hero/*.jpg`) rendered full-bleed by `HeroBackdrop`, with a page-specific `variant` driving the desktop spec card (`HERO_ART` in `src/components/hero/HeroArt.tsx`) — 14 variants, no shared generic hero |
| Big hero banner | The photograph **is** the banner: it fills the hero edge to edge at every breakpoint (`HeroBackdrop`, `sizes="100vw"`, srcset served up to 1920 px). No plate, no inset frame |
| Full on mobile | Mobile-fold contract in §4 — `100svh` hero, clamped type, bottom-anchored copy over the photograph's darker half, no horizontal overflow, nothing cropped by browser chrome |
| GSAP on scroll **and on the header** | §3 — scrubbed hero parallax, scroll reveals with stagger, counters, scroll-reactive ticker, plus a GSAP header: entrance stagger, `quickTo` underline pill, `ScrollTrigger` shrink |
| Unique **and minimalist** UI, all info + CTAs kept | §2 — hairline-ruled sections, rules instead of boxes, calm type scale; ticket pricing, spec rail, call cards, FAQ and CTA band all still ship |
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

### 2.1 Brand mark — one file, everywhere

The logo is **one supplied PNG**: `public/images/brand/qp-logo.png` (560×560 — the client's
transparent navy QP monogram). Nothing is redrawn, re-typeset, recoloured or re-derived: every
surface renders that exact file through `src/components/brand.tsx` (`LOGO_SRC`). On dark surfaces
the same file is knocked out to white with the `.logo-knockout` CSS filter (`tone="white"`) —
a filter, not a second artwork.

| Surface | How it renders the file |
| --- | --- |
| Header bar (`<Logo />`) | The PNG next to the brand name as live text — one image, so the mark can never drift |
| Mobile drawer, 404, badges (`<QPMark />`) | The PNG alone |
| Footer identity block (`<BrandLockup />`) | The PNG at 108px |
| Trust marquee | The PNG at 16px |
| 3D truck splash (`<SiteIntro />`) | Every route except `/`: opaque navy-gradient curtains, CSS-3D truck with the PNG on its trailer side (true colour) + white knockout mark in the lockup |
| Browser tab / favicon | `src/app/icon.png` (512×512, transparency preserved) + `src/app/favicon.ico` (16→256) |
| iOS home screen | `src/app/apple-icon.png` (180×180, transparency preserved) |
| Installed app (PWA) | `src/app/manifest.ts` → the same PNG, `any` + `maskable` |
| Google Rich Results | `org.logo` in `src/content/site.ts` → the same PNG |

Because there is a single source file, the tab icon, the header, the footer and the schema logo can
never fall out of sync. Swap the brand: replace `public/images/brand/qp-logo.png`, re-run the three
`convert` commands documented in the README, and every surface updates.

The header logo is the element GSAP scales down (`[data-brand-logo]`, `scale: 0.9`) as the bar
shrinks on scroll.

> **No texture layers.** The blueprint grid (`.blueprint`) and film grain (`.grain`) overlays that
> used to sit behind heroes and dark panels were removed site-wide — surfaces are flat navy, the
> photography is never screened behind a pattern. The diagonal `.stripe-band` freight motif is the
> only pattern left, and it is applied to panels (never over a photograph).

**Signature UI elements**

- `.ticket` — price cards with punched side notches and a perforated divider
- `.glass` — frosted data cards over hero imagery
- `.stripe-band` — the diagonal freight-stripe motif (panels and cards only)
- `.route-rule` / `.lane-line` — dashed highway-lane rules used as section dividers
- `TruckLane` — a CSS-animated QP truck rolling along the bottom of every hero
- Ticket-stub tables, mono spec rows, and numbered "01/02/03" process blocks

**Minimalist pass (this revision)** — the second review asked for the same information with less
furniture, so surfaces were flattened rather than removed: `ServiceCard`, `ProcessSteps`,
`RelatedServices`, `Testimonials` and `TrustBadges` are now hairline-ruled blocks instead of
bordered cards, `SectionHead` draws a rule under the eyebrow (`RuleDraw`), the home stats panel and
cash-cycle cards became top-ruled strips, shadows were softened (`--shadow-card` / `--shadow-lift`),
the ticker moved from 32 logo copies to a two-copy seamless loop with dot separators, and the
cluttered `chips` prop was **removed from the hero API entirely** (hero copy is now eyebrow → H1 →
tagline → two CTAs → slim fact rail). Nothing informative was dropped: every price, form number,
FAQ and CTA still renders.

---

## 3. GSAP animation inventory

Motion lives in `src/components/motion.tsx`, `src/components/motion-extra.tsx`,
`src/components/hero/HeroBackdrop.tsx`, `src/components/layout/Header.tsx` and
`src/components/FaqAccordion.tsx`. All are client components; `gsap.registerPlugin(ScrollTrigger)`
is called in every file that uses it.

**Scrolling (page) animations**

| Animation | Where | Notes |
| --- | --- | --- |
| `HeroBackdrop` entrance | every hero | photograph pushes in from `scale 1.14 / opacity .35` to `1.02 / 1` over 1.9 s — the "big image" reveal |
| `HeroBackdrop` parallax | every hero | scrubbed `yPercent: 14` as the hero scrolls away, so the photo drifts slower than the page |
| `SplitHeading` | every H1 + key H2s | `SplitText` word-by-word mask reveal; waits for `document.fonts.ready` so line breaks measure correctly; `aria: "auto"` keeps headings readable to screen readers |
| `Reveal` / `Reveal` stagger | section blocks, grids, spec rows, service bullets, both pricing tables | `ScrollTrigger` fade + rise with optional child stagger (`once: true`) |
| `FaqAccordion` stagger | all 90+ Q&A lists | questions rise in with a 0.06 s stagger as the list enters view |
| `Marquee` (`TrustMarquee`) | home + section rails | infinite ticker that reads `ScrollTrigger.getVelocity()` and speeds up / reverses with scroll direction |
| `CountUp` | stat strips | numbers count up when scrolled into view |
| `Parallax` | decorative glows | scrubbed, subtle |
| `RouteProgress` | global | top gradient bar tracking read progress — the "freight run" indicator |
| `RuleDraw` | section heads | rule scales out from the left as the head enters |
| `Float`, `Magnetic` | hero accents; desktop CTAs | slow yoyo drift; pointer-reactive lift (`hover: hover` + `pointer: fine` guard) |

**Header animations (GSAP)**

| Animation | Notes |
| --- | --- |
| Staggered entrance | every `[data-header-item]` (mark, nav links, utility links, CTA) fades down in sequence on first paint |
| Underline pill follow | one `gsap.quickTo`-driven underline glides to the hovered/focused nav item and eases back out on leave |
| Shrink on scroll | `ScrollTrigger` toggles a compact bar (reduced padding, translucent backdrop, hairline rule) and eases the brand mark to `scale: 0.9` in the same gesture |
| Mobile drawer | accordion groups animate open/closed; the drawer is a GSAP-timed panel with a CTA stack |

**Guardrails:** every effect checks `prefers-reduced-motion`; `[data-reveal]` hidden states only apply when the `js-anim` class is present (set by an inline script), so no-JS visitors and crawlers always see the copy. GSAP contexts are reverted on unmount — no leaks, no hydration mismatches.

---

## 4. Mobile-fold contract (the big hero must show full on phones)

1. Heroes are `min-h-[100svh]` (small-viewport units) so iOS/Android browser chrome can never crop
   them, and `min-h` never `h-` — if the copy needs more room the band grows instead of clipping.
2. The banner photograph is full-bleed behind everything: `HeroBackdrop` is `absolute inset-0`
   inside an `overflow-hidden` hero, `next/image` `fill` + `object-cover object-center`,
   `sizes="100vw"`, srcset verified to 1920 px. There is no inner frame or inset plate.
3. Legibility over the photo comes from graded scrims, not from shrinking the image: vertical
   `navy-950/90 → /70 → /95` on phones, switching to a left-to-right scrim at `lg` where the copy
   moves to one side.
4. Copy is bottom-anchored on phones (`flex-1 items-end`) so the top two-thirds stay pure
   photograph, and the desktop spec card is `hidden lg:block` — a phone hero is image + words.
5. Type scales with `clamp()` (`--text-display-lg`, `text-hero-body`); the H1 tops out around 34 px
   at 390 px with `max-w-[17ch]`–`[20ch]` so it breaks into short, readable lines.
6. Both CTAs are full-width taps on phones (`w-full … sm:w-auto`) with `py-3.5`, and the fact rail
   keeps two of its four stats at `grid-cols-2` (all four return at `sm`).
7. `html, body { overflow-x: clip }`, `.hero-shell > * { min-width: 0 }`, the marquee is
   `overflow-hidden`, and every grid child is `min-w-0` — no horizontal scroll at 320 px.
8. The sticky mobile bar (`Call now` + `Start application`) appears after 520 px of scroll and
   respects `env(safe-area-inset-bottom)`.

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
