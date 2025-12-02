"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Cog,
  Users,
  Fuel,
  CircleCheck,
  ShieldCheck,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Heading, Text, Badge, Button } from "@/components/ui";
import { formatPrice, getCarInquiryUrl, cn } from "@/lib/utils";
import type { Car, CarSpecs } from "@/types";

// Main card container variants
const cardVariants = cva(
  "relative overflow-clip bg-background-elevated border border-border group-hover:border-primary-500/50 transition-all duration-300 rounded-md",
  {
    variants: {
      variant: {
        compact: "h-full aspect-[4/3]",
        minimal: "h-full aspect-[4/3] bg-background",
        standard: "h-full flex flex-col",
        inline: "flex flex-col lg:flex-row",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

// Image container variants
const imageContainerVariants = cva("relative overflow-clip", {
  variants: {
    variant: {
      compact: "absolute inset-0 h-full",
      minimal: "absolute inset-0 h-full",
      standard: "aspect-16/10",
      inline: "aspect-[4/3] lg:aspect-auto lg:w-[30%] lg:min-h-[180px] shrink-0",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

// Gradient overlay variants (only for compact/minimal)
const gradientVariants = cva("absolute inset-0 transition-opacity", {
  variants: {
    variant: {
      compact:
        "bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80",
      minimal:
        "bg-gradient-to-t from-background via-transparent to-transparent",
      standard: "hidden",
      inline: "hidden",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

// Content area variants
const contentVariants = cva("", {
  variants: {
    variant: {
      compact: "absolute bottom-0 left-0 right-0 p-5",
      minimal: "absolute bottom-0 left-0 right-0 p-4",
      standard: "p-5 flex flex-col flex-1",
      inline: "p-4 lg:p-5 flex flex-col flex-1",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

// Specs row component
function SpecsRow({ specs, className }: { specs: CarSpecs; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 text-sm text-foreground-muted", className)}>
      <span className="flex items-center gap-1.5">
        <Cog className="w-3.5 h-3.5" />
        <span>
          {specs.transmission === "Automatic" ? "Auto" : specs.transmission}
        </span>
      </span>
      <span className="flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5" />
        <span>{specs.seats}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <Fuel className="w-3.5 h-3.5" />
        <span>{specs.fuelType}</span>
      </span>
    </div>
  );
}

// Features row component
function FeaturesRow({ className }: { className?: string }) {
  return (
    <Text size="sm" color="muted" className={cn("flex flex-wrap items-center gap-1", className)}>
      <span>Free delivery in Dubai</span>
      <span className="text-foreground-subtle">•</span>
      <span>Insurance included</span>
    </Text>
  );
}

// Availability badges component
function AvailabilityBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Badge variant="success" size="xs" shape="soft" className="gap-1">
        <CircleCheck className="w-3 h-3" />
        Available now
      </Badge>
      <span className="flex items-center gap-1.5 text-sm text-foreground-muted">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>No deposit</span>
      </span>
    </div>
  );
}

export interface CarCardProps extends VariantProps<typeof cardVariants> {
  car: Car;
  index?: number;
  showBadge?: boolean;
  showInquiryButton?: boolean;
  showSpecs?: boolean;
  showFeaturedBadge?: boolean;
  className?: string;
}

export function CarCard({
  car,
  index = 0,
  variant = "standard",
  showBadge,
  showInquiryButton,
  showSpecs,
  showFeaturedBadge,
  className,
}: CarCardProps) {
  const primaryImage =
    car.images.find((img) => img.isPrimary) || car.images[0];

  // Determine if we're using legacy (overlay) or new (separated) layout
  const isOverlayLayout = variant === "compact" || variant === "minimal";
  const isNewLayout = variant === "standard" || variant === "inline";

  // Default props based on variant
  const displayBadge = showBadge ?? (variant === "compact" || isNewLayout);
  const displayInquiryButton = showInquiryButton ?? true;
  const displaySpecs = showSpecs ?? isNewLayout;
  const displayFeaturedBadge =
    showFeaturedBadge ?? (isNewLayout && car.isFeatured);

  // For overlay layouts, render the existing design
  if (isOverlayLayout) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.03, duration: 0.2 }}
      >
        <Link href={`/fleet/${car.slug}`} className="group block h-full">
          <div className={cn(cardVariants({ variant }), className)}>
            {/* Image Container */}
            <div className={imageContainerVariants({ variant })}>
              <Image
                src={primaryImage?.src || "/images/cars/placeholder.jpg"}
                alt={car.name}
                fill
                className="object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className={gradientVariants({ variant })} />

              {/* Top badges */}
              {displayBadge && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge variant="default" font="display">
                    {car.category.replace("-", " ")}
                  </Badge>
                </div>
              )}

              {/* Quick inquiry button (hover only for overlay) */}
              {displayInquiryButton && (
                <Button
                  href={getCarInquiryUrl(car.name, car.year)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-primary-500 text-neutral-950 transition-all duration-300 hover:bg-primary-600 rounded-sm opacity-0 group-hover:opacity-100"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Content */}
            <div className={contentVariants({ variant })}>
              {/* Minimal variant: Brand header */}
              {variant === "minimal" && (
                <Text size="xs" color="muted" className="mb-1">
                  {car.brand.replace("-", " ")}
                </Text>
              )}

              {/* Name */}
              <Heading
                as="h3"
                size={variant === "minimal" ? "xs" : "sm"}
                grunge={variant !== "compact"}
                className="group-hover:text-primary-500 transition-colors line-clamp-1 mb-2"
              >
                {car.name}
              </Heading>

              {/* Price section */}
              {variant === "compact" ? (
                <div className="flex items-baseline gap-1">
                  <Text size="base" weight="bold" color="primary">
                    {formatPrice(car.pricing.daily)}
                  </Text>
                  <Text size="xs" color="subtle">
                    / day
                  </Text>
                </div>
              ) : (
                <Text
                  size="sm"
                  color="primary"
                  weight="semibold"
                  className="mt-2"
                >
                  {formatPrice(car.pricing.daily)}/day
                </Text>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Inline variant - horizontal layout
  if (variant === "inline") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link href={`/fleet/${car.slug}`} className="group block">
          <div className={cn(cardVariants({ variant }), className)}>
            {/* Left: Image */}
            <div className={cn(imageContainerVariants({ variant }), "relative")}>
              <Image
                src={primaryImage?.src || "/images/cars/placeholder.jpg"}
                alt={car.name}
                fill
                className="object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 300px"
              />
              {/* Category badge on image */}
              {displayBadge && (
                <div className="absolute top-3 left-3">
                  <Badge variant="default" font="display" size="xs">
                    {car.category.replace("-", " ")}
                  </Badge>
                </div>
              )}
              {/* Featured badge */}
              {displayFeaturedBadge && (
                <div className="absolute top-3 right-3">
                  <Badge variant="premium" font="display" size="xs">
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Middle + Right: Content wrapper */}
            <div className="flex flex-col lg:flex-row flex-1 p-4 lg:p-5 gap-4 lg:gap-6">
              {/* Middle: Details block */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Brand eyebrow */}
                <Text
                  size="xs"
                  color="muted"
                  className="uppercase tracking-wider mb-1"
                >
                  {car.brand.replace("-", " ")}
                </Text>

                {/* Title */}
                <Heading
                  as="h3"
                  size="sm"
                  className="group-hover:text-primary-500 transition-colors line-clamp-1 mb-2"
                >
                  {car.name} ({car.color}), {car.year}
                </Heading>

                {/* Specs row */}
                {displaySpecs && <SpecsRow specs={car.specs} className="mb-8" />}

                {/* Availability row */}
                <AvailabilityBadges className="mb-2" />

                {/* Features row */}
                <FeaturesRow />
              </div>

              {/* Right: Price + CTA block */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 lg:gap-4 lg:min-w-[140px] shrink-0">
                {/* Price block */}
                <div className="text-left lg:text-right">
                  <Text
                    size="xs"
                    color="muted"
                    className="uppercase tracking-wider"
                  >
                    Price per day
                  </Text>
                  <Text size="2xl" color="primary">
                    {formatPrice(car.pricing.daily)}
                  </Text>
                  <Text size="xs" color="subtle">
                    3–6 days: {formatPrice(Math.round(car.pricing.daily * 0.93))}
                  </Text>
                </div>

                {/* CTA Button */}
                {displayInquiryButton && (
                  <Button
                    href={getCarInquiryUrl(car.name, car.year)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    size="sm"
                    className="whitespace-nowrap mt-auto"
                  >
                    View Deal
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Standard layout - vertical card
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/fleet/${car.slug}`} className="group block h-full">
        <div className={cn(cardVariants({ variant }), className)}>
          {/* Image Container */}
          <div className={cn(imageContainerVariants({ variant }), "relative")}>
            <Image
              src={primaryImage?.src || "/images/cars/placeholder.jpg"}
              alt={car.name}
              fill
              className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
            />

            {/* Badges on image */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
              {displayBadge && (
                <Badge variant="default" font="display" size="xs">
                  {car.category.replace("-", " ")}
                </Badge>
              )}
              {displayFeaturedBadge && (
                <Badge variant="premium" font="display" size="xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className={contentVariants({ variant })}>
            {/* Header section */}
            <div className="mb-4">
              <Text
                size="xs"
                color="muted"
                className="uppercase tracking-wider mb-1"
              >
                {car.brand.replace("-", " ")}
              </Text>
              <Heading
                as="h3"
                size="sm"
                className="group-hover:text-primary-500 transition-colors"
              >
                {car.name} ({car.color}), {car.year}
              </Heading>
            </div>

            {/* Specs section */}
            {displaySpecs && (
              <div className="mb-4">
                <SpecsRow specs={car.specs} />
              </div>
            )}

            {/* Price + CTA section */}
            <div className="mt-auto pt-4 border-t border-border flex items-end justify-between gap-4">
              <div>
                <Text
                  size="xs"
                  color="muted"
                  className="uppercase tracking-wider"
                >
                  Price per day
                </Text>
                <Text size="xl" weight="bold" color="primary">
                  {formatPrice(car.pricing.daily)}
                </Text>
                <Text size="xs" color="subtle">
                  3–6 days: {formatPrice(Math.round(car.pricing.daily * 0.93))}
                </Text>
              </div>

              {displayInquiryButton && (
                <Button
                  href={getCarInquiryUrl(car.name, car.year)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  size="sm"
                  className="shrink-0"
                >
                  View Deal
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export { cardVariants };
