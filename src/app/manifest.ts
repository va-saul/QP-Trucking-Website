import type { MetadataRoute } from "next";
import { org } from "@/content/site";

/**
 * PWA / app manifest. Every icon is the single brand PNG
 * (`/images/brand/qp-logo.png`) or a size variant exported from it, so the
 * installed-app icon matches the browser tab icon exactly.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${org.name} — Factoring, Insurance & Compliance`,
    short_name: "QP Trucking",
    description:
      "Trucking factoring, insurance, authority setup and FMCSA compliance for owner-operators and fleets.",
    start_url: "/",
    display: "standalone",
    background_color: "#04122a",
    theme_color: "#061a38",
    categories: ["business", "finance", "productivity"],
    icons: [
      { src: "/images/brand/qp-logo-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/images/brand/qp-logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/images/brand/qp-logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
