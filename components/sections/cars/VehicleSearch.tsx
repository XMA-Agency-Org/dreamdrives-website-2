"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Car as CarIcon,
  Building2,
  Tag,
  ArrowRight,
} from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CAR_BRANDS, CAR_BODY_TYPES } from "@/lib/constants";
import { trackCarFilter } from "@/lib/analytics";
import type { Car } from "@/types";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "vehicle" | "brand" | "category";
  category?: string;
  price?: number;
}

interface VehicleSearchProps {
  cars: Car[];
  className?: string;
}

export function VehicleSearch({ cars, className }: VehicleSearchProps) {
  const popularSearches = useMemo(() => {
    const results: string[] = [];

    const supercars = cars
      .filter((car) => car.isAvailable && car.category === "supercar")
      .slice(0, 3)
      .map((car) => car.name);
    results.push(...supercars);

    const sportsCars = cars
      .filter((car) => car.isAvailable && car.category === "sports")
      .slice(0, 3)
      .map((car) => car.name);
    results.push(...sportsCars);

    const convertibles = cars
      .filter((car) => car.isAvailable && car.category === "convertible")
      .slice(0, 2)
      .map((car) => car.name);
    results.push(...convertibles);

    const suvs = cars
      .filter((car) => car.isAvailable && car.category === "suv")
      .slice(0, 1)
      .map((car) => car.name);
    results.push(...suvs);

    return results;
  }, [cars]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("vehicle-search-history");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Get initial query from URL
  useEffect(() => {
    const urlQuery = searchParams.get("search");
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const queryLower = query.toLowerCase();

      // Search vehicles
      const vehicleMatches = cars
        .filter((car) => car.isAvailable)
        .filter(
          (car) =>
            car.name.toLowerCase().includes(queryLower) ||
            car.brand.toLowerCase().includes(queryLower) ||
            car.category.toLowerCase().includes(queryLower)
        )
        .slice(0, 6)
        .map((car) => ({
          id: car.id,
          text: car.name,
          type: "vehicle" as const,
          category: car.category,
          price: car.pricing.daily,
        }));

      // Search brands
      const brandMatches = CAR_BRANDS.filter((brand) =>
        brand.label.toLowerCase().includes(queryLower)
      )
        .slice(0, 3)
        .map((brand) => ({
          id: brand.id,
          text: brand.label,
          type: "brand" as const,
        }));

      // Search body types
      const categoryMatches = CAR_BODY_TYPES.filter(
        (cat) =>
          cat.id !== "all" && cat.label.toLowerCase().includes(queryLower)
      )
        .slice(0, 2)
        .map((cat) => ({
          id: cat.id,
          text: cat.label,
          type: "category" as const,
        }));

      setSuggestions([...vehicleMatches, ...brandMatches, ...categoryMatches]);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      // Track the search
      trackCarFilter({ filterType: "search", filterValue: searchQuery });

      // Add to search history
      const newHistory = [
        searchQuery,
        ...searchHistory.filter((h) => h !== searchQuery),
      ].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem(
        "vehicle-search-history",
        JSON.stringify(newHistory)
      );

      // Navigate with search query
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", searchQuery);
      router.push(`/cars?${params.toString()}`);

      setIsOpen(false);
      inputRef.current?.blur();
    },
    [searchHistory, searchParams, router]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      setQuery(suggestion.text);

      if (suggestion.type === "brand") {
        const brandId = CAR_BRANDS.find(
          (b) => b.label.toLowerCase() === suggestion.text.toLowerCase()
        )?.id;
        if (brandId) {
          trackCarFilter({ filterType: "brand", filterValue: brandId });
          const params = new URLSearchParams(searchParams.toString());
          params.set("brand", brandId);
          params.delete("search");
          router.push(`/cars?${params.toString()}`);
        }
      } else if (suggestion.type === "category") {
        const categoryId = CAR_BODY_TYPES.find(
          (c) => c.label.toLowerCase() === suggestion.text.toLowerCase()
        )?.id;
        if (categoryId) {
          trackCarFilter({ filterType: "category", filterValue: categoryId });
          const params = new URLSearchParams(searchParams.toString());
          params.set("category", categoryId);
          params.delete("search");
          router.push(`/cars?${params.toString()}`);
        }
      } else {
        handleSearch(suggestion.text);
      }
    },
    [searchParams, router, handleSearch]
  );

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("vehicle-search-history");
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      const totalItems =
        suggestions.length +
        (query.length === 0
          ? popularSearches.length + searchHistory.length
          : 0);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % totalItems);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            handleSuggestionClick(suggestions[selectedIndex]);
          } else {
            handleSearch(query);
          }
          break;
        case "Escape":
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [
      isOpen,
      selectedIndex,
      suggestions,
      query,
      searchHistory,
      popularSearches.length,
      handleSearch,
      handleSuggestionClick,
    ]
  );

  // Highlight match in text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <mark
            key={index}
            className="bg-primary-500/20 text-primary-300 rounded px-0.5"
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  const showDropdown =
    isOpen &&
    (suggestions.length > 0 || searchHistory.length > 0 || query.length === 0);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle z-10">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by car name, brand, or category..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            className="w-full pl-11 h-12 bg-input-bg border border-border text-foreground placeholder:text-foreground-subtle transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIndex(-1);
                // Only navigate if we're on the cars page, otherwise just clear locally
                if (pathname === "/cars") {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("search");
                  router.push(`/cars?${params.toString()}`);
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-surface-hover rounded transition-colors text-foreground-subtle hover:text-foreground cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-background-elevated border border-border rounded-xl shadow-2xl z-[200] max-h-[400px] overflow-y-auto"
          >
            {/* Popular Searches - shown when input is empty */}
            {query.length === 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-foreground-muted" />
                  <span className="text-sm font-semibold text-foreground">
                    Popular Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((popular, index) => (
                    <button
                      key={popular}
                      onClick={() => {
                        setQuery(popular);
                        handleSearch(popular);
                      }}
                      className={cn(
                        "px-3 py-2 text-sm rounded-full transition-colors duration-200 border cursor-pointer",
                        selectedIndex === index
                          ? "bg-primary-500/20 border-primary-500/50 text-primary-300"
                          : "bg-surface border-border text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                      )}
                    >
                      {popular}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search History - shown when input is empty and history exists */}
            {query.length === 0 && searchHistory.length > 0 && (
              <div className="border-t border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-foreground-muted" />
                    <span className="text-sm font-semibold text-foreground">
                      Recent Searches
                    </span>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-foreground-muted hover:text-primary-500 font-medium transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1">
                  {searchHistory.map((historyItem, index) => {
                    const historyIndex = popularSearches.length + index;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(historyItem);
                          handleSearch(historyItem);
                        }}
                        className={cn(
                          "w-full text-left p-3 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group cursor-pointer",
                          selectedIndex === historyIndex
                            ? "bg-primary-500/20 border border-primary-500/50"
                            : "hover:bg-surface-hover border border-transparent"
                        )}
                      >
                        <Clock className="w-4 h-4 text-foreground-muted group-hover:text-primary-500 transition-colors flex-shrink-0" />
                        <span className="text-foreground-muted group-hover:text-foreground transition-colors">
                          {historyItem}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Search Suggestions - shown when typing */}
            {query.length > 0 && (
              <div className="p-4">
                {suggestions.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="w-4 h-4 text-foreground-muted" />
                      <span className="text-sm font-semibold text-foreground">
                        Search Results
                      </span>
                      <span className="text-xs text-foreground-muted bg-background px-2 py-1 rounded-full">
                        {suggestions.length}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {suggestions.map((suggestion, index) => {
                        const IconComponent =
                          suggestion.type === "vehicle"
                            ? CarIcon
                            : suggestion.type === "brand"
                            ? Building2
                            : Tag;
                        return (
                          <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={cn(
                              "w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 group cursor-pointer",
                              selectedIndex === index
                                ? "bg-primary-500/20 border border-primary-500/50"
                                : "hover:bg-surface-hover border border-transparent"
                            )}
                          >
                            <div className="flex-shrink-0 p-2 bg-background rounded-lg group-hover:bg-primary-500/20 transition-colors">
                              <IconComponent className="w-4 h-4 text-foreground-muted group-hover:text-primary-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground truncate">
                                {highlightMatch(suggestion.text, query)}
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                {suggestion.type === "vehicle" &&
                                  suggestion.category && (
                                    <span className="text-xs text-foreground-muted bg-background px-2 py-0.5 rounded-full">
                                      {suggestion.category}
                                    </span>
                                  )}
                                {suggestion.type === "brand" && (
                                  <span className="text-xs text-foreground-muted bg-primary-500/20 text-primary-300 px-2 py-0.5 rounded-full">
                                    Brand
                                  </span>
                                )}
                                {suggestion.type === "category" && (
                                  <span className="text-xs text-foreground-muted bg-primary-500/20 text-primary-300 px-2 py-0.5 rounded-full">
                                    Category
                                  </span>
                                )}
                                {suggestion.price && (
                                  <span className="text-xs text-foreground-muted">
                                    AED {suggestion.price.toLocaleString()}/day
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary-500 transition-colors opacity-0 group-hover:opacity-100" />
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-background rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-foreground-muted" />
                    </div>
                    <p className="text-sm text-foreground-muted mb-2">
                      No vehicles found for &quot;{query}&quot;
                    </p>
                    <p className="text-xs text-foreground-subtle">
                      Try searching for a different brand, model, or category
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
