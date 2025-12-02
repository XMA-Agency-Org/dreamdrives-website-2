import { cn } from "@/lib/utils";

interface TextProps {
  as?: "p" | "span" | "div";
  size?: typeof sizeStyles[keyof typeof sizeStyles];
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "subtle" | "primary";
  children: React.ReactNode;
  className?: string;
}

const sizeStyles = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

const weightStyles = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colorStyles = {
  default: "text-foreground",
  muted: "text-foreground-muted",
  subtle: "text-foreground-subtle",
  primary: "text-primary-500",
};

export function Text({
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "default",
  children,
  className,
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeStyles[size],
        weightStyles[weight],
        colorStyles[color],
        "leading-relaxed",
        className,
      )}
    >
      {children}
    </Component>
  );
}
