"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Heading, Text, Button } from "@/components/ui";
import {
  SpeedometerGauge,
  gaugeSlides,
} from "@/components/ui/SpeedometerGauge";
import { RevealOnScroll } from "@/components/animation";

export function TrustSignals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlide = gaugeSlides[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % gaugeSlides.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + gaugeSlides.length) % gaugeSlides.length
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background-elevated border-y border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center">
          {/* Gauge on the left */}
          <RevealOnScroll className="flex justify-center">
            <SpeedometerGauge
              activeIndex={activeIndex}
              onIndexChange={setActiveIndex}
            />
          </RevealOnScroll>

          {/* Text content on the right */}
          <RevealOnScroll className="space-y-6 w-full flex flex-col items-center lg:items-center">
            <div className="text-center lg:text-center">
              <Heading as="h2" size="xl" className="mb-4">
                {currentSlide.label}
              </Heading>
              <Text size="lg" color="muted" className="mb-8">
                {currentSlide.description}
              </Text>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrev}
                aria-label="Previous"
                className="rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {gaugeSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary-500 w-8"
                        : "bg-neutral-600 hover:bg-neutral-500"
                    }`}
                    aria-label={`Go to ${gaugeSlides[index].label}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={handleNext}
                aria-label="Next"
                className="rounded-full w-12 h-12 p-0"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
