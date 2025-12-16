"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Heading, Text } from "@/components/ui";
import { formatPrice, cn } from "@/lib/utils";
import { type BaseCarCardProps, CategoryBadge } from "./shared";

export function StandardMinimalCarCard({
  car,
  showBadge = true,
  className,
}: BaseCarCardProps) {
  const primaryImage =
    car.images.find((img) => img.isPrimary) || car.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/cars/${car.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative transition-all duration-300",
            "h-full flex flex-col",
            className
          )}
        >
          <div className="relative aspect-16/10 rounded-lg overflow-hidden">
            <Image
              src={primaryImage?.src || "/images/cars/placeholder.jpg"}
              alt={car.name}
              fill
              className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
            />

            {showBadge && (
              <div className="absolute top-3 left-3">
                <CategoryBadge category={car.category} />
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-col flex-1">
            <Heading
              as="h3"
              size="sm"
              className="group-hover:text-primary-500 transition-colors mb-1"
            >
              {car.name}
            </Heading>

            <Text size="sm" weight="bold">
              {formatPrice(car.pricing.daily)}
              <Text as="span" size="xs" color="muted" weight="normal">
                {" "}per day
              </Text>
            </Text>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
