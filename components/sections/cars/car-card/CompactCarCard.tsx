"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Badge, Button, Heading, Text } from "@/components/ui";
import { formatPrice, getCarInquiryUrl, cn } from "@/lib/utils";
import type { BaseCarCardProps } from "./shared";

export function CompactCarCard({
  car,
  index = 0,
  showBadge = true,
  showInquiryButton = true,
  className,
}: BaseCarCardProps) {
  const primaryImage =
    car.images.find((img) => img.isPrimary) || car.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
    >
      <Link href={`/cars/${car.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative overflow-clip bg-background-elevated border-border",
            "group-hover:border-primary-500/50 transition-all duration-300 rounded-lg",
            "h-full aspect-[4/3]",
            className
          )}
        >
          <div className="absolute inset-0 h-full">
            <Image
              src={primaryImage?.src || "/images/cars/placeholder.jpg"}
              alt={car.name}
              fill
              className="object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div
              className={cn(
                "absolute inset-0 transition-opacity",
                "bg-gradient-to-t from-background via-background/20 to-transparent",
                "opacity-60 group-hover:opacity-80"
              )}
            />

            {showBadge && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="default" font="display">
                  {car.category.replace("-", " ")}
                </Badge>
              </div>
            )}

            {showInquiryButton && (
              <Button
                href={getCarInquiryUrl(car.name, car.year)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "absolute top-4 right-4 flex items-center justify-center w-10 h-10",
                  "bg-primary-500 text-neutral-950 transition-all duration-300",
                  "hover:bg-primary-600 rounded-sm opacity-0 group-hover:opacity-100"
                )}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <Heading
              as="h3"
              size="sm"
              grunge
              className="group-hover:text-primary-500 transition-colors line-clamp-1 mb-2"
            >
              {car.name}
            </Heading>

            <div className="flex items-baseline gap-1">
              <Text size="base" weight="bold" color="primary">
                {formatPrice(car.pricing.daily)}
              </Text>
              <Text size="xs" color="subtle">
                / day
              </Text>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
