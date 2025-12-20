import type { Metadata } from "next";
import {
  HeroSection,
  CategorySection,
  CTASection,
  TrustSignals,
  TestimonialsSection,
  BookingSection,
} from "@/components/sections/home";
import { FAQSection } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Luxury Car Rental Dubai | Free Delivery | Dream Drives",
  description:
    "Rent Mercedes, BMW, Range Rover and more from competitive rates. Free delivery to your hotel or airport. Exceptional service in Dubai.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <CategorySection
        id="featured-cars"
        subtitle="Featured Cars"
        description="The cars our customers keep coming back for. Smooth from start to finish."
        title="Cars Popular with our Customers"
        category="featured"
        viewAllHref="/cars"
        ctaText="View All Featured Cars"
      />

      <CategorySection
        id="exotic-cars"
        subtitle="Exotic Cars"
        title="Enjoy the thrill of the experience"
        description="Lamborghini, Ferrari, McLaren. The experience lives up to the car."
        category="exotic"
        viewAllHref="/cars/body-type/supercar"
        ctaText="View All Exotic Cars"
      />


      <CategorySection
        id="suv-collection"
        subtitle="Luxury SUVs"
        title="Bring the whole crew"
        description="For the trips where it's not just you. Room for the people and room for the bags." 
        category="suv"
        viewAllHref="/cars/body-type/suv"
        ctaText="View All Luxury SUVs"
      />

      {/* <CategorySection */}
      {/*   id="convertibles" */}
      {/*   title="Convertibles" */}
      {/*   subtitle="Open Air Freedom" */}
      {/*   description="Feel the Dubai breeze with our stunning convertible collection. Perfect for coastal drives and unforgettable experiences." */}
      {/*   category="convertible" */}
      {/*   viewAllHref="/cars?category=convertible" */}
      {/*   alternateBackground */}
      {/* /> */}

      {/* <CategorySection */}
      {/*   id="sport-cars" */}
      {/*   title="Sport Cars" */}
      {/*   subtitle="Performance Driven" */}
      {/*   description="Experience precision engineering and thrilling performance with our collection of Porsches and sports cars." */}
      {/*   category="sports" */}
      {/*   viewAllHref="/cars?category=sports" */}
      {/* /> */}

      <TrustSignals />

      <TestimonialsSection />

      <FAQSection limit={5} />

      <BookingSection />

    </>
  );
}
