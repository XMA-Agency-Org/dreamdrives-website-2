"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Badge, Container, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { brands } from "@/data/brands";

export function BrandShowcase() {
  // Duplicate brands for infinite scroll effect
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-12 bg-background-elevated border-y border-border">
      {/* Logo Marquee */}
      <div className="relative overflow-clip">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-elevated to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-elevated to-transparent z-10" />

        <motion.div
          className="flex items-center gap-16"
          animate={{
            x: [0, -180 * brands.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-none flex items-center justify-center w-40 h-20 opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={160}
                height={80}
                className={`object-contain max-h-16 w-auto ${brand.invert ? "invert" : ""}`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
