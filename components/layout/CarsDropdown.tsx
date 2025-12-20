"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, Text } from "@/components/ui";
import { brands } from "@/data/brands";
import { getAllBrandsWithCount, getCarCountByCategory } from "@/data/cars";
import { CAR_BODY_TYPES, CAR_CATEGORIES } from "@/lib/constants";
import {
  RollsRoyceIconDark,
  LamborghiniIconDark,
  FerrariIconDark,
  BentleyIconDark,
  MBIconDark,
  BMWIconDark,
  PorscheIconDark,
  LandroverIconDark,
  AudiIconDark,
  MclarenIconDark,
  AstonMartinIconDark,
  ChevroletIconDark,
  CadillacIconDark,
  MiniIconDark,
  GMCIconDark,
  NissanIconDark,
  MaseratiIconDark,
} from "@cardog-icons/react";

const brandIconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "rolls-royce": RollsRoyceIconDark,
  lamborghini: LamborghiniIconDark,
  ferrari: FerrariIconDark,
  bentley: BentleyIconDark,
  mercedes: MBIconDark,
  bmw: BMWIconDark,
  porsche: PorscheIconDark,
  "range-rover": LandroverIconDark,
  audi: AudiIconDark,
  mclaren: MclarenIconDark,
  "aston-martin": AstonMartinIconDark,
  chevrolet: ChevroletIconDark,
  cadillac: CadillacIconDark,
  mini: MiniIconDark,
  gmc: GMCIconDark,
  nissan: NissanIconDark,
  maserati: MaseratiIconDark,
};

interface CarsDropdownProps {
  className?: string;
  isScrolled?: boolean;
}

export function CarsDropdown({ className, isScrolled = true }: CarsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const allBrandsWithCount = useMemo(() => getAllBrandsWithCount(), []);
  const bodyTypeCounts = useMemo(() => getCarCountByCategory(), []);

  const filteredBrands = useMemo(() => {
    if (!searchQuery) return allBrandsWithCount;
    return allBrandsWithCount.filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allBrandsWithCount, searchQuery]);

  const getBrandLogo = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand?.logo;
  };

  const getBrandInvert = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand?.invert;
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setSearchQuery("");
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div
      ref={dropdownRef}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors duration-200",
          isOpen
            ? "text-primary-500"
            : isScrolled
              ? "text-foreground-muted hover:text-foreground"
              : "text-white/80 hover:text-white",
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Cars
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] p-6 bg-background-elevated border border-border rounded-md"
          >
            <div className="grid grid-cols-3 gap-6">
              {/* Column 1: Brands */}
              <div className="space-y-3">
                <Text
                  as="span"
                  size="xs"
                  weight="semibold"
                  color="muted"
                  className="uppercase tracking-wider px-2"
                >
                  Brands
                </Text>

                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background-subtle"
                  size="sm"
                  leftIcon={<Search className="w-4 h-4" />}
                />

                <div className="space-y-1 max-h-[280px] overflow-y-auto scrollbar-hide">
                  {filteredBrands.map((brand) => {
                    const logo = getBrandLogo(brand.id);
                    const shouldInvert = getBrandInvert(brand.id);
                    const IconComponent = brandIconMap[brand.id];

                    return (
                      <Link
                        key={brand.id}
                        href={`/cars/brand/${brand.id}`}
                        onClick={closeDropdown}
                        className="group flex items-center gap-2.5 px-2 py-1.5 rounded-sm hover:bg-background-elevated transition-colors"
                      >
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                          {logo ? (
                            <Image
                              src={logo}
                              alt={brand.name}
                              width={24}
                              height={24}
                              className={cn(
                                "w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity",
                                shouldInvert && "invert",
                              )}
                            />
                          ) : IconComponent ? (
                            <IconComponent className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                          ) : null}
                        </div>
                        <Text
                          as="span"
                          size="sm"
                          color="muted"
                          className="flex-1 group-hover:text-foreground transition-colors"
                        >
                          {brand.name}
                        </Text>
                        <Text as="span" size="xs" color="subtle">
                          {brand.count}
                        </Text>
                      </Link>
                    );
                  })}
                  {filteredBrands.length === 0 && (
                    <Text
                      as="p"
                      size="xs"
                      color="subtle"
                      className="px-2 py-4 text-center"
                    >
                      No brands found
                    </Text>
                  )}
                </div>
              </div>

              {/* Column 2: Body Types */}
              <div className="space-y-3">
                <Text
                  as="span"
                  size="xs"
                  weight="semibold"
                  color="muted"
                  className="uppercase tracking-wider px-2"
                >
                  Body Type
                </Text>

                <div className="space-y-1">
                  {CAR_BODY_TYPES.filter((type) => type.id !== "all").map((bodyType) => {
                    const count = bodyTypeCounts[bodyType.id] || 0;

                    return (
                      <Link
                        key={bodyType.id}
                        href={`/cars/body-type/${bodyType.id}`}
                        onClick={closeDropdown}
                        className="group flex items-center justify-between px-2 py-2 rounded-sm hover:bg-background-elevated transition-colors"
                      >
                        <Text
                          as="span"
                          size="sm"
                          color="muted"
                          className="group-hover:text-foreground transition-colors"
                        >
                          {bodyType.label}
                        </Text>
                        <Text
                          as="span"
                          size="xs"
                          color="subtle"
                          className="bg-background-elevated px-1.5 py-0.5 rounded group-hover:bg-background transition-colors"
                        >
                          {count}
                        </Text>
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/cars"
                  onClick={closeDropdown}
                  className="block px-2 pt-3 border-t border-border"
                >
                  <Text
                    as="span"
                    size="sm"
                    weight="medium"
                    color="primary"
                    className="hover:opacity-80 transition-opacity"
                  >
                    View All Cars →
                  </Text>
                </Link>
              </div>

              {/* Column 3: Categories */}
              <div className="space-y-3">
                <Text
                  as="span"
                  size="xs"
                  weight="semibold"
                  color="muted"
                  className="uppercase tracking-wider px-2"
                >
                  Categories
                </Text>

                <div className="space-y-1">
                  {CAR_CATEGORIES.filter((cat) => cat.id !== "all").map((category) => (
                    <Link
                      key={category.id}
                      href={`/cars/category/${category.id}`}
                      onClick={closeDropdown}
                      className="group flex items-center justify-between px-2 py-2 rounded-sm hover:bg-background-elevated transition-colors"
                    >
                      <Text
                        as="span"
                        size="sm"
                        color="muted"
                        className="group-hover:text-foreground transition-colors"
                      >
                        {category.label}
                      </Text>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
