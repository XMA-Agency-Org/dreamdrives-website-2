"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight } from "@/lib/animations";

type FadeDirection = "none" | "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: FadeDirection;
}

const variants = {
  none: fadeIn,
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="initial"
      animate="animate"
      variants={variants[direction]}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}
