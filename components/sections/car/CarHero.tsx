"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container, Heading, Text, Badge, Section } from "@/components/ui";
import { trackCarDetailView } from "@/lib/analytics";
import type { Car } from "@/types";

interface CarHeroProps {
  car: Car;
  thumbnail?: string;
}

export function CarHero({ car }: CarHeroProps) {
  useEffect(() => {
    trackCarDetailView({
      carName: car.name,
      carBrand: car.brand,
      carCategory: car.category,
      carPrice: car.pricing.daily,
      carSlug: car.slug,
    });
  }, [car.slug, car.name, car.brand, car.category, car.pricing.daily]);

  return (
    <Section spacing="none" containerSize="none" className="relative flex items-end mb-8">
      <Container className="relative z-10">
        <motion.div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cars</span>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
