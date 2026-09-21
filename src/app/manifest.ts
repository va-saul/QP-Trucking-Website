import type { MetadataRoute } from "next";
import { org } from "@/content/site";
import { LOGO_SRC } from "@/components/brand";

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
      // original Logo.png — same PNG the header, footer and tab icon use
      { src: LOGO_SRC, sizes: "560x560", type: "image/png", purpose: "any" },
      { src: LOGO_SRC, sizes: "560x560", type: "image/png", purpose: "maskable" },
    ],
  };
}
