import { SITE_URL, org, trust } from "@/content/site";
import type { Faq, Service } from "@/lib/types";
import { servicePath } from "@/content/services";

/** Local/entity graph — powers knowledge panels, Maps and AI citations. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: org.name,
    legalName: org.legalName,
    alternateName: org.alternateName,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: org.logo, width: 512, height: 512 },
    image: `${SITE_URL}/images/hero/home.jpg`,
    description:
      "QP Trucking Solutions (QP Capital LLC) provides transportation factoring, trucking insurance, authority setup and FMCSA compliance services for owner-operators and fleets across the United States.",
    slogan: org.tagline,
    email: org.email,
    telephone: org.officePhone,
    foundingDate: String(org.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: org.street,
      addressLocality: org.city,
      addressRegion: org.region,
      postalCode: org.postalCode,
      addressCountry: org.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: org.latitude, longitude: org.longitude },
    areaServed: { "@type": "Country", name: "United States" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: org.salesPhone,
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        telephone: org.officePhone,
        contactType: "billing support",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "Trucking factoring",
      "Non-recourse freight factoring",
      "Trucking insurance",
      "FMCSA operating authority",
      "BOC-3 filings",
      "IFTA fuel tax reporting",
      "IRP apportioned registration",
      "DOT compliance",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trucking services",
      itemListElement: trust.badges.map((b) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: b },
      })),
    },
    sameAs: [org.youtube],
  };
}

export function serviceSchema(service: Service) {
  const path = servicePath(service);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name: service.name,
    serviceType: service.short,
    description: service.metaDescription,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", name: "Trucking companies, owner-operators and fleets" },
    ...(service.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            ...(service.price.tiers?.[0]
              ? { price: service.price.tiers[0].price.replace(/[^0-9.]/g, "") }
              : {}),
            description: service.price.summary,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}${path}`,
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.short} details`,
      itemListElement: service.benefits.slice(0, 6).map((b) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: b },
      })),
    },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      item: `${SITE_URL}${t.href === "/" ? "" : t.href}`,
    })),
  };
}

export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { title: string; body: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime: "P1D",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: `${SITE_URL}${post.image ?? "/images/hero/factoring.jpg"}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/insights/${post.slug}` },
    articleSection: "Trucking industry",
    inLanguage: "en-US",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: org.name,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

/** Renders one or many JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
