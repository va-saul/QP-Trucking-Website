import type { NextConfig } from "next";

/**
 * Legacy WordPress → new route map.
 * Every URL indexed on the old qpfactoring.com site is preserved as a permanent
 * (308) redirect so no equity, ranking or backlink is lost in the redesign.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  // Service pages (old flat slugs → new nested structure)
  { source: "/trucking-factoring", destination: "/factoring/trucking-factoring" },
  { source: "/pure-non-recourse", destination: "/factoring/pure-non-recourse" },
  { source: "/new-authority", destination: "/services/new-authority" },
  { source: "/boc-3", destination: "/services/boc-3" },
  { source: "/2290-2", destination: "/services/form-2290" },
  { source: "/2290", destination: "/services/form-2290" },
  { source: "/oil-and-gas-factoring", destination: "/services/irp" },
  { source: "/irp", destination: "/services/irp" },
  { source: "/ifta", destination: "/services/ifta" },
  { source: "/dot-binder", destination: "/services/dot-binder" },
  { source: "/drug-and-alcohol-consortium", destination: "/services/drug-alcohol-consortium" },
  { source: "/ucr", destination: "/services/ucr" },
  { source: "/mcs-150", destination: "/services/mcs-150" },
  { source: "/scac-2", destination: "/services/scac" },
  { source: "/scac", destination: "/services/scac" },
  { source: "/elddashcam-savings-program", destination: "/services/eld-dashcam" },

  // WooCommerce store duplicates → consolidated service pages
  { source: "/store/new-authority", destination: "/services/new-authority" },
  { source: "/store/boc-3", destination: "/services/boc-3" },
  { source: "/store/ucr", destination: "/services/ucr" },
  { source: "/store/2290", destination: "/services/form-2290" },
  { source: "/store/irp", destination: "/services/irp" },
  { source: "/store/ifta", destination: "/services/ifta" },
  { source: "/store/ifta-quarterly-renewal", destination: "/services/ifta" },
  { source: "/store/ifta-annual-renewal", destination: "/services/ifta" },
  { source: "/store/drug-amp-alcohol-consortium", destination: "/services/drug-alcohol-consortium" },
  { source: "/store/mcs-150", destination: "/services/mcs-150" },
  { source: "/store/scac", destination: "/services/scac" },
  { source: "/store/carrier-setup-pack", destination: "/services/dot-binder" },
  { source: "/store/safety-amp-compliance-packet-pdf-only", destination: "/services/dot-binder" },
  { source: "/store/safety-amp-compliance-physical-copy", destination: "/services/dot-binder" },
  {
    source: "/store/start-to-finish-set-up-minus-compliance-binder-ifta-annualquarterly-carrier-set-up-packet",
    destination: "/services",
  },
  { source: "/store/qp-capital-business-funding", destination: "/factoring" },

  // Content / utility pages
  { source: "/a-bout-invoice-factoring", destination: "/factoring" },
  { source: "/get-started-2", destination: "/get-started" },
  { source: "/contact-privacy-policy", destination: "/contact" },
  { source: "/get-to-know-your-trucking-terms", destination: "/insights/get-to-know-your-trucking-terms" },
  { source: "/cart", destination: "/store" },
  { source: "/account", destination: "/get-started" },
  { source: "/apply-now", destination: "/get-started" },
  { source: "/pagina-ejemplo", destination: "/" },
  { source: "/header-movil-page", destination: "/" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
