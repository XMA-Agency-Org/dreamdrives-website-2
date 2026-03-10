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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3579527455568!2d55.336643200000005!3d25.258541400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dbe633684c7%3A0xd97a4d55de63513c!2sDream%20Drives%20Rent%20A%20Car!5e0!3m2!1sen!2sae!4v1770988212734!5m2!1sen!2sae"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dream Drives Location"
        />
      </div>
    </RevealOnScroll>
  );
}
