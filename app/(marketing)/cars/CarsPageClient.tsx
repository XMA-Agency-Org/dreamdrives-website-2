"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, ChevronDown, LayoutGrid, List } from "lucide-react";
import { Button, Drawer, Heading } from "@/components/ui";
import { CarsFilters, CarsGrid } from "@/components/sections/cars";
import { cn } from "@/lib/utils";
import type { Car } from "@/types";

type ViewMode = "grid" | "list";
type SortOption = "featured" | "price-low" | "price-high" | "name-asc" | "newest";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Recommended" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A to Z" },
  { id: "newest", label: "Newest First" },
];

interface CarsPageClientProps {
  cars: Car[];
}

export function CarsPageClient({ cars }: CarsPageClientProps) {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const sortRef = useRef<HTMLDivElement>(null);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.id === sortBy)?.label || "Recommended";

  const handleClearFilters = () => {
    router.push("/cars", { scroll: false });
    setIsFilterOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Header Row: Title + Controls */}
      <div className="flex items-center justify-between gap-4 mb-8 pt-8">
        <Heading as="h1" size="2xl">
          Our Fleet
        </Heading>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Sort Dropdown */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              {currentSortLabel}
              <ChevronDown className={cn("w-4 h-4 transition-transform", isSortOpen && "rotate-180")} />
            </button>
            {isSortOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-background-elevated border border-border rounded-md shadow-lg z-20">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsSortOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm transition-colors",
                      sortBy === option.id
                        ? "bg-primary-500/10 text-primary-500"
                        : "text-foreground-muted hover:bg-neutral-800 hover:text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border hover:border-foreground-muted rounded-md transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            FILTER
          </button>

          {/* Layout Toggle */}
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

      {/* Mobile Filter Button - Fixed */}
      <div className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
        <Button
          onClick={() => setIsFilterOpen(true)}
          leftIcon={<SlidersHorizontal className="w-4 h-4" />}
          className="shadow-lg"
        >
          Filters
        </Button>
      </div>

      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filters"
        side="right"
        footer={
          <div className="flex gap-3">
            <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
              Show Results
            </Button>
            <Button onClick={handleClearFilters} variant="outline" className="flex-1">
              Clear All
            </Button>
          </div>
        }
      >
        <CarsFilters />
      </Drawer>

      {/* Car Grid */}
      <CarsGrid cars={cars} sortBy={sortBy} viewMode={viewMode} />
    </div>
  );
}
