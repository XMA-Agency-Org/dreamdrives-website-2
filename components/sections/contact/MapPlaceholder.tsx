"use client";

import { MapPin } from "lucide-react";
import { Heading, Text, Button } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  address: string;
  mapsUrl?: string;
  className?: string;
}

export function MapPlaceholder({
  address,
  mapsUrl = "https://maps.google.com/?q=Dubai,UAE",
  className,
}: MapPlaceholderProps) {
  return (
    <RevealOnScroll className={className}>
      <div
        className={cn(
          "relative aspect-[21/9] overflow-clip bg-background-elevated border border-border rounded-lg"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <Heading as="h3" size="md" className="mb-2">
              Visit Our Showroom
            </Heading>
            <Text color="muted">{address}</Text>
            <Button
              as="a"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-4"
            >
              Open in Maps
            </Button>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
