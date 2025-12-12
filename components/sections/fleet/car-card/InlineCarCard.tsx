"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button, Heading, Text } from "@/components/ui";
import { formatPrice, getCarInquiryUrl, cn } from "@/lib/utils";
import {
  type BaseCarCardProps,
  AvailabilityBadges,
  CategoryBadge,
  FeaturedBadge,
  FeaturesRow,
  SpecsRow,
} from "./shared";

export function InlineCarCard({
  car,
  showBadge = true,
  showInquiryButton = true,
  showSpecs = true,
  showFeaturedBadge,
  className,
}: BaseCarCardProps) {
  const primaryImage =
    car.images.find((img) => img.isPrimary) || car.images[0];
  const displayFeaturedBadge = showFeaturedBadge ?? car.isFeatured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/fleet/${car.slug}`} className="group block">
        <div
          className={cn(
            "relative overflow-clip bg-background-elevated border-border",
            "group-hover:border-primary-500/50 transition-all duration-300 rounded-lg",
            "flex flex-col lg:flex-row",
            className
          )}
        >
          <div
            className={cn(
              "relative aspect-[4/3] lg:aspect-auto lg:w-[30%] lg:min-h-[180px] shrink-0"
            )}
          >
            <Image
              src={primaryImage?.src || "/images/cars/placeholder.jpg"}
              alt={car.name}
              fill
              className="object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 300px"
            />

            {showBadge && (
              <div className="absolute top-3 left-3">
                <CategoryBadge category={car.category} />
              </div>
            )}

            {displayFeaturedBadge && (
              <div className="absolute top-3 right-3">
                <FeaturedBadge />
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row flex-1 p-4 lg:p-5 gap-4 lg:gap-6">
            <div className="flex-1 flex flex-col justify-center">
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
                className="group-hover:text-primary-500 transition-colors line-clamp-1 mb-2"
              >
                {car.name} ({car.color}), {car.year}
              </Heading>

              {showSpecs && <SpecsRow specs={car.specs} className="mb-8" />}

              <AvailabilityBadges className="mb-2" />
              <FeaturesRow />
            </div>

            <div
              className={cn(
                "flex flex-row lg:flex-col items-center lg:items-end",
                "justify-between lg:justify-center gap-3 lg:gap-4",
                "lg:min-w-[140px] shrink-0"
              )}
            >
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

              {showInquiryButton && (
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
