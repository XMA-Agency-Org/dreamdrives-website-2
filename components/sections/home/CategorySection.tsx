"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Container, Heading, Text, Badge, Button, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { CarCard } from "@/components/sections/cars";
import type { Car } from "@/types";

type CategoryId = "featured" | "statement" | "family" | "suv" | "sedan" | "everyday";

/** Rows follow the four buyer jobs (knowledge/CLIENT_PROFILE.md): statement, family arrival, everyday/monthly. */
const categoryFilters: Record<CategoryId, (car: Car) => boolean> = {
  featured: (car) => car.isFeatured === true,
  statement: (car) => car.brand === "lamborghini" || /g63|g-class/i.test(car.slug),
  family: (car) => car.specs.seats >= 7,
  suv: (car) => car.category === "suv",
  sedan: (car) => car.category === "sedan",
  everyday: (car) => car.pricing.daily <= 350,
};

interface CategorySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: CategoryId;
  cars: Car[];
  viewAllHref?: string;
  alternateBackground?: boolean;
  ctaText?: string;
}

export function CategorySection({
  id,
  title,
  subtitle,
  description,
  category,
  cars,
  viewAllHref = "/cars",
  alternateBackground = false,
  ctaText
}: CategorySectionProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const filterFn = categoryFilters[category];
  // Statement and family rows lead with the top of the range; everyday leads with the cheapest.
  const dir = category === "everyday" ? 1 : -1;
  const filteredCars = cars
    .filter((car) => filterFn(car) && car.isAvailable)
    .sort((a, b) => dir * (a.pricing.daily - b.pricing.daily))
    .slice(0, 3);

  if (filteredCars.length === 0) return null;

  return (
    <Section
      id={id}
      spacing="md"
      background={alternateBackground ? "elevated" : "default"}
      containerSize="none"
    >
      <Container className="mb-12 text-center">
        {subtitle && (
          <Badge variant="outline" size="sm" font="display" className="mb-4">
            {subtitle}
          </Badge>
        )}
        <Heading as="h2" size="lg" className="text-center mb-6">
          {title}
        </Heading>
        {description && (
          <Text color="muted" size="lg" className="max-w-2xl mx-auto">
            {description}
          </Text>
        )}
      </Container>

      {/* Desktop Grid */}
      <Container className="hidden lg:block">
        <div className="grid grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} variant="standard-minimal" />
          ))}
        </div>
      </Container>

      {/* Mobile/Tablet Carousel */}
      <div className="lg:hidden overflow-hidden px-4" ref={emblaRef}>
        <div className="flex gap-4">
          {filteredCars.map((car, index) => (
            <div key={car.id} className="flex-none w-72">
              <CarCard car={car} index={index} variant="standard-minimal" />
            </div>
          ))}
        </div>
      </div>

      <Container>
        <RevealOnScroll className="mt-12 text-center">
          <Button as={Link} href={viewAllHref} variant="outline" size="lg">
            {ctaText || "View All"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
