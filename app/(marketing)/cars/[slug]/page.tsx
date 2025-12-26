import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Heading, Text, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import {
  CarHero,
  CarGallery,
  CarSpecs,
  PricingCard,
  SimilarCars,
} from "@/components/sections/car";
import { getCarBySlugAsync, getSimilarCarsAsync, getAllCarsAsync } from "@/data/cars";

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cars = await getAllCarsAsync();
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlugAsync(slug);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `Rent ${car.name} in Dubai`,
    description: `${car.description} Available for rent starting from ${car.pricing.daily} AED/day.`,
    openGraph: {
      title: `Rent ${car.name} in Dubai | Dream Drives`,
      description: car.tagline,
      images: car.images[0]?.src ? [car.images[0].src] : [],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = await getCarBySlugAsync(slug);

  if (!car) {
    notFound();
  }

  const similarCars = await getSimilarCarsAsync(car, 4);

  return (
    <>
      <CarHero car={car} />

      <Section spacing="none" containerSize="none" className="mb-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8 lg:space-y-12">
              <CarGallery images={car.images} carName={car.name} />

              {/* Pricing Card - Mobile only */}
              <div className="lg:hidden">
                <PricingCard car={car} />
              </div>

              <div>
                <Heading as="h2" size="md" className="mb-4">
                  About This Vehicle
                </Heading>
                <Text color="muted" className="leading-relaxed">
                  {car.description}
                </Text>
              </div>
              <RevealOnScroll>
                <CarSpecs specs={car.specs} />
              </RevealOnScroll>
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

            {/* Pricing Card - Desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <PricingCard car={car} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Similar Cars */}
      <SimilarCars cars={similarCars} />
    </>
  );
}
