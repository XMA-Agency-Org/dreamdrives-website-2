import {
  Heading,
  Text,
  Breadcrumbs,
  Section,
  type BreadcrumbItem,
} from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  tagline?: string;
  title: string;
  gradientText?: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "large";
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({
  title,
  gradientText,
  description,
  align = "left",
  size = "default",
  className,
  breadcrumbs,
}: PageHeroProps) {

  // Wraps itself in a centred Section with header clearance (it used to render bare, so on wide screens the title sat
  // jammed against the left edge under the header, 23 Nov 2026).
  return (
    <Section spacing="none" className={cn("pt-32 pb-4 lg:pt-40", className)}>
    <div
      className={cn(
        "mb-8",
        align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl",
      )}
    >
      <RevealOnScroll>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}
        <Heading as="h1" size="2xl" className={description ? "mb-6" : undefined}>
          {title}{" "}
          {gradientText && (
            <span className="text-foreground-muted">{gradientText}</span>
          )}
        </Heading>
        {description && (
          <Text
            color="muted"
            size="lg"
            className={size === "large" ? "leading-relaxed" : undefined}
          >
            {description}
          </Text>
        )}
      </RevealOnScroll>
    </div>
    </Section>
  );
}
