"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Container, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { brands } from "@/data/brands";

export function BrandShowcase() {
  // Duplicate brands for infinite scroll effect
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-20 lg:py-28 bg-background-elevated border-y border-border">
      <Container>
        <RevealOnScroll className="text-center mb-12">
          <Text
            size="sm"
            color="primary"
            weight="semibold"
            className="uppercase tracking-widest mb-4"
          >
            World-Class Brands
          </Text>
          <Heading as="h2" size="xl">
            The Finest Marques
          </Heading>
        </RevealOnScroll>
      </Container>

      {/* Logo Marquee */}
      <div className="relative overflow-clip py-8">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-elevated to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-elevated to-transparent z-10" />

        <motion.div
          className="flex items-center gap-16"
          animate={{
            x: [0, -50 * brands.length],
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
              className="flex-none flex items-center justify-center w-32 h-20 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              {/* Placeholder for brand logo - replace with actual SVGs */}
              <div className="text-center">
                <Text
                  size="sm"
                  weight="semibold"
                  className="uppercase tracking-wider text-foreground-muted"
                >
                  {brand.name}
                </Text>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
