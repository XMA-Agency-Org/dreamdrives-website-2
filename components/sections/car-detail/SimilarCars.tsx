"use client";

import { Heading, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { CarCard } from "@/components/sections/cars";
import type { Car } from "@/types";

interface SimilarCarsProps {
  cars: Car[];
}

export function SimilarCars({ cars }: SimilarCarsProps) {
  if (cars.length === 0) {
    return null;
  }

  return (
    <Section spacing="sm" background="elevated" border="top">
      <RevealOnScroll className="mb-10">
        <Heading as="h2" size="xl">
          Similar Vehicles
        </Heading>
      </RevealOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car, index) => (
          <CarCard
            key={car.id}
            car={car}
            index={index}
            variant="standard-minimal"
            showBadge={false}
            showInquiryButton={false}
          />
        ))}
      </div>
    </Section>
  );
}
