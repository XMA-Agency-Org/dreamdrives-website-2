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
  tagline,
  title,
  gradientText,
  description,
  align = "left",
  size = "default",
  className,
  breadcrumbs,
}: PageHeroProps) {
  const hasContent = tagline || description;

  return (
    <Section
      spacing="none"
      className={cn(
        "pt-32",
        hasContent ? (size === "large" ? "pb-20" : "pb-16") : "pb-8",
        className,
      )}
    >
      <div
        className={cn(
          align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl",
        )}
      >
        <RevealOnScroll>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} className="mb-6" />
          )}
          {tagline && (
            <Text
              size="sm"
              color="primary"
              weight="semibold"
              className="uppercase tracking-widest mb-4"
            >
              {tagline}
            </Text>
          )}
          <Heading as="h1" size="2xl" className={description ? "mb-6" : undefined}>
            {title}{" "}
            {gradientText && (
              <span className="text-gradient">{gradientText}</span>
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
