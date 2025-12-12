import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

// CSS @property definitions for smooth gradient transitions
const cssProperties = `
  @property --gradient-from {
    syntax: '<color>';
    initial-value: transparent;
    inherits: false;
  }
  
  @property --gradient-to {
    syntax: '<color>';
    initial-value: transparent;
    inherits: false;
  }
  
  @property --gradient-from-hover {
    syntax: '<color>';
    initial-value: transparent;
    inherits: false;
  }
  
  @property --gradient-to-hover {
    syntax: '<color>';
    initial-value: transparent;
    inherits: false;
  }
`;

// Inject CSS @property definitions once
if (
  typeof document !== "undefined" &&
  !document.getElementById("scanning-button-properties")
) {
  const style = document.createElement("style");
  style.id = "scanning-button-properties";
  style.textContent = cssProperties;
  document.head.appendChild(style);
}

const scanningButtonVariants = cva(
  "group relative font-medium rounded-lg overflow-hidden ease-out transform-gpu whitespace-nowrap [transition:background_0.3s_ease-out,box-shadow_0.3s_ease-out,--gradient-from_0.3s_ease-out,--gradient-to_0.3s_ease-out]",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        outline: "",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
      color: {
        blue: "",
        emerald: "",
        purple: "",
        amber: "",
        neutral: "",
        white: "",
      },
    },
    compoundVariants: [
      // Blue variants
      {
        variant: "primary",
        color: "blue",
        className:
          "text-white dark:text-white border border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] dark:border-blue-500/30 [--gradient-from:hsl(214_100%_27%/0.8)] [--gradient-to:hsl(214_100%_37%/0.6)] hover:[--gradient-from:hsl(214_100%_47%/0.85)] hover:[--gradient-to:hsl(214_100%_57%/0.7)] dark:[--gradient-from:hsl(214_100%_47%/0.25)] dark:[--gradient-to:hsl(214_100%_57%/0.15)] dark:hover:[--gradient-from:hsl(214_100%_47%/0.22)] dark:hover:[--gradient-to:hsl(214_100%_57%/0.12)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "secondary",
        color: "blue",
        className:
          "text-blue-700 dark:text-blue-300 border border-blue-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.4),inset_0_0_20px_rgba(59,130,246,0.15)] dark:border-blue-500/25 [--gradient-from:hsl(214_100%_47%/0.4)] [--gradient-to:hsl(214_100%_57%/0.25)] hover:[--gradient-from:hsl(214_100%_47%/0.5)] hover:[--gradient-to:hsl(214_100%_57%/0.35)] dark:[--gradient-from:hsl(214_100%_47%/0.08)] dark:[--gradient-to:hsl(214_100%_57%/0.05)] dark:hover:[--gradient-from:hsl(214_100%_47%/0.15)] dark:hover:[--gradient-to:hsl(214_100%_57%/0.1)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "text-blue-700 hover:text-white bg-white/70 border border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:text-blue-400 dark:hover:text-white dark:bg-zinc-900/50 dark:border-blue-500/30 [--gradient-from:transparent] [--gradient-to:transparent] hover:[--gradient-from:hsl(200_100%_50%/0.6)] hover:[--gradient-to:hsl(200_100%_60%/0.4)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      // Emerald variants
      {
        variant: "primary",
        color: "emerald",
        className:
          "text-white dark:text-white border border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] dark:border-emerald-500/30 [--gradient-from:hsl(158_64%_29%/0.8)] [--gradient-to:hsl(160_84%_39%/0.6)] hover:[--gradient-from:hsl(160_84%_39%/0.85)] hover:[--gradient-to:hsl(158_64%_52%/0.7)] dark:[--gradient-from:hsl(158_64%_52%/0.25)] dark:[--gradient-to:hsl(160_84%_59%/0.15)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "secondary",
        color: "emerald",
        className:
          "text-emerald-700 dark:text-emerald-300 border border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.4),inset_0_0_20px_rgba(16,185,129,0.15)] dark:border-emerald-500/25 [--gradient-from:hsl(158_64%_52%/0.4)] [--gradient-to:hsl(160_84%_59%/0.25)] hover:[--gradient-from:hsl(158_64%_52%/0.5)] hover:[--gradient-to:hsl(160_84%_59%/0.35)] dark:[--gradient-from:hsl(158_64%_52%/0.08)] dark:[--gradient-to:hsl(160_84%_59%/0.05)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "outline",
        color: "emerald",
        className:
          "text-emerald-700 hover:text-white bg-white/70 border border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] dark:text-emerald-400 dark:hover:text-white dark:bg-zinc-900/50 dark:border-emerald-500/30 [--gradient-from:transparent] [--gradient-to:transparent] hover:[--gradient-from:hsl(160_84%_39%/0.6)] hover:[--gradient-to:hsl(158_64%_52%/0.4)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      // Purple variants
      {
        variant: "primary",
        color: "purple",
        className:
          "text-white dark:text-white border border-purple-500/60 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] dark:border-purple-500/30 [--gradient-from:hsl(270_91%_65%/0.8)] [--gradient-to:hsl(270_91%_65%/0.6)] hover:[--gradient-from:hsl(262_83%_58%/0.85)] hover:[--gradient-to:hsl(270_91%_65%/0.7)] dark:[--gradient-from:hsl(270_91%_65%/0.25)] dark:[--gradient-to:hsl(270_91%_65%/0.15)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "secondary",
        color: "purple",
        className:
          "text-purple-700 dark:text-purple-300 border border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4),inset_0_0_20px_rgba(147,51,234,0.15)] dark:border-purple-500/25 [--gradient-from:hsl(270_91%_65%/0.4)] [--gradient-to:hsl(270_91%_65%/0.25)] hover:[--gradient-from:hsl(270_91%_65%/0.5)] hover:[--gradient-to:hsl(270_91%_65%/0.35)] dark:[--gradient-from:hsl(270_91%_65%/0.08)] dark:[--gradient-to:hsl(270_91%_65%/0.05)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "outline",
        color: "purple",
        className:
          "text-purple-700 hover:text-white bg-white/70 border border-purple-500/50 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] dark:text-purple-400 dark:hover:text-white dark:bg-zinc-900/50 dark:border-purple-500/30 [--gradient-from:transparent] [--gradient-to:transparent] hover:[--gradient-from:hsl(262_83%_58%/0.6)] hover:[--gradient-to:hsl(270_91%_65%/0.4)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      // Amber variants
      {
        variant: "primary",
        color: "amber",
        className:
          "text-white dark:text-white border border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] dark:border-amber-500/30 [--gradient-from:hsl(45_93%_47%/0.8)] [--gradient-to:hsl(43_96%_56%/0.6)] hover:[--gradient-from:hsl(32_95%_44%/0.85)] hover:[--gradient-to:hsl(45_93%_47%/0.7)] dark:[--gradient-from:hsl(45_93%_47%/0.25)] dark:[--gradient-to:hsl(43_96%_56%/0.15)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "secondary",
        color: "amber",
        className:
          "text-amber-700 dark:text-amber-300 border border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.4),inset_0_0_20px_rgba(245,158,11,0.15)] dark:border-amber-500/25 [--gradient-from:hsl(45_93%_47%/0.4)] [--gradient-to:hsl(43_96%_56%/0.25)] hover:[--gradient-from:hsl(45_93%_47%/0.5)] hover:[--gradient-to:hsl(43_96%_56%/0.35)] dark:[--gradient-from:hsl(45_93%_47%/0.08)] dark:[--gradient-to:hsl(43_96%_56%/0.05)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "outline",
        color: "amber",
        className:
          "text-amber-700 hover:text-white bg-white/70 border border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] dark:text-amber-400 dark:hover:text-white dark:bg-zinc-900/50 dark:border-amber-500/30 [--gradient-from:transparent] [--gradient-to:transparent] hover:[--gradient-from:hsl(32_95%_44%/0.6)] hover:[--gradient-to:hsl(45_93%_47%/0.4)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      // Neutral variants
      {
        variant: "primary",
        color: "neutral",
        className:
          "text-white dark:text-white border border-slate-500/60 hover:shadow-[0_0_20px_rgba(148,163,184,0.4)] dark:border-zinc-500/30 dark:hover:shadow-[0_0_20px_rgba(163,163,163,0.4)] [--gradient-from:hsl(210_40%_46%/0.7)] [--gradient-to:hsl(210_40%_56%/0.5)] hover:[--gradient-from:hsl(215_28%_39%/0.8)] hover:[--gradient-to:hsl(210_40%_46%/0.65)] dark:[--gradient-from:hsl(240_4%_46%/0.2)] dark:[--gradient-to:hsl(240_5%_56%/0.1)] dark:hover:[--gradient-from:hsl(215_28%_39%/0.25)] dark:hover:[--gradient-to:hsl(240_4%_46%/0.15)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "secondary",
        color: "neutral",
        className:
          "text-slate-700 dark:text-zinc-300 border border-slate-500/60 hover:shadow-[0_0_30px_rgba(148,163,184,0.4),inset_0_0_20px_rgba(148,163,184,0.15)] dark:border-zinc-500/25 dark:hover:shadow-[0_0_30px_rgba(163,163,163,0.4),inset_0_0_20px_rgba(163,163,163,0.15)] [--gradient-from:hsl(210_40%_46%/0.35)] [--gradient-to:hsl(210_40%_56%/0.2)] hover:[--gradient-from:hsl(210_40%_46%/0.45)] hover:[--gradient-to:hsl(210_40%_56%/0.3)] dark:[--gradient-from:hsl(240_4%_46%/0.5)] dark:[--gradient-to:hsl(240_5%_56%/0.35)] dark:hover:[--gradient-from:hsl(240_4%_46%/0.15)] dark:hover:[--gradient-to:hsl(240_5%_56%/0.1)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "text-slate-700 hover:text-white bg-white/70 border border-slate-500/50 hover:shadow-[0_0_20px_rgba(148,163,184,0.3)] dark:text-zinc-400 dark:hover:text-white dark:bg-zinc-900/50 dark:border-zinc-500/30 dark:hover:shadow-[0_0_20px_rgba(163,163,163,0.3)] [--gradient-from:transparent] [--gradient-to:transparent] hover:[--gradient-from:hsl(215_28%_39%/0.6)] hover:[--gradient-to:hsl(210_40%_46%/0.4)] dark:hover:[--gradient-from:hsl(215_28%_39%/0.25)] dark:hover:[--gradient-to:hsl(240_4%_46%/0.15)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      // White variants
      {
        variant: "primary",
        color: "white",
        className:
          "text-blue-600 dark:text-blue-600 border border-white/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] [--gradient-from:hsl(0_0%_100%/0.95)] [--gradient-to:hsl(0_0%_96%/0.9)] hover:[--gradient-from:hsl(0_0%_100%/1)] hover:[--gradient-to:hsl(0_0%_98%/0.95)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "secondary",
        color: "white",
        className:
          "text-slate-700 dark:text-white border border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.1)] [--gradient-from:hsl(0_0%_100%/0.2)] [--gradient-to:hsl(0_0%_96%/0.1)] hover:[--gradient-from:hsl(0_0%_100%/0.3)] hover:[--gradient-to:hsl(0_0%_98%/0.2)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
      {
        variant: "outline",
        color: "white",
        className:
          "text-white hover:text-slate-800 bg-transparent border border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] [--gradient-from:transparent] [--gradient-to:transparent] hover:[--gradient-from:hsl(0_0%_100%/0.9)] hover:[--gradient-to:hsl(0_0%_96%/0.8)] [background:linear-gradient(to_bottom_right,var(--gradient-from),var(--gradient-to))]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      color: "blue",
    },
  },
);

interface ScanningButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof scanningButtonVariants> {
  children: React.ReactNode;
  trackingLocation?: string; // Optional location identifier for event tracking
  trackingProps?: Record<string, unknown>; // Additional properties for event tracking
}

const ScanningButton = React.forwardRef<HTMLButtonElement, ScanningButtonProps>(
  (
    {
      children,
      variant,
      size,
      color,
      className,
      trackingLocation,
      trackingProps,
      ...props
    },
    ref,
  ) => {
    const getShimmerColor = () => {
      switch (color) {
        case "emerald":
          return "rgba(52, 211, 153, 0.3)";
        case "purple":
          return "rgba(196, 181, 253, 0.3)";
        case "amber":
          return "rgba(251, 191, 36, 0.3)";
        case "neutral":
          return "rgba(212, 212, 212, 0.25)";
        case "white":
          return "rgba(59, 130, 246, 0.2)";
        case "blue":
        default:
          return "rgba(255, 255, 255, 0.2)";
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Call original onClick if provided
      props.onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          scanningButtonVariants({ variant, size, color, className }),
        )}
        {...props}
        onClick={handleClick}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          <div
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12"
            style={{
              background: `linear-gradient(90deg, transparent, ${getShimmerColor()}, transparent)`,
            }}
          />
        </div>

        {/* Content */}
        <span className="relative z-10 font-medium tracking-wide drop-shadow-sm">
          {children}
        </span>
      </motion.button>
    );
  },
);

ScanningButton.displayName = "ScanningButton";

export { ScanningButton };
