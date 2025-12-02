"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container, Heading, Text, Badge } from "@/components/ui";
import type { Car } from "@/types";
import BgPic from "@/public/banner.png";

interface CarHeroProps {
  car: Car;
}

export function CarHero({ car }: CarHeroProps) {
  const primaryImage = car.images.find((img) => img.isPrimary) || car.images[0];

  return (
    <section className="relative min-h-[70vh] flex items-end overflow-clip">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={BgPic || primaryImage?.src}
          alt={car.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <Container className="relative z-10 pb-12 pt-32">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Fleet</span>
          </Link>
        </motion.div>

        {/* Car Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Badges */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="default" size="md" font="display">{car.category.replace("-", " ")}</Badge>
            <Badge variant="outline" size="md">{car.year}</Badge>
          </div>

          {/* Brand */}
          <Text
            size="lg"
            color="muted"
            className="uppercase tracking-wider mb-2"
          >
            {car.brand.replace("-", " ")}
          </Text>

          {/* Name */}
          <Heading as="h1" size="hero" className="mb-4">
            {car.name}
          </Heading>

          {/* Tagline */}
          <Text size="xl" color="muted" className="max-w-2xl">
            {car.tagline}
          </Text>
        </motion.div>
      </Container>
    </section>
  );
}
