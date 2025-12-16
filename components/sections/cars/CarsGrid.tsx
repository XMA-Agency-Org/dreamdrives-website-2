"use client";

import { useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CarCard } from "./CarCard";
import { Heading, Pagination, Text } from "@/components/ui";
import cars from "@/data/cars-data";
import { PRICE_RANGES } from "@/lib/constants";

const CARS_PER_PAGE = 12;

type ViewMode = "grid" | "list";
type SortOption = "featured" | "price-low" | "price-high" | "name-asc" | "newest";

interface CarsGridProps {
  sortBy?: SortOption;
  viewMode?: ViewMode;
}

export function CarsGrid({ sortBy = "featured", viewMode = "grid" }: CarsGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category");
  const currentBrand = searchParams.get("brand");
  const currentPriceRange = searchParams.get("price");
  const searchQuery = searchParams.get("search");
  const currentPage = Number(searchParams.get("page")) || 1;

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => car.isAvailable);

    // Filter by category
    if (currentCategory) {
      result = result.filter((car) => car.category === currentCategory);
    }

    // Filter by brand
    if (currentBrand) {
      result = result.filter((car) => car.brand === currentBrand);
    }

    // Filter by price range
    if (currentPriceRange) {
      const range = PRICE_RANGES.find((r) => r.id === currentPriceRange);
      if (range) {
        result = result.filter(
          (car) =>
            car.pricing.daily >= range.min && car.pricing.daily <= range.max,
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.category.toLowerCase().includes(query),
      );
    }

    // Dynamic sorting based on sortBy
    return result.sort((a, b) => {
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
  }, [currentCategory, currentBrand, currentPriceRange, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * CARS_PER_PAGE;
    return filteredCars.slice(startIndex, startIndex + CARS_PER_PAGE);
  }, [filteredCars, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [currentPage, totalPages, searchParams, router, pathname]);

  if (filteredCars.length === 0) {
    return (
      <div className="text-center py-20">
        <Heading as="h3" size="md" className="mb-4">
          No cars found
        </Heading>
        <Text color="muted">
          Try adjusting your filters to find available vehicles.
        </Text>
      </div>
    );
  }

  return (
    <div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paginatedCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} variant="inline" />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-12"
      />
    </div>
  );
}
