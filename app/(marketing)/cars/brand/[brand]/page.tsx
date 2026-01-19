import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { PageHero } from "@/components/sections/shared";
import { StaticCarsGrid } from "@/components/sections/cars";
import {
  getCarsByBrandAsync,
  getAllBrandsWithCount,
  getBrandDisplayName,
} from "@/data/cars";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const brands = getAllBrandsWithCount();
  return brands.map((brand) => ({
    brand: brand.id,
  }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { brand } = await params;
  const brandName = getBrandDisplayName(brand);
  const cars = await getCarsByBrandAsync(brand);

  if (cars.length === 0) {
    return {
      title: "Brand Not Found",
    };
  }

  return {
    title: `Rent ${brandName} Cars in Dubai | Dream Drives`,
    description: `Browse our collection of ${cars.length} ${brandName} luxury vehicles available for rent in Dubai. Premium ${brandName} car rental with delivery.`,
    openGraph: {
      title: `${brandName} Car Rental Dubai | Dream Drives`,
      description: `Rent ${brandName} luxury cars in Dubai. ${cars.length} vehicles available.`,
      images: cars[0]?.images[0]?.src ? [cars[0].images[0].src] : [],
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const brandName = getBrandDisplayName(brand);
  const cars = await getCarsByBrandAsync(brand);

  if (cars.length === 0) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={`${brandName} Rental`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cars", href: "/cars" },
          { label: brandName },
        ]}
      />

      <Section spacing="none">
        <StaticCarsGrid
          cars={cars}
          emptyMessage={`No ${brandName} vehicles available`}
        />
      </Section>
    </>
  );
}
