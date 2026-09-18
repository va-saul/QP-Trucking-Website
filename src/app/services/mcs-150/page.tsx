import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesBySlug, servicePath } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

const service = servicesBySlug["mcs-150"];

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: servicePath(service),
  keywords: service.keywords,
  image: service.heroImage,
});

export default function Page() {
  return <ServicePageTemplate service={service} imageAlt="MCS-150 motor carrier identification report and biennial USDOT update" chips={["Biennial update", "USDOT active", "$40 client rate"]} />;
}
