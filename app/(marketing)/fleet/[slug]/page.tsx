import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import {
  CarHero,
  CarGallery,
  CarSpecs,
  PricingCard,
  SimilarCars,
} from "@/components/sections/car-detail";
import { getCarBySlug, getSimilarCars } from "@/data/cars";
import cars from "@/data/cars-data";

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all cars
export async function generateStaticParams() {
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

// Generate metadata for each car
export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `Rent ${car.name} in Dubai`,
    description: `${car.description} Available for rent starting from ${car.pricing.daily} AED/day.`,
    openGraph: {
      title: `Rent ${car.name} in Dubai | Uptown`,
      description: car.tagline,
      images: car.images[0]?.src ? [car.images[0].src] : [],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const similarCars = getSimilarCars(car, 4);

  return (
    <>
      {/* Hero Section */}
      <CarHero car={car} />

      {/* Main Content */}
      <section className="py-16 bg-background">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Gallery and Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Gallery */}
              <RevealOnScroll>
                <CarGallery images={car.images} carName={car.name} />
              </RevealOnScroll>

              {/* Description */}
              <RevealOnScroll>
                <div>
                  <Heading as="h2" size="md" className="mb-4">
                    About This Vehicle
                  </Heading>
                  <Text color="muted" className="leading-relaxed">
                    {car.description}
                  </Text>
                </div>
              </RevealOnScroll>

              {/* Specifications */}
              <RevealOnScroll>
                <CarSpecs specs={car.specs} />
              </RevealOnScroll>

              {/* Features */}
              <RevealOnScroll>
                <div>
                  <Heading as="h2" size="md" className="mb-6">
                    Features
                  </Heading>
                  <div className="grid grid-cols-2 gap-3">
                    {car.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background-elevated border border-border"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                        <Text size="sm">{feature}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Color Info */}
              <RevealOnScroll>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background-elevated border border-border">
                    <Text
                      size="xs"
                      color="muted"
                      className="uppercase tracking-wider mb-1"
                    >
                      Exterior Color
                    </Text>
                    <Text weight="semibold">{car.color}</Text>
                  </div>
                  <div className="p-4 rounded-xl bg-background-elevated border border-border">
                    <Text
                      size="xs"
                      color="muted"
                      className="uppercase tracking-wider mb-1"
                    >
                      Interior
                    </Text>
                    <Text weight="semibold">{car.interiorColor}</Text>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column - Pricing Card */}
            <div className="lg:col-span-1">
              <PricingCard
                pricing={car.pricing}
                carName={car.name}
                carYear={car.year}
                features={car.features}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Similar Cars */}
      <SimilarCars cars={similarCars} />
    </>
  );
}
