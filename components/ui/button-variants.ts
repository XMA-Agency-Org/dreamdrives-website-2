import { cva } from "class-variance-authority";

/** Plain module (no "use client") so server components can style links as buttons. */
export const buttonVariants = cva(
  // Base styles - using CSS variable for border radius
  "relative cursor-pointer inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 rounded-md",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-neutral-950 hover:bg-primary-600 active:bg-primary-700 button button--mimas",
        secondary:
          "bg-neutral-800 text-neutral-50 hover:bg-neutral-700 active:bg-neutral-600",
        ghost:
          "bg-transparent text-neutral-50 hover:bg-neutral-800/50 active:bg-neutral-800",
        outline:
          "bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-500/10 active:bg-primary-500/20 backdrop-blur-sm",
        whatsapp:
          "bg-[oklch(0.55_0.17_142)] text-white hover:bg-[oklch(0.50_0.17_142)] active:bg-[oklch(0.45_0.17_142)]",
        whatsappOutline:
          "text-[oklch(0.55_0.17_142)] hover:text-white active:text-white border border-green-500 hover:border-green-600 active:border-green-700 hover:bg-green-500/10 active:bg-green-500/20 backdrop-blur-sm",
      },
      size: {
        sm: "h-11 px-4 text-sm gap-2",
        md: "h-12 px-6 text-base gap-2",
        lg: "h-14 px-8 text-lg gap-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
