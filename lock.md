# QP Trucking Solutions — Site Lock Record (`lock.md`)

**Date Locked:** September 2026  
**Status:** All Core Features & Architecture Fully Locked  
**Repository:** `va-saul/QP-Trucking-Website`  
**Active Working Branch:** `arena/01a0cf44-qp-trucking-website`  
**Merged Branches / PRs:** PR #1, PR #2, PR #3, PR #4, PR #5, PR #6, PR #7, PR #8, PR #9, PR #10  

---

## 1. Executive Ownership & Leadership Lock
- **Owner & CEO:** **Brandon Bennett** is the Owner and Chief Executive Officer of **QP Capital LLC**, **QP Factoring**, and **QP Trucking Solutions**.
- **Official Portrait:** `Brandon Bennett.png` (from repository root, copied to `public/images/brandon-bennett.png` and `public/images/team/brandon-bennett.png`).
- **Presence on `/about`:** The About page (`src/app/about/page.tsx`) features a dedicated executive spotlight with Brandon Bennett's high-resolution portrait, quote, founder history since 2017, and University of Kentucky finance background.

---

## 2. Header Navigation & Pricing Lock
- The desktop Header (`src/components/layout/Header.tsx`) and mobile drawer provide direct, persistent access to:
  1. **Factoring** (`/factoring`) — Transportation Factoring, Pure Non-Recourse™, QP Pay Card
  2. **Insurance** (`/insurance`) — Trucking Insurance, Quote Intake
  3. **Authority & Compliance** (`/services`) — New Authority, BOC-3, Form 2290, IRP, IFTA, UCR, MCS-150, SCAC, DOT Binder, Drug Consortium, ELD/Dashcam
  4. **Programs** (`/programs/circle-network`) — Circle Network, Ambassador Referral, QP Fuel Card, Equipment Finance
  5. **Pricing** (`/store`) — Direct top-level navigation item linking to the published service and authority pricing catalog
  6. **Company** (`/about`) — About QP & Leadership, Insights, FAQ, Contact
- Direct phone call links on Header: Sales `833-762-3464` and Office `502-398-6333`.

---

## 3. 3D Truck GSAP Splash Screen Lock
- **File:** `src/components/SiteIntro.tsx` (mounted on Home page `src/app/page.tsx`).
- **Functionality:** 
  - CSS-3D semi truck (cuboid cabin, sleeper, dual chrome exhaust stacks, clearance lights, spinning wheels, true-color official Logo on trailer side).
  - GSAP timeline drives the truck in from the deep 3D horizon with realistic perspective swing, suspension bob, and headlight beams illuminating the asphalt.
  - Curtain halves open smoothly to reveal the Home Hero.
  - Fully skippable on tap/click/Esc key, respects `prefers-reduced-motion`, and is safe for SEO/crawlers.

---

## 4. Mobile Bottom Navigation Lock (5 Exact Buttons)
- **File:** `src/components/layout/MobileBottomNav.tsx` (rendered sitewide in `src/app/layout.tsx` on phones/tablets, `lg:hidden`).
- **The 5 Bottom Dock Buttons:**
  1. **Factoring** (`/factoring`)
  2. **Insurance** (`/insurance`)
  3. **Call Us** (`tel:+1-833-762-3464`) — Raised central FAB with gold pulse ring dialing the default line `833-762-3464`.
  4. **CIRCLE Network** (`/programs/circle-network`)
  5. **More** — Opens the slide-up drawer containing:
     - Quick links to all remaining pages (Home, Start Application, Pricing & Store, All Services, Ambassador, Fuel Card, Equipment Finance, About QP & Leadership, Insights, FAQ, Contact).
     - Full Social Media Suite (Facebook, Instagram, X, LinkedIn, YouTube, TikTok).
     - Direct hotline call banner ending in **3464** (`833-762-3464`).
- **StickyMobileCta:** Replaced to prevent any duplicate 2-button bar from appearing.

---

## 5. Home Reviews Side Scroller Lock
- **File:** `src/components/ReviewsRail.tsx` (and `src/content/reviews.ts`), mounted on `src/app/page.tsx`.
- **Integrated Feedback Channels:**
  1. **YouTube Video Reviews:** 8 real client video testimonials with high-resolution thumbnails (`hqdefault.jpg`) from QP's channel (*MBOYS Trucking*, *Predator Transport*, *JHM Logistics*, *Suburban Transport Systems*, etc.) linking directly to the video reviews.
  2. **Google Reviews:** 5-star verified client feedback cards with Google branding and overall 4.9 rating badge.
  3. **Trustpilot Reviews:** 5-star verified client quotes with Trustpilot green star branding and overall 4.7 / 5.0 "EXCELLENT" badge.
- **Controls:** Smooth horizontal scroll snapping, left/right carousel arrows, and mouse/touch drag support.
- **Integrity:** Existing Testimonials quote block and all other home sections remain untouched.

---

## 6. Official Brand & Logo Lock
- **Single Logo Source:** `public/Logo.png` (and `public/images/brand/qp-logo.png`).
- Handled uniformly across Header, Footer, Favicon (`icon.png`, `apple-icon.png`, `favicon.ico`), PWA manifest, and schema metadata (`BRAND-LOCK.md`).
- Flat navy and white surfaces; no extraneous overlay textures.

---

## 7. Programs & CRM Lock
- **Circle Network** (`/programs/circle-network`): 0% factoring fee tier, fuel card setup, IFTA/IRP processing.
- **Ambassador Referral Program** (`/programs/ambassador`): $500–$700 factoring referral payouts, $250 insurance, $100 fuel/dispatch.
- **QP Fuel Card** (`/programs/fuel-card`): 48¢/gal partner savings across 9,000+ stations.
- **Equipment Finance** (`/programs/equipment-finance`): Tractor and trailer loan application.
- **Momentum CRM Chat Widget:** Mounted in `src/app/layout.tsx` with LeadConnector script.
