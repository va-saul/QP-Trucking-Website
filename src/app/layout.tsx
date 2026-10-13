import type { Metadata, Viewport } from "next";
import { createElement } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/bitter/wght.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { RouteProgress } from "@/components/motion";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL, org } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QP Trucking Solutions | Trucking Factoring, Insurance & FMCSA Compliance",
    template: "%s | QP Trucking Solutions",
  },
  description:
    "Factoring, trucking insurance, new authority setup and FMCSA compliance services for owner-operators and fleets. Get paid in minutes, with no long-term contract and no hidden fees. Call 833-762-3464.",
  keywords: [
    "trucking factoring",
    "freight bill factoring",
    "trucking insurance",
    "new authority setup",
    "FMCSA compliance services",
    "non-recourse factoring",
    "IFTA filing",
    "IRP registration",
    "BOC-3 filing",
    "owner operator services",
  ],
  applicationName: org.name,
  authors: [{ name: org.name, url: SITE_URL }],
  creator: org.name,
  publisher: org.legalName,
  category: "trucking finance and compliance",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: org.name,
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#061a38" },
    { media: "(prefers-color-scheme: dark)", color: "#04122a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        {/* Progressive enhancement flag: reveal-on-scroll content is only
            hidden once we know JS is running, so crawlers and no-JS visitors
            always see every word. */}
        <Script id="js-anim-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js-anim');`}
        </Script>
        <link rel="preconnect" href="https://deciphercredit.net" />
      </head>
      <body className="min-h-screen bg-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:text-navy-900"
        >
          Skip to content
        </a>
        <RouteProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCta />
        {/* CRM owns the chat conversation and consent flow. */}
        {createElement("chat-widget", {
          "location-id": "yvQJy3oBoDmK005drBmX",
          "prompt-msg": "Hi there! Have a question? Chat with us here.",
          "prompt-avatar": "https://assets.cdn.filesafe.space/yvQJy3oBoDmK005drBmX/media/6a87408e994ded095ad630d6.png",
          "agency-name": "Momentum CRM",
          "agency-website": "momentumamp.com",
          "chat-type": "allInOneChat",
          "show-consent-checkbox": "true",
          source: "WEB_USER",
        })}
        <Script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" strategy="afterInteractive" />
        {/* spacer so the sticky mobile bar never covers the end of the page */}
        <div aria-hidden="true" className="h-[68px] lg:hidden" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
