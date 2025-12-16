"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterGroup } from "@/components/ui";
import { CAR_BODY_TYPES, CAR_BRANDS, PRICE_RANGES } from "@/lib/constants";

export function CarsFilters() {
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

      router.push(`/cars?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-8">
      <FilterGroup
        title="Body Type"
        items={CAR_BODY_TYPES}
        value={currentCategory}
        onChange={(value) => updateFilter("category", value)}
        allOptionId="all"
      />

      <FilterGroup
        title="Brand"
        items={CAR_BRANDS}
        value={currentBrand}
        onChange={(value) => updateFilter("brand", value)}
        scrollable
      />

      <FilterGroup
        title="Daily Price"
        items={PRICE_RANGES}
        value={currentPriceRange}
        onChange={(value) => updateFilter("price", value)}
      />
    </div>
  );
}
