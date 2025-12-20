"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Section } from "@/components/ui";
import {
  SpeedometerGauge,
  gaugeSlides,
} from "@/components/ui/SpeedometerGauge";
import { RevealOnScroll } from "@/components/animation";

export function TrustSignals() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % gaugeSlides.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + gaugeSlides.length) % gaugeSlides.length
    );
  };

  return (
    <Section background="elevated" spacing="lg" border="both">
      <RevealOnScroll>
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
          {/* Left navigation button */}
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            aria-label="Previous"
            className="rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          {/* Speedometer gauge */}
          <SpeedometerGauge
            activeIndex={activeIndex}
            onIndexChange={setActiveIndex}
          />

          {/* Right navigation button */}
          <Button
            variant="outline"
            size="lg"
            onClick={handleNext}
            aria-label="Next"
            className="rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>

        {/* Dot indicators below */}
        <div className="flex justify-center gap-2 mt-8">
          {gaugeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary-500 w-8"
                  : "bg-border hover:bg-foreground-muted"
              }`}
              aria-label={`Go to ${gaugeSlides[index].label}`}
            />
          ))}
        </div>
      </RevealOnScroll>
    </Section>
  );
}
