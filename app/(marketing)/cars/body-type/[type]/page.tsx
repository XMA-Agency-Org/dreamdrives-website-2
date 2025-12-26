import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { PageHero } from "@/components/sections/shared";
import { StaticCarsGrid } from "@/components/sections/cars";
import { getCarsByBodyTypeAsync } from "@/data/cars";
import { CAR_BODY_TYPES } from "@/lib/constants";

interface BodyTypePageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return CAR_BODY_TYPES.filter((type) => type.id !== "all").map((type) => ({
    type: type.id,
  }));
}

function getBodyTypeLabel(typeId: string): string {
  const bodyType = CAR_BODY_TYPES.find((t) => t.id === typeId);
  return bodyType?.label || typeId;
}

export async function generateMetadata({
  params,
}: BodyTypePageProps): Promise<Metadata> {
  const { type } = await params;
  const typeLabel = getBodyTypeLabel(type);
  const cars = await getCarsByBodyTypeAsync(type);

  if (cars.length === 0) {
    return {
      title: "Body Type Not Found",
    };
  }

  return {
    title: `Rent ${typeLabel} in Dubai | Dream Drives`,
    description: `Browse our collection of ${cars.length} ${typeLabel.toLowerCase()} available for rent in Dubai. Premium ${typeLabel.toLowerCase()} rental with delivery.`,
    openGraph: {
      title: `${typeLabel} Rental Dubai | Dream Drives`,
      description: `Rent luxury ${typeLabel.toLowerCase()} in Dubai. ${cars.length} vehicles available.`,
      images: cars[0]?.images[0]?.src ? [cars[0].images[0].src] : [],
    },
  };
}

export default async function BodyTypePage({ params }: BodyTypePageProps) {
  const { type } = await params;
  const typeLabel = getBodyTypeLabel(type);
  const cars = await getCarsByBodyTypeAsync(type);

  if (cars.length === 0) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={`${typeLabel} Rental`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cars", href: "/cars" },
          { label: typeLabel },
        ]}
      />

      <StaticCarsGrid
        cars={cars}
        emptyMessage={`No ${typeLabel.toLowerCase()} available`}
      />
    </>
  );
}
