import type { Metadata } from "next";
import {
  HeroSection,
  MarqueeStrip,
  CollectionShowcase,
  SignatureSection,
  StandardBento,
  ClosingCTA,
  HowItWorks,
  DeliveryAreas,
  DocumentsSection,
  TestimonialsSection,
} from "@/components/sections/home";
import { FAQSection } from "@/components/sections/shared";
import { faqData } from "@/data/faqs";
import { PriceCalculator } from "@/components/sections/car";
import { Reveal } from "@/components/brand";
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
  // The calculator offers the premium range first; everyday cars stay a choice further down the list.
  const calculatorCars = [...cars].sort((a, b) => b.pricing.daily - a.pricing.daily);

  return (
    <>
      <JsonLd data={businessLd(settings)} />
      <JsonLd data={faqLd(faqData.slice(0, 6))} />

      <HeroSection car={heroCar} rating={ratingLine(settings)} />
      <MarqueeStrip />
      <CollectionShowcase cars={cars} />
      <SignatureSection />
      <StandardBento settings={settings} />

      <section id="price-calculator" className="scroll-mt-24 py-28 sm:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-6">Your total, upfront</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] text-foreground sm:text-6xl">
              See the price<span className="block text-foreground-muted">before you ask.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground-muted">
              Choose the car and your dates. Weekly and monthly rates apply on their own, delivery is free, and the deposit is
              shown before you message us.
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
            <div className="bezel">
              <PriceCalculator
                cars={calculatorCars}
                initialSlug={HERO_CAR}
                src="calculator"
                depositRefundDays={settings.depositRefundDays}
                vatNote={vatNote(settings)}
                className="rounded-[calc(2rem-0.375rem)] border-0 p-6 sm:p-8"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <HowItWorks />
      <TestimonialsSection />
      <DeliveryAreas areas={settings.deliveryAreas} />
      <DocumentsSection settings={settings} />
      <FAQSection limit={6} />
      <ClosingCTA />
    </>
  );
}
