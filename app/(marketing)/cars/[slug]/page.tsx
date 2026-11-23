import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Heading, Text, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import {
  CarHero,
  CarGallery,
  CarSpecs,
  PriceCalculator,
  IncludedBox,
  SimilarCars,
} from "@/components/sections/car";
import { getCarBySlugAsync, getSimilarCarsAsync, getAllCarsAsync } from "@/data/cars";
import { getSiteSettings, ratingLine, vatNote } from "@/data/settings";
import { JsonLd, carLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { aed } from "@/lib/pricing";
import { BookButton } from "@/components/booking";

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 3600;

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
    title: `Rent ${car.name} in Dubai | AED ${car.pricing.daily.toLocaleString("en-US")}/day`,
    description: `Rent the ${car.name} in Dubai for AED ${car.pricing.daily.toLocaleString("en-US")} a day. Free delivery anywhere in Dubai. Message us on WhatsApp to book.`,
    alternates: { canonical: `/cars/${car.slug}` },
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

  const [similarCars, settings] = await Promise.all([getSimilarCarsAsync(car, 4), getSiteSettings()]);
  const rating = ratingLine(settings);
  const facts = [
    car.variant && car.variant !== car.name ? car.variant : null,
    car.specs.seats ? `${car.specs.seats} seats` : null,
    settings.freeDelivery ?? null,
    rating,
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={carLd(car)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Cars", path: "/cars" }, { name: car.name, path: `/cars/${car.slug}` }])} />
      <CarHero car={car} />

      <Section spacing="none" containerSize="none" className="mb-16">
        <Container>
          <header className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
            <Heading as="h1" size="lg" className="mb-2">
              Rent the {car.name} in Dubai
            </Heading>
            <Text color="muted">
              <span className="text-foreground font-semibold">{aed(car.pricing.daily)} a day</span>
              {facts.length ? ` · ${facts.join(" · ")}` : ""}
            </Text>
            </div>
            <BookButton car={car.slug} src="car_detail" className="self-start sm:self-auto">Book this car</BookButton>
          </header>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8 lg:space-y-12">
              <CarGallery images={car.images} carName={car.name} />

              {/* Price box: inline on mobile, sticky column on desktop */}
              <div className="lg:hidden">
                <PriceCalculator cars={[car]} src="car_detail" depositRefundDays={settings.depositRefundDays} vatNote={vatNote(settings)} />
              </div>

              <IncludedBox car={car} settings={settings} />

              {car.description && (
                <div>
                  <Heading as="h2" size="md" className="mb-4">
                    About the {car.name}
                  </Heading>
                  <Text color="muted" className="leading-relaxed whitespace-pre-line">
                    {car.description}
                  </Text>
                </div>
              )}
              <RevealOnScroll>
                <CarSpecs specs={car.specs} />
              </RevealOnScroll>
              {car.features.length > 0 && (
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
              )}

              {(car.color || car.interiorColor) && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {car.color && (
                    <div className="p-4 rounded-xl bg-background-elevated border border-border">
                      <Text size="xs" color="muted" className="uppercase tracking-wider mb-1">Exterior colour</Text>
                      <Text weight="semibold">{car.color}</Text>
                    </div>
                  )}
                  {car.interiorColor && (
                    <div className="p-4 rounded-xl bg-background-elevated border border-border">
                      <Text size="xs" color="muted" className="uppercase tracking-wider mb-1">Interior</Text>
                      <Text weight="semibold">{car.interiorColor}</Text>
                    </div>
                  )}
                </div>
              )}
            </div>

            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <PriceCalculator cars={[car]} src="car_detail" depositRefundDays={settings.depositRefundDays} vatNote={vatNote(settings)} />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <SimilarCars cars={similarCars} />
    </>
  );
}
