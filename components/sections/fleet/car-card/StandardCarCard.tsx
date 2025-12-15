"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button, Heading, Text } from "@/components/ui";
import { formatPrice, getCarInquiryUrl, cn } from "@/lib/utils";
import {
  type BaseCarCardProps,
  CategoryBadge,
  FeaturedBadge,
  SpecsRow,
} from "./shared";

export function StandardCarCard({
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
      <Link href={`/fleet/${car.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative overflow-clip bg-background-elevated border-border",
            "group-hover:border-primary-500/50 transition-all duration-300 rounded-lg",
            "h-full flex flex-col",
            className
          )}
        >
          <div className="relative aspect-16/10">
            <Image
              src={primaryImage?.src || "/images/cars/placeholder.jpg"}
              alt={car.name}
              fill
              className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
              {showBadge && <CategoryBadge category={car.category} />}
              {displayFeaturedBadge && <FeaturedBadge />}
            </div>
          </div>

          <div className="p-5 flex flex-col flex-1">
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

            {showSpecs && (
              <div className="mb-4">
                <SpecsRow specs={car.specs} />
              </div>
            )}

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

              {showInquiryButton && (
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
