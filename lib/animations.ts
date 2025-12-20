/**
 * Motion animation variants for Dream Drives
 * Elegant, refined luxury animations
 */

import type { Variants, Transition } from "motion/react";

// Default transition for most animations
export const defaultTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1], // Custom ease-out curve
};

// Smooth spring transition
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

// ========== FADE VARIANTS ==========

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, y: -20 },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, x: -30 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, x: 30 },
};

// ========== SCALE VARIANTS ==========

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== STAGGER CONTAINERS ==========

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ========== STAGGER CHILDREN ==========

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== SCROLL REVEAL ==========

export const scrollReveal: Variants = {
  initial: { opacity: 0, y: 60 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scrollRevealLeft: Variants = {
  initial: { opacity: 0, x: -80 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scrollRevealRight: Variants = {
  initial: { opacity: 0, x: 80 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== PARALLAX ==========

export const parallaxY = (offset: number = 50): Variants => ({
  initial: { y: offset },
  whileInView: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

// ========== HERO ANIMATIONS ==========

export const heroTitle: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroSubtitle: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroCTA: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== CARD HOVER ==========

export const cardHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  tap: { scale: 0.98 },
};

export const imageHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== NAV ANIMATIONS ==========

export const navSlideDown: Variants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const mobileMenuSlide: Variants = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== BUTTON ANIMATIONS ==========

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

// ========== PAGE TRANSITIONS ==========

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ========== VIEWPORT CONFIG ==========

export const viewportConfig = {
  once: true,
  margin: "-100px",
};

export const viewportConfigEager = {
  once: true,
  margin: "-50px",
};
