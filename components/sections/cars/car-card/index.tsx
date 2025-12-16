"use client";

import type { Car } from "@/types";
import { CompactCarCard } from "./CompactCarCard";
import { MinimalCarCard } from "./MinimalCarCard";
import { StandardCarCard } from "./StandardCarCard";
import { StandardMinimalCarCard } from "./StandardMinimalCarCard";
import { InlineCarCard } from "./InlineCarCard";

export type CarCardVariant =
  | "compact"
  | "minimal"
  | "standard"
  | "standard-minimal"
  | "inline";

export interface CarCardProps {
  car: Car;
  variant?: CarCardVariant;
  index?: number;
  showBadge?: boolean;
  showInquiryButton?: boolean;
  showSpecs?: boolean;
  showFeaturedBadge?: boolean;
  className?: string;
}

const variantComponents = {
  compact: CompactCarCard,
  minimal: MinimalCarCard,
  standard: StandardCarCard,
  "standard-minimal": StandardMinimalCarCard,
  inline: InlineCarCard,
} as const;

export function CarCard({ variant = "standard", ...props }: CarCardProps) {
  const Component = variantComponents[variant];
  return <Component {...props} />;
}

export { CompactCarCard } from "./CompactCarCard";
export { MinimalCarCard } from "./MinimalCarCard";
export { StandardCarCard } from "./StandardCarCard";
export { StandardMinimalCarCard } from "./StandardMinimalCarCard";
export { InlineCarCard } from "./InlineCarCard";
export type { BaseCarCardProps } from "./shared";
