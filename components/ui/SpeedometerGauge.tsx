"use client";

import { motion } from "motion/react";
import { Star, Wrench, Clock, Car, Sparkles, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

interface GaugeSlide {
  icon: React.ElementType;
  label: string;
  description: string;
}

export const gaugeSlides: GaugeSlide[] = [
  {
    icon: Star,
    label: "5 Star Rated",
    description: "Premium service quality",
  },
  {
    icon: Wrench,
    label: "Roadside Assistance",
    description: "24/7 emergency support",
  },
  {
    icon: Clock,
    label: "24/7 Service",
    description: "Always available",
  },
  {
    icon: Car,
    label: "Newest Models",
    description: "Latest vehicle lineup",
  },
  {
    icon: Sparkles,
    label: "Clean Vehicles",
    description: "Sanitized & detailed",
  },
  {
    icon: CreditCard,
    label: "Cards Accepted",
    description: "Flexible payments",
  },
];

interface SpeedometerGaugeProps {
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  autoRotate?: boolean;
}

export function SpeedometerGauge({
  activeIndex: controlledIndex,
  onIndexChange,
  autoRotate = false,
}: SpeedometerGaugeProps = {}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const activeIndex =
    controlledIndex !== undefined ? controlledIndex : internalIndex;

  // Auto-rotate through slides every 4 seconds (only if autoRotate is true and not controlled)
  useEffect(() => {
    if (autoRotate && controlledIndex === undefined) {
      const interval = setInterval(() => {
        setInternalIndex((prev) => (prev + 1) % gaugeSlides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [autoRotate, controlledIndex]);

  const currentSlide = gaugeSlides[activeIndex];
  const IconComponent = currentSlide.icon;

  // Calculate needle rotation: maps slide index to angle on gauge
  const needleStartAngle = -70;
  const needleSweep = 145;
  const needleRotation =
    needleStartAngle + (activeIndex * needleSweep) / (gaugeSlides.length - 1);

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]">
      {/* Outer ring with gradient border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 145deg, oklch(0.6 0.15 50), oklch(0.65 0.1 50), oklch(0.75 0.05 50), oklch(0.82 0.02 50), oklch(0.85 0.01 50), oklch(0.82 0.02 50), oklch(0.75 0.05 50), oklch(0.65 0.1 50), oklch(0.6 0.15 50))`,
          padding: "2px",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "oklch(0.24 0 0)",
            boxShadow: `
              inset 0 2px 4px oklch(0.4 0 0 / 0.3),
              inset 0 -2px 4px oklch(0 0 0 / 0.5),
              0 10px 40px oklch(0 0 0 / 0.5)
            `,
          }}
        >
          {/* Render gauge numbers in arc formation */}
          {numbers.map((num, index) => {
            const startAngle = -200;
            const angleSpan = 220;
            const angle =
              startAngle + (index * angleSpan) / (numbers.length - 1);
            const radius = 42;

            return (
              <div
                key={num}
                className="absolute text-xl sm:text-2xl"
                style={{
                  color: "oklch(0.62 0.005 50)",
                  left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
                  top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                  transform: "translate(-50%, -50%)",
                  fontWeight: 200,
                }}
              >
                {num}
              </div>
            );
          })}

          {/* Render tick marks between numbers */}
          {Array.from({ length: 8 }).map((_, index) => {
            const startAngle = -200;
            const angleSpan = 220;
            const angle =
              startAngle + ((index + 0.5) * angleSpan) / (numbers.length - 1);
            const tickRadius = 41;

            return (
              <div
                key={`tick-${index}`}
                className="absolute z-10"
                style={{
                  width: "1px",
                  height: "10px",
                  background: "oklch(0.4 0.02 50)",
                  left: `${
                    50 + tickRadius * Math.cos((angle * Math.PI) / 180)
                  }%`,
                  top: `${
                    50 + tickRadius * Math.sin((angle * Math.PI) / 180)
                  }%`,
                  transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Inner circle */}
      <div
        className="absolute rounded-full"
        style={{
          top: "12%",
          left: "12%",
          right: "12%",
          bottom: "12%",
          background: "oklch(0.24 0 0)",
          boxShadow: `
            inset 0 0 22px oklch(0.704 0.12 253.63 / 0.35),
            inset 0 0 16px oklch(0.6 0.11 253.63 / 0.28),
            inset 0 0 10px oklch(0.5 0.09 253.63 / 0.2)
          `,
        }}
      >
        {/* Slide content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={activeIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3"
            style={{
              background: "oklch(0.4 0.08 50 / 0.5)",
            }}
          >
            <IconComponent
              className="w-8 h-8 sm:w-10 sm:h-10"
              style={{ color: "oklch(0.7 0.15 50)" }}
              strokeWidth={1.5}
            />
          </motion.div>

          <motion.h3
            key={`label-${activeIndex}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-lg sm:text-xl font-semibold text-white mb-1"
          >
            {currentSlide.label}
          </motion.h3>

          <motion.p
            key={`desc-${activeIndex}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-sm sm:text-base"
            style={{ color: "oklch(0.65 0.1 50)" }}
          >
            {currentSlide.description}
          </motion.p>
        </div>

        {/* Needle assembly - rotates based on active slide */}
        <motion.div
          className="absolute"
          style={{
            bottom: "18%",
            left: "50%",
            transformOrigin: "0 0",
          }}
          animate={{ rotate: needleRotation }}
          transition={{ type: "spring", stiffness: 50, damping: 12 }}
        >
          {/* Needle pointer */}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "0",
              height: "0",
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "125px solid oklch(0.7 0.15 50)",
              transform: "translateX(-50%)",
              filter: "drop-shadow(0 2px 4px oklch(0 0 0 / 0.4))",
            }}
          />
          {/* Needle tail */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "5px",
              height: "22px",
              background: "oklch(0.7 0.15 50)",
              transform: "translateX(-50%)",
              borderRadius: "0 0 3px 3px",
            }}
          />
        </motion.div>

        {/* Needle pivot point */}
        <div
          className="absolute rounded-full z-10"
          style={{
            width: "14px",
            height: "14px",
            bottom: "18%",
            left: "50%",
            transform: "translate(-50%, 50%)",
            background: `radial-gradient(circle at 35% 35%, oklch(0.98 0 0), oklch(0.75 0 0))`,
            boxShadow:
              "0 2px 8px oklch(0 0 0 / 0.5), inset 0 1px 2px oklch(1 0 0 / 0.3)",
          }}
        />
      </div>
    </div>
  );
}
