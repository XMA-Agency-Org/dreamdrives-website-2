import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "hero";

interface HeadingProps {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: "text-lg font-semibold",
  sm: "text-xl font-semibold",
  md: "text-2xl font-bold sm:text-3xl",
  lg: "text-3xl font-bold sm:text-4xl",
  xl: "text-4xl font-bold sm:text-5xl",
  "2xl": "text-5xl font-black sm:text-6xl",
  "3xl": "text-6xl font-black sm:text-7xl",
  hero: "text-4xl font-black sm:text-5xl lg:text-7xl xl:text-8xl",
};

export function Heading({
  as: Component = "h2",
  size = "lg",
  children,
  className,
  gradient = false,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "text-foreground font-display tracking-tight",
        sizeStyles[size],
        gradient && "text-gradient",
        className
      )}
    >
      {children}
    </Component>
  );
}
