import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesBySlug, servicePath } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

const service = servicesBySlug["boc-3"];

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: servicePath(service),
  keywords: service.keywords,
  image: service.heroImage,
});

export default function Page() {
  return <ServicePageTemplate service={service} imageAlt="BOC-3 process agent filing for a new trucking authority" chips={["20-day deadline", "50 states", "$40 client rate"]} />;
}
