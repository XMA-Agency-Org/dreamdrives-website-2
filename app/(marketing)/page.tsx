import type { Metadata } from "next";
import {
  HeroSection,
  CategorySection,
  TrustSignals,
  TestimonialsSection,
  BookingSection,
} from "@/components/sections/home";
import { FAQSection } from "@/components/sections/shared";
import { getAllCarsAsync } from "@/data/cars";

export const metadata: Metadata = {
  title: "Luxury Car Rental Dubai | Free Delivery | Dream Drives",
  description:
    "Rent Mercedes, BMW, Range Rover and more from competitive rates. Free delivery to your hotel or airport. Exceptional service in Dubai.",
};

export default async function HomePage() {
  const cars = await getAllCarsAsync();

  return (
    <>
      <HeroSection />

      <CategorySection
        id="featured-cars"
        subtitle="Featured Cars"
        description="The cars our customers keep coming back for. Smooth from start to finish."
        title="Cars Popular with our Customers"
        category="featured"
        cars={cars}
        viewAllHref="/cars"
        ctaText="View All Featured Cars"
      />

      <CategorySection
        id="exotic-cars"
        subtitle="Exotic Cars"
        title="Enjoy the thrill of the experience"
        description="Lamborghini, Ferrari, McLaren. The experience lives up to the car."
        category="exotic"
        cars={cars}
        viewAllHref="/cars/body-type/supercar"
        ctaText="View All Exotic Cars"
      />

      <CategorySection
        id="suv-collection"
        subtitle="Luxury SUVs"
        title="Bring the whole crew"
        description="For the trips where it's not just you. Room for the people and room for the bags."
        category="suv"
        cars={cars}
        viewAllHref="/cars/body-type/suv"
        ctaText="View All Luxury SUVs"
      />

      <TrustSignals />

      <TestimonialsSection />

      <FAQSection limit={5} />

      <BookingSection cars={cars} />
    </>
  );
}
