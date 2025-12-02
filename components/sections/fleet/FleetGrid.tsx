"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import { CarCard } from "./CarCard";
import { Text, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";
import cars from "@/data/cars-data";
import { PRICE_RANGES } from "@/lib/constants";

type ViewMode = "grid" | "list";
type SortOption = "featured" | "price-low" | "price-high" | "name-asc" | "newest";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A to Z" },
  { id: "newest", label: "Newest First" },
];

export function FleetGrid() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const currentCategory = searchParams.get("category");
  const currentBrand = searchParams.get("brand");
  const currentPriceRange = searchParams.get("price");
  const searchQuery = searchParams.get("search");

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
            car.pricing.daily >= range.min && car.pricing.daily <= range.max
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
          car.category.toLowerCase().includes(query)
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
      {/* Header: Results count + Sort + View toggle */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <Text color="muted" className="shrink-0">
          Showing{" "}
          <span className="text-foreground font-medium">
            {filteredCars.length}
          </span>{" "}
          {filteredCars.length === 1 ? "vehicle" : "vehicles"}
        </Text>

        <div className="flex items-center gap-4">
          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <Text size="sm" color="muted" className="hidden sm:block">
              Sort:
            </Text>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-background-elevated border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary-500 cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-background-elevated border border-border rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-sm transition-colors",
                viewMode === "grid"
                  ? "bg-primary-500 text-neutral-950"
                  : "text-foreground-muted hover:text-foreground hover:bg-neutral-800"
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-sm transition-colors",
                viewMode === "list"
                  ? "bg-primary-500 text-neutral-950"
                  : "text-foreground-muted hover:text-foreground hover:bg-neutral-800"
              )}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              index={index}
              variant="standard"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              index={index}
              variant="inline"
            />
          ))}
        </div>
      )}
    </div>
  );
}
