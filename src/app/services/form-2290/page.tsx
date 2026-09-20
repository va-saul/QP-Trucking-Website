import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesBySlug, servicePath } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

const service = servicesBySlug["form-2290"];

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: servicePath(service),
  keywords: service.keywords,
  image: service.heroImage,
});

export default function Page() {
  return <ServicePageTemplate service={service} imageAlt="Form 2290 heavy highway vehicle use tax filing and stamped Schedule 1" />;
}
