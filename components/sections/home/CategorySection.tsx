"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Heading, Text, Badge, Button } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { CarCard } from "@/components/sections/fleet";
import cars from "@/data/cars-data";

type Car = (typeof cars)[0];

type CategoryId = "luxury" | "exotic" | "suv" | "convertible" | "sports";

const categoryFilters: Record<CategoryId, (car: Car) => boolean> = {
  luxury: (car) =>
    car.brand === "rolls-royce" ||
    car.brand === "bentley" ||
    car.category === "luxury-sedan",
  exotic: (car) =>
    car.brand === "lamborghini" ||
    car.brand === "ferrari" ||
    car.category === "supercar",
  suv: (car) => car.category === "suv",
  convertible: (car) => car.category === "convertible",
  sports: (car) => car.category === "sports" || car.brand === "porsche",
};

interface CategorySectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: CategoryId;
  viewAllHref?: string;
  alternateBackground?: boolean;
}

export function CategorySection({
  id,
  title,
  subtitle,
  description,
  category,
  viewAllHref = "/fleet",
  alternateBackground = false,
}: CategorySectionProps) {
  const filterFn = categoryFilters[category];
  const filteredCars = cars
    .filter((car) => filterFn(car) && car.isAvailable)
    .slice(0, 9);

  if (filteredCars.length === 0) return null;

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 lg:py-24 ${
        alternateBackground ? "bg-background-elevated" : "bg-background"
      }`}
    >
      <Container>
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-12">
          <Badge variant="outline" size="sm" font="display" className="mb-4">
            {subtitle}
          </Badge>
          <Heading as="h2" size="2xl" className="mb-6">
            {title}
          </Heading>
          <Text color="muted" size="lg" className="max-w-2xl mx-auto">
            {description}
          </Text>
        </RevealOnScroll>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} variant="standard-minimal" />
          ))}
        </div>

        {/* View All Link */}
        <RevealOnScroll className="mt-12 text-center">
          <Button as={Link} href={viewAllHref} variant="outline" size="lg">
            View All {title}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
