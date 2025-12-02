import { Metadata } from "next";
import { PageHero } from "@/components/sections/shared";
import { FAQSection } from "@/components/sections/shared/FAQSection";
import { CTASection } from "@/components/sections/home";

export const metadata: Metadata = {
  title: "FAQ - Luxury Car Rental Dubai | Uptown Rent a Car",
  description:
    "Find answers to frequently asked questions about renting luxury cars in Dubai. Learn about documents required, age limits, insurance, and more.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Got Questions?"
        description="Everything you need to know about renting a luxury car in Dubai. Can't find what you're looking for? Contact us directly."
      />

      <FAQSection showHeader={false} showViewAll={false} />

      <CTASection />
    </>
  );
}
