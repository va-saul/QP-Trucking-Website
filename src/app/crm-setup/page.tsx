import type { Metadata } from "next";
import { CrmSetupPanel } from "@/components/CrmSetupPanel";

export const metadata: Metadata = {
  title: "Momentum CRM Setup",
  description: "Verify and sync Momentum CRM custom fields without using a terminal.",
  robots: { index: false, follow: false },
};

export default function CrmSetupPage() {
  return (
    <section className="bg-bone pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="container-qp">
        <CrmSetupPanel />
      </div>
    </section>
  );
}
