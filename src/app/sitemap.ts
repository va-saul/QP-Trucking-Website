import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { factoringServices, insuranceServices, complianceServices, servicePath } from "@/content/services";
import { insights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/factoring", priority: 0.95, freq: "monthly" },
    { path: "/insurance", priority: 0.95, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/store", priority: 0.8, freq: "monthly" },
    { path: "/get-started", priority: 0.9, freq: "monthly" },
    { path: "/programs/ambassador", priority: 0.85, freq: "monthly" },
    { path: "/programs/circle-network", priority: 0.85, freq: "monthly" },
    { path: "/programs/fuel-card", priority: 0.85, freq: "monthly" },
    { path: "/programs/equipment-finance", priority: 0.85, freq: "monthly" },
    { path: "/faq", priority: 0.85, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "yearly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/insights", priority: 0.7, freq: "weekly" },
    { path: "/privacy-policy", priority: 0.3, freq: "yearly" },
  ];

  const serviceRoutes = [
    ...factoringServices.map((s) => servicePath(s)),
    ...insuranceServices.map((s) => servicePath(s)),
    ...complianceServices.map((s) => servicePath(s)),
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...[...new Set(serviceRoutes)].map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...insights.map((post) => ({
      url: `${SITE_URL}/insights/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
