"use client";

import { useState, useMemo, useCallback } from "react";
import { CarCard } from "./CarCard";
import { Heading, Pagination, Text } from "@/components/ui";
import type { Car } from "@/types";

const CARS_PER_PAGE = 12;

type SortOption = "featured" | "price-low" | "price-high" | "name-asc" | "newest";

interface StaticCarsGridProps {
  cars: Car[];
  emptyMessage?: string;
}

export function StaticCarsGrid({
  cars,
  emptyMessage = "No cars found",
}: StaticCarsGridProps) {
  const [sortBy] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedCars = useMemo(() => {
    return [...cars].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricing.daily - b.pricing.daily;
        case "price-high":
          return b.pricing.daily - a.pricing.daily;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "newest":
          return b.year - a.year;
        case "featured":
        default:
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.pricing.daily - a.pricing.daily;
      }
    });
  }, [cars, sortBy]);

  const totalPages = Math.ceil(sortedCars.length / CARS_PER_PAGE);
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * CARS_PER_PAGE;
    return sortedCars.slice(startIndex, startIndex + CARS_PER_PAGE);
  }, [sortedCars, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (sortedCars.length === 0) {
    return (
      <div className="text-center py-20">
        <Heading as="h3" size="md" className="mb-4">
          {emptyMessage}
        </Heading>
        <Text color="muted">
          Try browsing our full collection for available vehicles.
        </Text>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} variant="standard" />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-12"
      />
    </div>
  );
}
