import { Metadata } from "next";
import { PageHero } from "@/components/sections/shared";
import { TermsContent } from "@/components/sections/terms";
import { CTASection } from "@/components/sections/home";

export const metadata: Metadata = {
  title: "Terms and Conditions | Dream Drives Dubai",
  description:
    "Read the terms and conditions for renting luxury cars from Dream Drives in Dubai. Understand our rental policies, insurance coverage, and payment terms.",
  openGraph: {
    title: "Terms and Conditions | Dream Drives",
    description:
      "Terms and conditions governing luxury car rental services by Dream Drives in Dubai, UAE.",
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        tagline="Legal"
        title="Terms and Conditions"
        description="Please read these terms and conditions carefully before renting a vehicle from Dream Drives."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms and Conditions" },
        ]}
      />

      <TermsContent />

      <CTASection />
    </>
  );
}
