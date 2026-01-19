"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Heading, Text, Badge, Button, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { CarCard } from "@/components/sections/cars";
import { cn } from "@/lib/utils";
import type { Car } from "@/types";

const categories = [
  { id: "all-cars", label: "All Cars" },
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "luxury", label: "Luxury" },
] as const;

const LUXURY_BRANDS = ["mercedes", "bmw", "range-rover", "lamborghini", "rolls-royce", "bentley", "ferrari", "porsche", "mclaren", "aston-martin"];

const categoryMapping: Record<string, (car: Car) => boolean> = {
  "all-cars": () => true,
  "sedan": (car) => car.category === "sedan",
  "suv": (car) => car.category === "suv",
  "luxury": (car) => LUXURY_BRANDS.includes(car.brand),
};

interface FeaturedCarsProps {
  cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all-cars");

  const filteredCars = cars
    .filter((car) => {
      const filterFn = categoryMapping[activeCategory];
      return filterFn ? filterFn(car) && car.isAvailable : car.isAvailable;
    })
    .slice(0, 9);

  return (
    <Section id="featured-cars" spacing="lg">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-12">
          <Badge variant="outline" size="sm" font="display" className="mb-4">
            Our Collection
          </Badge>
          <Heading as="h2" size="2xl" className="mb-6">
            Premium Cars
          </Heading>
          <Text color="muted" size="lg" className="max-w-2xl mx-auto">
            Discover our handpicked selection of the world&apos;s finest automobiles,
            ready to elevate your Dubai experience.
          </Text>
        </RevealOnScroll>

        {/* Category Tabs */}
        <RevealOnScroll className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === category.id
                    ? "bg-primary-500 text-neutral-950"
                    : "bg-background-elevated border border-border text-foreground-muted hover:border-primary-500/50 hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CarCard car={car} index={0} variant="compact" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <Text color="muted" size="lg">
              No cars found in this category.
            </Text>
          </div>
        )}

        {/* View All Link */}
        <RevealOnScroll className="mt-12 text-center">
          <Button as={Link} href="/cars" variant="outline" size="lg">
            View All Cars
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </RevealOnScroll>
    </Section>
  );
}
