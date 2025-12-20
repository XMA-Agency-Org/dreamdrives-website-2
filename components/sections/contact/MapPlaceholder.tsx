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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.285050459924!2d55.32!3d25.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cc61e76d379%3A0x5d07f5b0a3ffa4ef!2sPort%20Saeed%20-%20Deira%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1702900000000!5m2!1sen!2sae"
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
