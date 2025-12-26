"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Heading, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { CarCard } from "@/components/sections/cars";
import type { Car } from "@/types";

interface SimilarCarsProps {
  cars: Car[];
}

export function SimilarCars({ cars }: SimilarCarsProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  if (cars.length === 0) {
    return null;
  }

  return (
    <Section spacing="sm" background="default" border="top">
      <RevealOnScroll className="mb-10">
        <Heading as="h2" size="xl">
          Similar Vehicles
        </Heading>
      </RevealOnScroll>

      <div className="hidden lg:grid grid-cols-4 gap-6">
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

      <div className="lg:hidden -mx-4 sm:-mx-6 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-4 sm:px-6">
          {cars.map((car, index) => (
            <div key={car.id} className="flex-none w-72">
              <CarCard
                car={car}
                index={index}
                variant="standard-minimal"
                showBadge={false}
                showInquiryButton={false}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
