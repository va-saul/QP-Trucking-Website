# BRAND LOCK — QP Trucking Solutions

> **The one rule:** the site logo is the original `Logo.png` (560×560) that came
> from the `main` branch. It is never redrawn, regenerated, restyled, or swapped
> for a recreated mark. Every logo surface renders this exact file. If a proposed
> change alters any hash below, the change is wrong.

## Canonical artwork

| Field | Value |
| --- | --- |
| File | `Logo.png` (repo root) |
| Artwork | Navy field with the QP ring/cross monogram (gold/blue segments) |
| Dimensions | 560 × 560 px |
| SHA-256 | `87dea8cc6e19e2967cf909b88a800ebe8952a307a6ca3d5c349150eae7aa58c6` |

## Byte-identical mirrors (all must keep the same SHA-256)

| Path | Purpose |
| --- | --- |
| `Logo.png` | Canonical original |
| `public/Logo.png` | Served at `/Logo.png` — rendered by `<Logo />`, `<QPMark />`, `<BrandLockup />` |
| `public/images/brand/qp-logo.png` | Backwards-compatible mirror |
| `src/app/icon.png` | Browser tab icon (Next.js metadata file) |
| `src/app/apple-icon.png` | iOS home-screen icon (Next.js metadata file) |

Verify at any time:

```sh
sha256sum Logo.png public/Logo.png public/images/brand/qp-logo.png \
          src/app/icon.png src/app/apple-icon.png
# all five → 87dea8cc6e19e2967cf909b88a800ebe8952a307a6ca3d5c349150eae7aa58c6
```

## Favicon

`src/app/favicon.ico` is a multi-size ICO (**48×48 + 32×32 + 16×16**) generated
**only** from the canonical `Logo.png` above — never from any other artwork.
It was regenerated from the restored original after the previous ICO was found
to still carry the old recreated simplified mark:

```sh
convert Logo.png -define icon:auto-resize=48,32,16 src/app/favicon.ico
```

- Current SHA-256: `3c4d2db951e65e0f5cd321d99bcde99993af544e69f93dc3591a8650ea023040`
- Sanity check: `identify src/app/favicon.ico` must list three frames (48×48, 32×32, 16×16).
- If the favicon ever goes stale, re-run the command above against the canonical
  file — the ICO must always be derived from the locked `Logo.png`.

## Surfaces covered by the lock

- Header bar + mobile drawer — `src/components/brand.tsx` (`<Logo />`, `<QPMark />`)
- Footer lockup — `src/components/brand.tsx` (`<BrandLockup />`)
- 404 page + trust marquee — `src/components/brand.tsx` (`<QPMark />`)
- Browser tab / favicon — `src/app/favicon.ico` + `src/app/icon.png`
- iOS home screen — `src/app/apple-icon.png`
- Web manifest (installed app) — `src/app/manifest.ts`
- Organization schema (Rich Results) — `src/content/site.ts` → `org.logo`

## Rules

1. Do not replace, redraw, "improve", or AI-generate any brand asset.
2. Any change to a logo file must keep the SHA-256 in this document; a different
   hash means the wrong artwork.
3. Favicon / icon regeneration must use the exact command above on the canonical
   `Logo.png` — no other source image.
4. `src/components/brand.tsx` must keep `LOGO_SRC = "/Logo.png"`.
5. New brand surfaces must reference the canonical file (or a byte-identical
   mirror), never a re-export or a recreated variant.
