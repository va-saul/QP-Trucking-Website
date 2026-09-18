import type { MetadataRoute } from "next";
import { org } from "@/content/site";

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
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/images/brand/qp-logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
