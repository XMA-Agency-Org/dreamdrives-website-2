"use client";

import { RevealOnScroll } from "@/components/animation";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  className?: string;
}

export function MapPlaceholder({ className }: MapPlaceholderProps) {
  return (
    <RevealOnScroll className={className}>
      <div
        className={cn(
          "relative aspect-[21/9] overflow-clip bg-background-elevated border border-border rounded-lg"
        )}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28882.57015091845!2d55.284715!3d25.192386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682451441c35%3A0xd41f8110a04d2fd9!2sUptown%20Rent%20a%20Car%20-%20Luxury%20Cars%20for%20Rent%20in%20Dubai!5e0!3m2!1sen!2sae!4v1764700687565!5m2!1sen!2sae"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Uptown Rent a Car Location"
        />
      </div>
    </RevealOnScroll>
  );
}
