import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-neutral-950",
        secondary: "bg-neutral-800 text-neutral-100 border border-neutral-700",
        outline: "bg-transparent text-primary-500 border border-primary-500 backdrop-blur-sm",
        ghost: "bg-neutral-800/50 text-neutral-200",
        muted: "bg-neutral-700 text-neutral-300",
        success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        danger: "bg-red-500/20 text-red-400 border border-red-500/30",
        premium:
          "bg-gradient-to-r from-primary-600 to-primary-400 text-neutral-950 shadow-lg shadow-primary-500/25",
      },
      size: {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-1 text-xs leading-5",
        md: "px-3 py-1.5 text-xs leading-5",
        lg: "px-4 py-2 text-sm",
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded-none",
        soft: "rounded-sm",
      },
      font: {
        default: "font-semibold",
        display: "font-grunge tracking-wider",
        grunge: "font-grunge",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      shape: "square",
      font: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export function Badge({
  className,
  variant,
  size,
  shape,
  font,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, shape, font }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

export { badgeVariants };
