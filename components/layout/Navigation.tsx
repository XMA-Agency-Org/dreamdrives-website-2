"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text, Input } from "@/components/ui";
import { CarsDropdown } from "./CarsDropdown";
import { CAR_BODY_TYPES, CAR_CATEGORIES } from "@/lib/constants";
import { getAllBrandsWithCount } from "@/data/cars";

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
  variant?: "horizontal" | "vertical";
  currentView?: string;
  onNavigate?: (view: string) => void;
  onBack?: () => void;
  isScrolled?: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const slideTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

function BackButton({ onClick, label = "Back" }: { onClick?: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-6 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-sm"
    >
      <ChevronLeft className="w-5 h-5" />
      <Text size="sm" color="muted">
        {label}
      </Text>
    </button>
  );
}

function NavLink({
  href,
  onClick,
  isActive,
  children,
}: {
  href: string;
  onClick?: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-lg tracking-normal font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-sm",
        isActive
          ? "text-primary-500"
          : "text-foreground-muted hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function DrilldownItem({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full text-lg tracking-normal font-medium text-foreground-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-sm"
    >
      <span>{children}</span>
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function SubNavLink({
  href,
  onClick,
  children,
  count,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between py-2 text-foreground-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-sm"
    >
      <Text size="base">{children}</Text>
      {count !== undefined && (
        <Text size="sm" color="subtle">
          {count}
        </Text>
      )}
    </Link>
  );
}

export function Navigation({
  className,
  onLinkClick,
  variant = "horizontal",
  currentView = "main",
  onNavigate,
  onBack,
  isScrolled = true,
}: NavigationProps) {
  const pathname = usePathname();
  const allBrands = useMemo(() => getAllBrandsWithCount(), []);
  const [brandSearch, setBrandSearch] = useState("");
  const [direction, setDirection] = useState(1);

  const filteredBrands = useMemo(() => {
    if (!brandSearch) return allBrands;
    return allBrands.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearch.toLowerCase()),
    );
  }, [allBrands, brandSearch]);

  const handleNavigate = (view: string) => {
    setDirection(1);
    onNavigate?.(view);
  };

  const handleBack = () => {
    setDirection(-1);
    setBrandSearch("");
    onBack?.();
  };

  if (variant === "vertical") {
    return (
      <nav className={cn("relative h-full", className)}>
        <AnimatePresence mode="wait" custom={direction}>
          {currentView === "main" && (
            <motion.div
              key="main"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="flex flex-col gap-5"
            >
              <NavLink href="/" onClick={onLinkClick} isActive={pathname === "/"}>
                Home
              </NavLink>
              <DrilldownItem onClick={() => handleNavigate("bodyType")}>
                Body Type
              </DrilldownItem>
              <DrilldownItem onClick={() => handleNavigate("brands")}>
                Brands
              </DrilldownItem>
              <DrilldownItem onClick={() => handleNavigate("categories")}>
                Categories
              </DrilldownItem>
              <NavLink href="/blog" onClick={onLinkClick} isActive={pathname?.startsWith("/blog")}>
                Blog
              </NavLink>
              <NavLink href="/about" onClick={onLinkClick} isActive={pathname === "/about"}>
                About
              </NavLink>
              <NavLink href="/contact" onClick={onLinkClick} isActive={pathname === "/contact"}>
                Contact
              </NavLink>
            </motion.div>
          )}

          {currentView === "bodyType" && (
            <motion.div
              key="bodyType"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="flex flex-col"
            >
              <BackButton onClick={handleBack} />
              <Text
                as="span"
                size="xs"
                weight="semibold"
                color="muted"
                className="uppercase tracking-wider mb-4"
              >
                Body Type
              </Text>
              <div className="flex flex-col">
                {CAR_BODY_TYPES.filter((t) => t.id !== "all").map((bodyType) => (
                  <SubNavLink
                    key={bodyType.id}
                    href={`/cars/body-type/${bodyType.id}`}
                    onClick={onLinkClick}
                  >
                    {bodyType.label}
                  </SubNavLink>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === "brands" && (
            <motion.div
              key="brands"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="flex flex-col h-full"
            >
              <BackButton onClick={handleBack} />
              <Text
                as="span"
                size="xs"
                weight="semibold"
                color="muted"
                className="uppercase tracking-wider mb-3"
              >
                Brands
              </Text>
              <Input
                type="text"
                placeholder="Search brands..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                size="sm"
                leftIcon={<Search className="w-4 h-4" />}
                className="mb-3"
              />
              <div className="flex flex-col overflow-y-auto flex-1 -mr-2 pr-2">
                {filteredBrands.map((brand) => (
                  <SubNavLink
                    key={brand.id}
                    href={`/cars/brand/${brand.id}`}
                    onClick={onLinkClick}
                    count={brand.count}
                  >
                    {brand.name}
                  </SubNavLink>
                ))}
                {filteredBrands.length === 0 && (
                  <Text as="p" size="sm" color="subtle" className="py-4 text-center">
                    No brands found
                  </Text>
                )}
              </div>
            </motion.div>
          )}

          {currentView === "categories" && (
            <motion.div
              key="categories"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="flex flex-col"
            >
              <BackButton onClick={handleBack} />
              <Text
                as="span"
                size="xs"
                weight="semibold"
                color="muted"
                className="uppercase tracking-wider mb-4"
              >
                Categories
              </Text>
              <div className="flex flex-col">
                {CAR_CATEGORIES.filter((c) => c.id !== "all").map((category) => (
                  <SubNavLink
                    key={category.id}
                    href={`/cars/category/${category.id}`}
                    onClick={onLinkClick}
                  >
                    {category.label}
                  </SubNavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  const getLinkClass = () =>
    cn(
      "relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 link link--metis",
      isScrolled
        ? "text-foreground-muted hover:text-foreground"
        : "text-white/80 hover:text-white",
    );

  return (
    <nav className={cn("hidden md:flex items-center gap-8", className)}>
      <Link href="/" className={getLinkClass()}>
        Home
      </Link>

      <CarsDropdown isScrolled={isScrolled} />

      <Link href="/about" className={getLinkClass()}>
        About
      </Link>

      <Link href="/contact" className={getLinkClass()}>
        Contact
      </Link>
    </nav>
  );
}
