import { Metadata } from "next";
import { PageHero } from "@/components/sections/shared";
import { InsuranceContent } from "@/components/sections/insurance";
import { CTASection } from "@/components/sections/home";

export const metadata: Metadata = {
  title: "Insurance & Protection | Dream Drives Dubai",
  description:
    "Learn about our comprehensive insurance and protection options for luxury car rentals in Dubai. Collision damage, theft protection, and roadside assistance available.",
  openGraph: {
    title: "Insurance & Protection | Dream Drives",
    description:
      "Comprehensive insurance and protection products for luxury car rentals in Dubai, UAE.",
  },
};

export default function InsurancePage() {
  return (
    <>
      <PageHero
        tagline="Protection"
        title="Insurance & Coverage"
        description="Drive with confidence. Explore our comprehensive insurance and protection options designed to give you peace of mind during your rental."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insurance" },
        ]}
      />

      <InsuranceContent />

      <CTASection />
    </>
  );
}
