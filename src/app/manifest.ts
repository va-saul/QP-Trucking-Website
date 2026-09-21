import type { MetadataRoute } from "next";
import { org } from "@/content/site";
import { LOGO_SRC, LOGO_INTRINSIC } from "@/content/brand";

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
      // Use the complete, unmodified artwork; do not promise platform-specific masking.
      { src: LOGO_SRC, sizes: `${LOGO_INTRINSIC.w}x${LOGO_INTRINSIC.h}`, type: "image/png", purpose: "any" },
    ],
  };
}
