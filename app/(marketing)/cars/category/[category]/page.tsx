import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { PageHero } from "@/components/sections/shared";
import { StaticCarsGrid } from "@/components/sections/cars";
import { getAllCarsAsync, getFeaturedCarsAsync } from "@/data/cars";
import { CAR_CATEGORIES } from "@/lib/constants";
import type { Car } from "@/types";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return CAR_CATEGORIES.filter((cat) => cat.id !== "all").map((cat) => ({
    category: cat.id,
  }));
}

function getCategoryLabel(categoryId: string): string {
  const category = CAR_CATEGORIES.find((c) => c.id === categoryId);
  return category?.label || categoryId;
}

async function getCarsByMarketingCategory(categoryId: string): Promise<Car[]> {
  const allCars = await getAllCarsAsync();
  const featuredCars = await getFeaturedCarsAsync();

  switch (categoryId) {
    case "luxury":
      return allCars.filter((car) => car.pricing.daily >= 2000);
    case "business":
      return allCars.filter(
        (car) =>
          car.category === "sedan" ||
          (car.pricing.daily >= 500 && car.pricing.daily < 2000),
      );
    case "economy":
      return allCars.filter((car) => car.pricing.daily < 500);
    case "popular":
      return featuredCars;
    case "new-arrivals":
      return allCars.filter((car) => car.year >= 2024);
    case "special-offers":
      return allCars.filter((car) => car.isFeatured);
    default:
      return [];
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryLabel = getCategoryLabel(category);
  const cars = await getCarsByMarketingCategory(category);

  return {
    title: `${categoryLabel} Cars for Rent in Dubai | Dream Drives`,
    description: `Browse our ${categoryLabel.toLowerCase()} car collection. ${cars.length} vehicles available for rent in Dubai with premium service.`,
    openGraph: {
      title: `${categoryLabel} Car Rental Dubai | Dream Drives`,
      description: `Rent ${categoryLabel.toLowerCase()} cars in Dubai. ${cars.length} vehicles available.`,
      images: cars[0]?.images[0]?.src ? [cars[0].images[0].src] : [],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryLabel = getCategoryLabel(category);
  const cars = await getCarsByMarketingCategory(category);

  if (cars.length === 0) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={`${categoryLabel} Vehicles`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cars", href: "/cars" },
          { label: categoryLabel },
        ]}
      />

      <Section spacing="none">
        <StaticCarsGrid
          cars={cars}
          emptyMessage={`No ${categoryLabel.toLowerCase()} vehicles available`}
        />
      </Section>
    </>
  );
}
