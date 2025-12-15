"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container, Heading, Text, Badge } from "@/components/ui";
import type { Car } from "@/types";

interface CarHeroProps {
  car: Car;
  thumbnail?: string;
}

export function CarHero({ car }: CarHeroProps) {
  return (
    <section className="relative flex items-end overflow-clip mb-16">
      <Container className="relative z-10 pt-32">
        <motion.div>
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Fleet</span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
