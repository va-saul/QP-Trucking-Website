import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesBySlug, servicePath } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

const service = servicesBySlug["scac"];

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: servicePath(service),
  keywords: service.keywords,
  image: service.heroImage,
});

export default function Page() {
  return <ServicePageTemplate service={service} imageAlt="SCAC code registration unlocking intermodal and government freight" chips={["NMFTA code", "Intermodal access", "$40 client rate"]} />;
}
