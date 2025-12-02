"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button, Text, FilterGroup } from "@/components/ui";
import { CAR_CATEGORIES, CAR_BRANDS, PRICE_RANGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FleetFiltersProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function FleetFilters({ isOpen, onClose }: FleetFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentBrand = searchParams.get("brand");
  const currentPriceRange = searchParams.get("price");

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.push(`/fleet?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const clearAllFilters = useCallback(() => {
    router.push("/fleet", { scroll: false });
  }, [router]);

  const hasActiveFilters = currentCategory || currentBrand || currentPriceRange;

  return (
    <aside
      className={cn(
        "lg:sticky lg:top-24 space-y-8",
        isOpen ? "block" : "hidden lg:block"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary-500" />
          <Text weight="semibold" size="lg">
            Filters
          </Text>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <FilterGroup
        title="Category"
        items={CAR_CATEGORIES}
        value={currentCategory}
        onChange={(value) => updateFilter("category", value)}
        allOptionId="all"
      />

      {/* Brand Filter */}
      <FilterGroup
        title="Brand"
        items={CAR_BRANDS}
        value={currentBrand}
        onChange={(value) => updateFilter("brand", value)}
        scrollable
      />

      {/* Price Range Filter */}
      <FilterGroup
        title="Daily Price"
        items={PRICE_RANGES}
        value={currentPriceRange}
        onChange={(value) => updateFilter("price", value)}
      />

      {/* Close button for mobile */}
      {onClose && (
        <Button onClick={onClose} variant="secondary" className="w-full lg:hidden">
          Apply Filters
        </Button>
      )}
    </aside>
  );
}
