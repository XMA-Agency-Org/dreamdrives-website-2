import {
  HeroSection,
  CategorySection,
  BrandShowcase,
  CTASection,
  TrustSignals,
  AdvantagesSection,
  BookingSection,
} from "@/components/sections/home";
import { FAQSection } from "@/components/sections/shared";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <BrandShowcase />

      <CategorySection
        id="luxury-cars"
        title="Luxury Cars"
        subtitle="Unmatched Elegance"
        description="Experience the pinnacle of automotive luxury with our collection of Rolls Royce, Bentley, and premium sedans."
        category="luxury"
        viewAllHref="/fleet?category=luxury"
      />

      <CategorySection
        id="exotic-cars"
        title="Exotic Cars"
        subtitle="Pure Adrenaline"
        description="Turn heads with our exclusive collection of Lamborghinis, Ferraris, and the world's most coveted supercars."
        category="exotic"
        viewAllHref="/fleet?category=exotic"
        alternateBackground
      />

      <CategorySection
        id="suv-collection"
        title="Luxury SUVs"
        subtitle="Command The Road"
        description="Dominate Dubai's streets with our premium SUV collection. Perfect for families, groups, or those who demand presence."
        category="suv"
        viewAllHref="/fleet?category=suv"
      />

      {/* <CategorySection */}
      {/*   id="convertibles" */}
      {/*   title="Convertibles" */}
      {/*   subtitle="Open Air Freedom" */}
      {/*   description="Feel the Dubai breeze with our stunning convertible collection. Perfect for coastal drives and unforgettable experiences." */}
      {/*   category="convertible" */}
      {/*   viewAllHref="/fleet?category=convertible" */}
      {/*   alternateBackground */}
      {/* /> */}

      {/* <CategorySection */}
      {/*   id="sport-cars" */}
      {/*   title="Sport Cars" */}
      {/*   subtitle="Performance Driven" */}
      {/*   description="Experience precision engineering and thrilling performance with our collection of Porsches and sports cars." */}
      {/*   category="sports" */}
      {/*   viewAllHref="/fleet?category=sports" */}
      {/* /> */}

      <TrustSignals />

      <AdvantagesSection />

      <BookingSection />

      <FAQSection limit={5} alternateBackground />

      <CTASection />
    </>
  );
}
