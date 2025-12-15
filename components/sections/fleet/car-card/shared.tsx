"use client";

import { CircleCheck, Cog, Fuel, ShieldCheck, Users } from "lucide-react";
import { Badge, Text } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Car, CarSpecs } from "@/types";

export interface BaseCarCardProps {
  car: Car;
  index?: number;
  showBadge?: boolean;
  showInquiryButton?: boolean;
  showSpecs?: boolean;
  showFeaturedBadge?: boolean;
  className?: string;
}

export function SpecsRow({
  specs,
  className,
}: {
  specs: CarSpecs;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-sm text-foreground-muted",
        className
      )}
    >
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

export function FeaturesRow({ className }: { className?: string }) {
  return (
    <Text
      size="sm"
      color="muted"
      className={cn("flex flex-wrap items-center gap-1", className)}
    >
      <span>Free delivery in Dubai</span>
      <span className="text-foreground-subtle">•</span>
      <span>Insurance included</span>
    </Text>
  );
}

export function AvailabilityBadges({ className }: { className?: string }) {
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

export function CategoryBadge({ category }: { category: string }) {
  return (
    <Badge variant="default" font="display" size="xs">
      {category.replace("-", " ")}
    </Badge>
  );
}

export function FeaturedBadge() {
  return (
    <Badge variant="premium" font="display" size="xs">
      Featured
    </Badge>
  );
}
