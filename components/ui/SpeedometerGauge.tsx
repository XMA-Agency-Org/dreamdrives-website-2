"use client";

import { motion } from "motion/react";
import { Wrench, Clock, Car, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers";

interface GaugeSlide {
  icon: React.ElementType;
  label: string;
  description: string;
}

export const gaugeSlides: GaugeSlide[] = [
  {
    icon: Clock,
    label: "24/7 Support",
    description: "Help when you need it, day or night",
  },
  {
    icon: Car,
    label: "Car Waiting",
    description: "Landed at 4am? Your car's already there",
  },
  {
    icon: Sparkles,
    label: "Pristine Condition",
    description: "Every car, spotless and ready",
  },
  {
    icon: Wrench,
    label: "Free Delivery",
    description: "To your hotel, airport, anywhere",
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
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
  // Numbers span from -200° to +20° (220° total), needle points up at 0°
  // To point at number 1 (-200° from horizontal): rotation = -200 + 90 = -110°
  // To point at number 9 (+20° from horizontal): rotation = 20 + 90 = 110°
  const needleStartAngle = -110;
  const needleSweep = 220;
  const needleRotation =
    needleStartAngle + (activeIndex * needleSweep) / (gaugeSlides.length - 1);

  // Theme-aware colors
  const colors = {
    outerRing: isDark
      ? `conic-gradient(from 145deg, oklch(0.6 0.15 50), oklch(0.65 0.1 50), oklch(0.75 0.05 50), oklch(0.82 0.02 50), oklch(0.85 0.01 50), oklch(0.82 0.02 50), oklch(0.75 0.05 50), oklch(0.65 0.1 50), oklch(0.6 0.15 50))`
      : `conic-gradient(from 145deg, oklch(0.55 0.16 250), oklch(0.6 0.14 250), oklch(0.7 0.1 250), oklch(0.75 0.06 250), oklch(0.78 0.04 250), oklch(0.75 0.06 250), oklch(0.7 0.1 250), oklch(0.6 0.14 250), oklch(0.55 0.16 250))`,
    gaugeBackground: isDark ? "oklch(0.24 0 0)" : "oklch(0.98 0 0)",
    gaugeShadow: isDark
      ? `inset 0 2px 4px oklch(0.4 0 0 / 0.3), inset 0 -2px 4px oklch(0 0 0 / 0.5), 0 10px 40px oklch(0 0 0 / 0.5)`
      : `inset 0 2px 4px oklch(0.9 0 0 / 0.5), inset 0 -2px 4px oklch(0.85 0 0 / 0.3), 0 10px 40px oklch(0 0 0 / 0.15)`,
    numberColor: isDark ? "oklch(0.62 0.005 50)" : "oklch(0.45 0.12 250)",
    tickColor: isDark ? "oklch(0.4 0.02 50)" : "oklch(0.75 0.08 250)",
    innerCircleShadow: isDark
      ? `inset 0 0 22px oklch(0.704 0.12 253.63 / 0.35), inset 0 0 16px oklch(0.6 0.11 253.63 / 0.28), inset 0 0 10px oklch(0.5 0.09 253.63 / 0.2)`
      : `inset 0 0 22px oklch(0.55 0.16 250 / 0.2), inset 0 0 16px oklch(0.6 0.14 250 / 0.15), inset 0 0 10px oklch(0.65 0.12 250 / 0.1)`,
    iconBackground: isDark ? "oklch(0.4 0.08 50 / 0.5)" : "oklch(0.55 0.16 250 / 0.15)",
    iconColor: isDark ? "oklch(0.7 0.15 50)" : "oklch(0.55 0.16 250)",
    needleColor: isDark ? "oklch(0.7 0.15 50)" : "oklch(0.55 0.16 250)",
    pivotGradient: isDark
      ? `radial-gradient(circle at 35% 35%, oklch(0.98 0 0), oklch(0.75 0 0))`
      : `radial-gradient(circle at 35% 35%, oklch(0.98 0 0), oklch(0.85 0 0))`,
  };

  return (
    <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px]">
      {/* Outer ring with gradient border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: colors.outerRing,
          padding: "2px",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: colors.gaugeBackground,
            boxShadow: colors.gaugeShadow,
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
                  color: colors.numberColor,
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
                  background: colors.tickColor,
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
          background: colors.gaugeBackground,
          boxShadow: colors.innerCircleShadow,
        }}
      >
        {/* Slide content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.div
            key={activeIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="size-16 sm:size-20 md:size-24 lg:size-28 rounded-full flex items-center justify-center mb-3 sm:mb-10 z-10"
            style={{
              background: colors.iconBackground,
            }}
          >
            <IconComponent
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
              style={{ color: colors.iconColor }}
              strokeWidth={1.5}
            />
          </motion.div>

          <motion.h3
            key={`label-${activeIndex}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-1 sm:mb-2"
          >
            {currentSlide.label}
          </motion.h3>

          <motion.p
            key={`desc-${activeIndex}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg max-w-[180px] sm:max-w-[220px] md:max-w-[260px] text-center text-foreground-muted"
          >
            {currentSlide.description}
          </motion.p>
        </div>

        {/* Needle assembly - rotates based on active slide */}
        <motion.div
          className="absolute"
          style={{
            top: "52%",
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
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderBottom: `160px solid ${colors.needleColor}`,
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
              width: "6px",
              height: "28px",
              background: colors.needleColor,
              transform: "translateX(-50%)",
              borderRadius: "0 0 3px 3px",
            }}
          />
        </motion.div>

        {/* Needle pivot point */}
        <div
          className="absolute rounded-full z-10"
          style={{
            width: "18px",
            height: "18px",
            top: "52%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: colors.pivotGradient,
            boxShadow:
              "0 2px 8px oklch(0 0 0 / 0.5), inset 0 1px 2px oklch(1 0 0 / 0.3)",
          }}
        />
      </div>
    </div>
  );
}
