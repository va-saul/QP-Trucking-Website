import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesBySlug, servicePath } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

const service = servicesBySlug["ifta"];

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: servicePath(service),
  keywords: service.keywords,
  image: service.heroImage,
});

export default function Page() {
  return <ServicePageTemplate service={service} imageAlt="IFTA fuel tax registration, quarterly filings and annual renewals" />;
}
