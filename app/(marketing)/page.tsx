import type { Metadata } from "next";
import {
  HeroSection,
  CategorySection,
  PricePromise,
  HowItWorks,
  DeliveryAreas,
  DocumentsSection,
  TestimonialsSection,
} from "@/components/sections/home";
import { FAQSection } from "@/components/sections/shared";
import { faqData } from "@/data/faqs";
import { PriceCalculator } from "@/components/sections/car";
import { Container, Heading, Section, Text } from "@/components/ui";
import { getAllCarsAsync } from "@/data/cars";
import { getSiteSettings, ratingLine, vatNote } from "@/data/settings";
import { JsonLd, businessLd, faqLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Luxury Car Rental Dubai | Free Delivery | Dream Drives" },
  alternates: { canonical: "/" },
  description:
    "Rent a Mercedes G63, Lamborghini Urus, Cadillac Escalade or Range Rover in Dubai. Daily prices on every car, free delivery anywhere in Dubai.",
};

/** The car in the hero photo: Basil's red Urus Performante (R 50555), shot in Dubai, no third-party logos in frame. */
const HERO_CAR = "lamborghini-urus-performante-2024";

export default async function HomePage() {
  const [cars, settings] = await Promise.all([getAllCarsAsync(), getSiteSettings()]);
  const heroCar = cars.find((c) => c.slug === HERO_CAR) ?? cars.find((c) => c.isFeatured);
  const fromPrice = Math.min(...cars.map((c) => c.pricing.daily));
  const calculatorCars = [...cars].sort((a, b) => b.pricing.daily - a.pricing.daily);

  return (
    <>
      <JsonLd data={businessLd(settings)} />
      <JsonLd data={faqLd(faqData.slice(0, 6))} />

      <HeroSection car={heroCar} fleetCount={cars.length} fromPrice={fromPrice} rating={ratingLine(settings)} />

      <PricePromise settings={settings} />

      <CategorySection
        id="statement-cars"
        subtitle="Lamborghini and G-Class"
        title="Make your entrance"
        description="The Urus and the G63, delivered to your door with the real plate and the real price."
        category="statement"
        cars={cars}
        viewAllHref="/cars/body-type/suv"
        ctaText="See all SUVs"
      />

      <CategorySection
        id="family-cars"
        subtitle="Seven seats"
        title="The whole family in one car"
        description="Escalade and Yukon, waiting at arrivals with room for everyone and the bags."
        category="family"
        cars={cars}
        viewAllHref="/cars/body-type/suv"
        ctaText="See all SUVs"
      />

      <Section spacing="lg" id="price-calculator">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Heading as="h2" size="lg" className="mb-4">See your total before you message us</Heading>
            <Text color="muted" className="mb-4 max-w-lg">
              Pick a car and your dates. Weekly and monthly rates apply automatically, delivery is free, and the deposit is
              shown upfront. Then send the dates to us on WhatsApp in one tap.
            </Text>
          </div>
          <PriceCalculator
            cars={calculatorCars}
            initialSlug={HERO_CAR}
            src="calculator"
            depositRefundDays={settings.depositRefundDays}
            vatNote={vatNote(settings)}
          />
        </Container>
      </Section>

      <CategorySection
        id="everyday-cars"
        subtitle="Everyday and monthly"
        title="Practical, without feeling plain"
        description="Sedans and compact SUVs for a week or a month, with the monthly rate shown on every car."
        category="everyday"
        cars={cars}
        viewAllHref="/cars"
        ctaText={`See all ${cars.length} cars`}
      />

      <HowItWorks />

      <TestimonialsSection />

      <DeliveryAreas areas={settings.deliveryAreas} />

      <DocumentsSection settings={settings} />

      <FAQSection limit={6} />
    </>
  );
}
