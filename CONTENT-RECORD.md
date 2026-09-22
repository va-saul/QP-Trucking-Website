# Content Record — qpfactoring.com → QP Trucking Solutions redesign

Every page, price, phone number and claim from the original WordPress site, with where it now lives.
Source content harvested from the live site (pages, `page-sitemap.xml`, `ec_store-sitemap.xml`, `robots.txt`) in September 2026.
**Update September 2026 — Phase 2:** Restored owner portrait `Brandon Bennett.png` to `/about#leadership`, highlighted Programs + Fuel Card above Services on Home, enforced center alignment site-wide, and launched `/blog` with 10 detailed SEO/AEO/GEO guides. See §6 for new inventory.

---

## 1. Business facts carried over (unchanged) + ownership clarified

| Field | Value |
| --- | --- |
| Trading name | QP Trucking Solutions |
| Legal entity | QP Capital LLC |
| Owner | **Brandon Bennett** — Owner & Founder (see `/about#leadership`, `BRAND-LOCK.md`) |
| Also known as | QP Capital, QP Factoring |
| Address | 4612 Outer Loop Rd, Louisville, KY 40219 |
| Hours | Mon – Fri, 8:00 AM – 8:00 PM EST |
| Sales phone | 833-762-3464 ("833-Roadhog", become a QP client) |
| Office / accounting phone | 502-398-6333 |
| Email | info@qpfactoring.com (mailto `qp@qpfactoring.com` on the original contact form) |
| Privacy contact | marketing@qpfactoring.com |
| Loan application URL | `https://deciphercredit.net/products/4huIAwYJXIiFJuKRi6cGXuUEMKpesAOGQISizCZG3hK7AlJ6rnnEfic7vGrY/application` |
| YouTube | youtube.com/channel/UC25zvw7n1n_99br-fS7SgHQ |
| Service area | United States (48 contiguous states) |
| Tagline (home) | "get started, grow quickly, AND operate profitably! –without incurring debt!" |
| Purpose statement (about) | "Trucking businesses and owner-operators are the backbone of our economy…" |
| Leadership image | `Brandon Bennett.png` / `public/images/team/brandon-bennett.png` — only approved portrait, shown on About and blog author boxes |
| Center alignment | Site-wide — `src/app/globals.css` + `SectionHead` default `align=center` (June 2026 request) |
| Programs + Fuel Card highlight | Home page section `id=programs-fuel` above Services Grid — 3 program cards + QP Card 25–40¢/gal panel |

---

## 2. Page-by-page map

| Original URL | New URL | Content status |
| --- | --- | --- |
| `/` | `/` | Home hero claim, service grid (11 ancillary services), "Convert your invoices into cash" 4-step cycle, 4 client testimonials, both phone lines — all retained and expanded |
| `/trucking-factoring/` | `/factoring/trucking-factoring` (308) | Full copy retained: what factoring is, benefits list, 3 steps, QP Pay card features, app paperwork, simple business relationship, "more than transportation factoring" |
| `/pure-non-recourse/` | `/factoring/pure-non-recourse` (308) | Full copy retained: Pure load / Pure paperwork / Pure Protection, the 60–90 day chargeback explanation, non-recourse at a discounted rate |
| `/insurance/` | `/insurance` | Mission statement, "Why use QP Trucking Insurance" list, quote form (rebuilt), coverage range, one-stop-shop section, 833-762-3464 |
| `/about-us/` | `/about` | Full narrative retained + **Brandon Bennett portrait & leadership block (#leadership) restored from main-branch `Brandon Bennett.png`**, owner FAQs and Person schema for AEO — narrative expanded to name owner throughout |
| `/blog` | `/blog` | **NEW 2026-09** — 10 detailed guides (factoring complete guide, Pure Non-Recourse vs non-recourse, new-authority checklist, insurance costs, IFTA/IRP/UCR/2290, DOT binder audit checklist, BOC-3/MCS-150/SCAC/drug consortium, fuel card 25–40¢ guide, ELD/dashcam 2026, Top 5 scams + double-brokering) — each with keywords, AEO FAQs, clickable primary references, Author Brandon Bennett, BlogPosting schema |
| `/blog/[slug]` | `/blog/[slug]` | **NEW** — 10 individual guide pages with Speakable, FAQPage, Person, BlogPosting schema, quick-answer box, references list, related services & guides |
| `/faq` branch | `/faq` | Expanded with owner cluster (`#owner` — Who owns QP? Who is Brandon Bennett?) so answer engines attribute correctly — Person schema added |
| `/get-started/` | `/get-started` | Free-consultation form (rebuilt), Start Application link, call-us-now CTA |
| `/contact-us/` | `/contact` | Address, hours, both phones, email, message form (rebuilt) |
| `/contact-privacy-policy/` | `/contact` + `/privacy-policy` | Contact form → `/contact`; full privacy notice restructured into 14 sections at `/privacy-policy` |
| `/privacy-policy/` | `/privacy-policy` | Termly notice summarised section-for-section (collection, processing, sharing, cookies, retention, security, minors, rights, DNT, California, Virginia, updates, contact, review) |
| `/new-authority/` | `/services/new-authority` (308) | Copy retained incl. "$200 / $100 for factoring clients with promo code" and the ancillary-benefits list |
| `/boc-3/` | `/services/boc-3` (308) | Copy retained: process agent definition, 20-day deadline, insurance requirement, name/address update warning |
| `/2290-2/` | `/services/form-2290` (308) | Copy retained: 55,000 lb threshold, HVUT explanation, IRP ordering note, the "third-party factoring company" paragraph |
| `/oil-and-gas-factoring/` | `/services/irp` (308) | Copy retained: IRP definition, single plate/cab card, mileage reporting — the URL itself was a legacy mislabel for the IRP page |
| `/ifta/` | `/services/ifta` (308) | Copy + all three prices retained: registration $150 ($100), quarterly $60 ($40), annual $100 ($70) |
| `/dot-binder/` | `/services/dot-binder` (308) | Copy retained: PDF $99 / physical $139, "no scattered paperwork all around your rig" |
| `/drug-and-alcohol-consortium/` | `/services/drug-alcohol-consortium` (308) | Copy retained: $135 / $100 client rate, FMCSA & USDOT pre-employment testing requirement |
| `/ucr/` | `/services/ucr` (308) | Copy retained: $60 / $40, annual renewal, MC + USDOT numbers to apply |
| `/mcs-150/` | `/services/mcs-150` (308) | Copy retained: $60 / $40, full description of what the form contains |
| `/scac-2/` | `/services/scac` (308) | Copy retained: $60 / $40, intermodal and government loads |
| `/elddashcam-savings-program/` | `/services/eld-dashcam` (308) | Rebuilt as a member-pricing program page (original had no long-form copy) |
| `/store/*` (16 WooCommerce duplicates) | canonical service pages (308) | Consolidated to remove duplicate content; `/store` itself became the pricing catalog |
| `/a-bout-invoice-factoring/` | `/factoring` (308) | Factoring overview content |
| `/cart/`, `/account/`, `/apply-now/`, `/get-started-2/`, `/pagina-ejemplo/`, `/header-movil-page/` | `/store`, `/get-started`, `/` (308) | Utility/placeholder pages redirected |
| `/top-5-trucking-scams-and-how-to-avoid-them/` | `/insights/top-5-trucking-scams-and-how-to-avoid-them` (308) | Full article copy retained (5 scams + prevention guidance + fuel-card benefits) |
| `/new-fines-for-double-brokering/` | `/insights/new-fines-for-double-brokering` (308) | Copy retained, plus carrier due-diligence guidance added |
| `/get-to-know-your-trucking-terms/` | `/insights/get-to-know-your-trucking-terms` (308) | Complete glossary retained — 80 terms from Accessorial Charge to White Glove Logistics |
| `/carriers-hoping-for-relief-on-insurance-premiums/` | `/insights/carriers-hoping-for-relief-on-insurance-premiums` (308) | Copy retained + "what moves your premium" list added |
| `/rush-hour-times-getting-worse-for-truckers/` | `/insights/rush-hour-times-getting-worse-for-truckers` (308) | ATRI bottleneck data retained |
| `/are-carriers-being-to-hopeful/` | `/insights/are-carriers-being-to-hopeful` (308) | Freight sentiment content retained (title tidied) |
| `/a-sleeper-cab-with-a-jacuzzi/` | `/insights/a-sleeper-cab-with-a-jacuzzi` (308) | Reconstructed from sitemap title + industry context |
| `/bottom-line-blogging/` | `/insights` (308) | Blog index |

---

## 3. Published pricing (carried over exactly)

| Service | Standard | Factoring client (promo code) | Notes |
| --- | --- | --- | --- |
| New Authority Set-Up | $200 | $100 | Government fees separate |
| BOC-3 Filing | $60 | $40 | All 50 states via process agent network |
| Form 2290 (HVUT) | $60 | $40 | IRS tax itself is separate |
| IRP Registration | $195 | — | State apportioned fees separate |
| IFTA Registration | $150 | $100 | |
| IFTA Quarterly Filing | $60 | $40 | |
| IFTA Annual Renewal | $100 | $70 | |
| UCR Registration | $60 | $40 | State fee by fleet size separate |
| MCS-150 Filing/Update | $60 | $40 | No government fee |
| SCAC Code | $60 | $40 | NMFTA issued |
| DOT Compliance Binder | $99 PDF / $139 printed | — | |
| Drug & Alcohol Consortium | $135 | $100 | Testing fees by consortium |
| ELD & Dashcam Program | Member pricing | — | Quoted by fleet size |
| Trucking Insurance | Free to quote | — | Premium varies by operation |
| Factoring | Flat, disclosed fee | — | No application fee, no minimums, no long-term contract |

---

## 4. Testimonials (verbatim)

1. "I can't say enough great things about QP Capital. They provide me with unlimited credit checks, Quick Pay, and they have a program that is simple to understand."
2. "QP is more than just a factoring company. In the beginning they actually coached me on how to negotiate rates with brokers. The inside knowledge they provided me, is priceless."
3. "I absolutely love the fuel card, every-time I look at that statement and see 25 or 40 cents off the cash price it makes me tingle."
4. "It is nice to work with a smaller company. Everytime I call they already know who I am and what I'm working on. I don't have to go through a phone system like the larger companies."

Video reviews retained as outbound links on `/about`: MBOYS Trucking, Customer review C, Predator Transport, JHM Logistics, Suburban Transport Systems, CHARLIES CARS, Devine Trucking, Armondo.

---

## 5. Documents produced by this project

| Document | Purpose |
| --- | --- |
| `REDESIGN-NOTES.md` | Design system, hero-banner system, animation inventory, mobile-fold contract, SEO/AEO/GEO workstream, follow-ups |
| `CONTENT-RECORD.md` | This file — the content ledger and URL map |
| `README.md` | Stack, routes, commands, launch configuration |
| `src/content/*.ts` | Machine-readable source of truth for services, site facts, FAQs and editorial (now includes `src/content/blog.ts` with 10 guides) |
| `next.config.ts` | The executable redirect map (30 legacy URLs) |

---

## 6. September 2026 — Phase 2 additions (this push)

| Item | What changed | Where |
| --- | --- | --- |
| **Brandon Bennett portrait** | Canonical `Brandon Bennett.png` copied to `public/images/team/brandon-bennett.png` and rendered on `/about#leadership` (priority image, gradient caption), in blog author boxes and in FAQ owner cluster. Documented in `BRAND-LOCK.md`. | `src/app/about/page.tsx`, `src/content/site.ts` (`owner`), `src/lib/schema.tsx` (`personSchema`) |
| **Home Programs + Fuel Card highlight** | New highlighted section `id=programs-fuel` inserted **above** Services Grid: 3 program mini-cards (Recourse / Non-recourse / Pure Non-Recourse™ flagged “Most chosen”) + dark Fuel Card panel (25–40¢/gal, 5 controls, testimonial, dual CTA). Existing deep comparison kept below services. | `src/app/page.tsx` |
| **Center alignment** | All website content center-aligned per request: `src/app/globals.css` adds `main {text-align:center}` with header/footer exclusions + hero centering on all breakpoints; `SectionHead` default `align=center`; `HomeHero`/`PageHero` updated to `text-center` and `justify-center`. | `globals.css`, `src/components/ui.tsx`, `src/components/hero/*.tsx` |
| **Blog — 10 detailed posts** | `src/content/blog.ts` with 10 guides: each has slug/title/description/excerpt/updated/category/keywords/blocks (p/h2/h3/ul/quote/tip)/faqs/references/relatedServices. Keywords target “trucking factoring”, “how does freight factoring work”, “best fuel card”, “IFTA filing”, “new authority checklist”, “BOC-3”, “ELD mandate”, etc. Each uses AEO Quick Answer + FAQPage, GEO citations, Clickable external links, and names Brandon Bennett as author/owner. | `src/content/blog.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` |
| **FAQ owner AEO** | Added `ownerFaqs` cluster (`#owner`) with 3 questions, set as first cluster; added `personSchema` to FAQ JSON-LD and About/Hero stats; updated `homeFaqs[0]` to owner. | `src/app/faq/page.tsx`, `src/content/site.ts` |
| **SEO/AEO/GEO hardening** | BlogListing emits `Blog` + `BlogPosting` + `FAQPage`; BlogPost emits `BlogPosting` + `FAQPage` + `SpeakableSpecification` + `Person`; `organizationSchema` now `founder`/`owner` → `#brandon-bennett`; layout emits `personSchema` globally; sitemap includes `/blog` + 10 blog slugs; robots welcome AI crawlers already. | `src/lib/schema.tsx`, `src/app/layout.tsx`, `src/app/sitemap.ts` |
| **Navigation** | Header navigation adds `Blog` under Company, Factoring adds Fuel Card link; Footer already via sitemap. | `src/content/site.ts` |
| **Hero center + owner mention** | `HomeHero`/`PageHero` now `text-center` with `mx-auto` headings; HomeHero tagline names Brandon Bennett. | `src/components/hero/*` |
