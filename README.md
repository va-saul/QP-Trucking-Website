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
npm test         # FMCSA route, insurance-intake helper and lead route tests (mocked upstream and delivery)
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
| Brand | **One logo file** — `public/images/brand/qp-logo.png` — used by the header, mobile drawer, footer, marquee, 404, the browser tab, the iOS home screen and the PWA manifest. Nothing is redrawn or re-typeset |
| Forms | `LeadForm` client component → `POST /api/lead` → optional webhook (`LEAD_WEBHOOK_URL`) |
| SEO | Per-page metadata, canonicals, OpenGraph/Twitter, `sitemap.xml`, `robots.txt`, 40+ JSON-LD graphs |

### Brand assets (single source)

Every logo surface renders `public/images/brand/qp-logo.png` as-is (`LOGO_SRC` in
`src/components/brand.tsx`). The tab icon and iOS icon are derived from that one file — re-run these
three commands after replacing it:

```bash
# browser tab: byte-for-byte copy of the supplied file
cp public/images/brand/qp-logo.png src/app/icon.png

# iOS home screen: the mark on the artwork's own navy, 180×180
convert public/images/brand/qp-logo.png -resize 148x148 \
  -background "#061a38" -alpha remove -alpha off -gravity center -extent 180x180 \
  src/app/apple-icon.png

# legacy /favicon.ico: 48 / 32 / 16 px
convert public/images/brand/qp-logo.png -background "#061a38" -alpha remove -alpha off \
  -resize 256x256 -define icon:auto-resize=48,32,16 src/app/favicon.ico
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
   **Insurance document uploads** (Section 08 declarations or fleet schedules) are emailed to agents through Resend, so they need `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL` and `LEAD_FROM_EMAIL`. Without `RESEND_API_KEY`, the intake refuses submissions that include files (503) so an applicant never believes an unsent document was received. Files are held only in memory for the request and are not written to disk, the repo or public folders.
2. **Domain** — `SITE_URL` in `src/content/site.ts` is used for canonicals, JSON-LD, sitemap and OG URLs.
3. **Analytics** — add your tag in `src/app/layout.tsx`; the site ships with zero third-party scripts by default (fast Core Web Vitals).
4. **Payments** — the original site's cart links pointed at `https://qpfactoring.com/cart/?ec_action=addtocart&model_number=…`. The redesign routes orders through `/get-started?service=…` (a human confirms every order) and keeps the loan-application link (`deciphercredit.net`) intact on the factoring and get-started pages.

---

## FMCSA insurance pre-fill

Set `FMCSA_API_KEY` to a QCMobile WebKey on the deployment host, then redeploy.
The insurance intake calls `/api/fmcsa?dot=…`; public Motus licensing and insurance
records supplement the required QCMobile carrier record. No extra API key is needed
for Motus. Supplemental outages do not prevent the core carrier fields from loading.

The lookup uses Motus phone/address/MC data when QCMobile lacks it, then retries
empty insurance/history sources by MC docket in parallel. Motus coverage amounts
are dollars; QCMobile required coverage is normally thousands. ISO and compact
`YYYYMMDD` policy/authority dates display as `MM/DD/YYYY`. The status line reports
source counts, docket fallback outcomes, pending application dockets, and
undeliverable-mail flags; an application docket is not proof of granted authority.
Only empty fields are filled, including when the applicant types during the lookup.
A result for a DOT number changed during lookup is ignored.

**What loads where**

- Carrier identity, address, authority, cargo, BI&PD/cargo/bond on file, and prior-insurance
  history fill the Section 01 fields and are tagged "FMCSA". Edited values lose the tag.
- Current and pending insurance filings (Motus Insur `c5y8-a4uz`, with the docket fallback)
  load as policy cards in Section 08: carrier, policy number, BI&PD/cargo, limit and effective
  date. Prior cancelled or replaced filings come from Motus InsHist `3uet-3z4i` and are
  summarized, not loaded as cards. An FMCSA filing is **not** a declarations page, so premium,
  agent and term dates are never filled from it. Up to 10 filings are returned.
- FMCSA publishes only **counts** of drivers and power units (QCMobile `totalDrivers` and
  `totalPowerUnits`). Individual vehicles (VIN, year, make, model, value) and drivers (name,
  date of birth, license number, MVR) are not in public records, so Sections 06 and 07 are
  manual card entry. Nothing is invented from counts.
- Re-running the lookup never overwrites cards the applicant typed or duplicates a filing already
  on a card. Every card on screen is submitted; blank cards are dropped.

The lead payload carries `drivers`, `vehicles`, and `existingPolicies` arrays plus their counts.
The email and CRM webhook receive all of them. Uploads are sent as email attachments for manual
agent review; nothing is parsed automatically.

`npm test` runs deterministic route tests without credentials or live network calls.
These tests are **not live upstream verification**. After deploying, verify with
known DOT records using the configured WebKey and inspect `sources` in the response.
`?debug=1` includes public source sample rows for troubleshooting; do not share
API keys or private intake details in bug reports.

---

## Content & documentation

- **`CONTENT-RECORD.md`** — the content ledger: every original page, its copy, pricing and where it now lives.
- **`REDESIGN-NOTES.md`** — design system, the per-page hero banner system, GSAP animation inventory, the mobile-fold contract, and the full SEO / AEO / GEO workstream.

## Deployment

Any Node host works (Vercel, Netlify, Render, a VPS with `npm run build && npm start`). The build output is fully static except `/api/lead`. `sharp` is included for image optimization; `next.config.ts` also sets long-lived cache headers for `/images/*`.
