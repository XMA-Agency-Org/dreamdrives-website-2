"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Heading, Text, Badge, Button, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { CarCard } from "@/components/sections/cars";
import cars from "@/data/cars-data";

type Car = (typeof cars)[0];

type CategoryId = "featured" | "exotic" | "suv" | "convertible" | "sports";

const categoryFilters: Record<CategoryId, (car: Car) => boolean> = {
  featured: (car) => car.isFeatured === true,
  exotic: (car) =>
    !car.isFeatured &&
    (car.brand === "lamborghini" ||
      car.brand === "ferrari" ||
      car.category === "supercar"),
  suv: (car) => !car.isFeatured && car.category === "suv",
  convertible: (car) => !car.isFeatured && car.category === "convertible",
  sports: (car) =>
    !car.isFeatured && (car.category === "sports" || car.brand === "porsche"),
};

interface CategorySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: CategoryId;
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
  viewAllHref = "/cars",
  alternateBackground = false,
  ctaText
}: CategorySectionProps) {
  const filterFn = categoryFilters[category];
  const filteredCars = cars
    .filter((car) => filterFn(car) && car.isAvailable)
    .slice(0, 4);

  if (filteredCars.length === 0) return null;

  return (
    <Section
      id={id}
      spacing="md"
      background={alternateBackground ? "elevated" : "default"}
      containerSize="none"
    >
      {/* Section Header */}
      <Container className="mb-12 text-center">
        {subtitle && (
          <Badge variant="outline" size="sm" font="display" className="mb-4">
            {subtitle}
          </Badge>
        )}
        <Heading as="h2" size="2xl" className="text-center mb-6">
          {title}
        </Heading>
        {description && (
          <Text color="muted" size="lg" className="max-w-2xl mx-auto">
            {description}
          </Text>
        )}
      </Container>

      {/* Car Grid - Carousel on mobile/tablet, grid on desktop */}
      <div className="max-lg:flex max-lg:gap-4 max-lg:overflow-x-auto max-lg:overflow-y-hidden max-lg:snap-x max-lg:snap-mandatory max-lg:scrollbar-hide max-lg:px-4 max-lg:pb-4 max-lg:scroll-pl-4">
        <Container className="max-lg:p-0 max-lg:max-w-none max-lg:contents">
          <div className="lg:grid lg:grid-cols-4 lg:gap-6 max-lg:contents">
            {filteredCars.map((car, index) => (
              <div key={car.id} className="max-lg:shrink-0 max-lg:w-72 max-lg:snap-start">
                <CarCard car={car} index={index} variant="standard-minimal" />
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* View All Link */}
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
