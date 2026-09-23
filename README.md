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
```

> Don't run `npm run build` while `npm run dev` is serving the preview — both write to `.next` and
> the dev server will start 404-ing. Stop the dev server (or `rm -rf .next` and restart it) instead.

Node 20+ required. The site can render without environment variables, but FMCSA lookup and form-email delivery need the server-side variables listed under [Vercel environment setup](#vercel-environment-setup).

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
| Forms | Site forms → `POST /api/lead` → Resend email routing (insurance to `insurance@qpfactoring.com`, other forms to `marketing@qpfactoring.com`) + optional CRM webhook |
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
/insights/[slug]                     10 articles (incl. the 80-term glossary)
/privacy-policy                      Privacy notice
/sitemap.xml · /robots.txt · /manifest.webmanifest · /icon.svg
/api/lead                            Lead intake, email routing and optional CRM webhook
/api/fmcsa                           Server-side FMCSA QCMobile DOT lookup
```

**30 legacy WordPress URLs** (`/trucking-factoring`, `/2290-2`, `/oil-and-gas-factoring`, `/scac-2`, `/store/*` duplicates, `/get-started-2`, …) are 308-redirected in `next.config.ts` — no indexed URL or backlink is lost.

---

## Configuration for launch

1. **Form email delivery** — configure Resend and the email variables in the Vercel setup below. The API emails insurance quote/intake submissions to `insurance@qpfactoring.com` and all other website forms to `marketing@qpfactoring.com`. The optional `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_TOKEN` can additionally copy submissions into a CRM. The server no longer logs submitted form contents.
2. **Domain** — `SITE_URL` in `src/content/site.ts` is used for canonicals, JSON-LD, sitemap and OG URLs.
3. **Analytics** — add your tag in `src/app/layout.tsx`; the site ships with zero third-party scripts by default (fast Core Web Vitals).
4. **Payments** — the original site's cart links pointed at `https://qpfactoring.com/cart/?ec_action=addtocart&model_number=…`. The redesign routes orders through `/get-started?service=…` (a human confirms every order) and keeps the loan-application link (`deciphercredit.net`) intact on the factoring and get-started pages.

### Vercel environment setup

First, create a [Resend](https://resend.com) account, verify the `qpfactoring.com` sending domain (including the DNS records Resend provides), and create an API key. Then open Vercel **Project → Settings → Environment Variables** and add the following server-only variables. Apply them to every environment that should handle live forms/lookups (usually **Production** and **Preview**), then redeploy so the functions pick them up. Do not prefix secrets with `NEXT_PUBLIC_`.

| Variable | Value / purpose |
| --- | --- |
| `FMCSA_API_KEY` | Your FMCSA QCMobile WebKey. Create a developer account and generate a WebKey at [FMCSA API Access](https://mobile.fmcsa.dot.gov/QCDevsite/docs/apiAccess). This is used only by `/api/fmcsa`; the key is never sent to the browser. |
| `RESEND_API_KEY` | Server-side API key from your Resend account. Required to deliver form emails. |
| `EMAIL_FROM` | Sender on a domain verified in Resend, e.g. `QP Trucking Website <forms@qpfactoring.com>`. Verify the domain and its DNS records in Resend first. |
| `LEAD_EMAIL_TO` | `marketing@qpfactoring.com` — destination for general, factoring, compliance and equipment-finance forms. |
| `INSURANCE_EMAIL_TO` | `insurance@qpfactoring.com` — destination for insurance quote and full insurance-intake forms. |
| `LEAD_WEBHOOK_URL` | Optional CRM/automation webhook for an additional copy of each submission. |
| `LEAD_WEBHOOK_TOKEN` | Optional bearer token sent with the webhook. |

The exact names and safe example values are in `.env.example`. If FMCSA returns an authentication error, check that `FMCSA_API_KEY` is the **WebKey** from the FMCSA QCMobile developer portal, not a SAFER website password. The DOT lookup calls FMCSA from the server and accepts the key through this environment variable.

All forms in this repository that submit to `/api/lead` are routed here. The separate third-party factoring application link (Decipher Credit) stays on its own provider and is not intercepted by this site endpoint.

**Sensitive form data:** the full insurance intake and equipment-credit application collect sensitive details. The notification email includes the submitted fields, so limit mailbox access and use your organization’s approved secure mail/CRM policies. For stricter handling, use a secured CRM webhook for those applications rather than forwarding unmasked identity/credit data by email.

---

## Content & documentation

- **`CONTENT-RECORD.md`** — the content ledger: every original page, its copy, pricing and where it now lives.
- **`REDESIGN-NOTES.md`** — design system, the per-page hero banner system, GSAP animation inventory, the mobile-fold contract, and the full SEO / AEO / GEO workstream.

## Deployment

Any Node host works (Vercel, Netlify, Render, a VPS with `npm run build && npm start`). The pages are statically rendered where possible; `/api/lead` and `/api/fmcsa` run as server-side endpoints and need the environment configuration above for production delivery. `sharp` is included for image optimization; `next.config.ts` also sets long-lived cache headers for `/images/*`.
