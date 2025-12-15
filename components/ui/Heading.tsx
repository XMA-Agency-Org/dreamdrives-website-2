import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "hero";

interface HeadingProps {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  grunge?: boolean;
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: "text-lg font-semibold tracking-tight",
  sm: "text-xl font-semibold tracking-tight",
  md: "text-2xl font-bold tracking-tight sm:text-3xl",
  lg: "text-3xl font-bold tracking-tight sm:text-4xl",
  xl: "text-4xl font-bold tracking-tighter sm:text-5xl",
  "2xl": "text-5xl font-black tracking-tighter sm:text-6xl",
  "3xl": "text-6xl font-black tracking-tighter sm:text-7xl",
  hero: "text-3xl font-black tracking-tighter sm:text-5xl lg:text-7xl xl:text-8xl",
};

const grungeEligibleSizes: HeadingSize[] = ["hero", "3xl", "2xl", "xl"];

function shouldApplyGrunge(size: HeadingSize, grunge?: boolean): boolean {
  if (grunge !== undefined) return grunge;
  return grungeEligibleSizes.includes(size);
}

export function Heading({
  as: Component = "h2",
  size = "lg",
  children,
  className,
  gradient = false,
  grunge,
}: HeadingProps) {
  const useGrungeFont = shouldApplyGrunge(size, grunge);

  return (
    <Component
      className={cn(
        "text-foreground",
        sizeStyles[size],
        useGrungeFont && "font-grunge",
        gradient && "text-gradient",
        className
      )}
    >
      {children}
    </Component>
  );
}
