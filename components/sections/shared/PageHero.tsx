import { Container, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  tagline: string;
  title: string;
  gradientText?: string;
  description: string;
  align?: "left" | "center";
  size?: "default" | "large";
  className?: string;
}

export function PageHero({
  tagline,
  title,
  gradientText,
  description,
  align = "left",
  size = "default",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "bg-background",
        size === "large" ? "pt-32 pb-20" : "pt-32 pb-16",
        className
      )}
    >
      <Container>
        <div
          className={cn(
            align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl"
          )}
        >
          <RevealOnScroll>
            <Text
              size="sm"
              color="primary"
              weight="semibold"
              className="uppercase tracking-widest mb-4"
            >
              {tagline}
            </Text>
            <Heading as="h1" size="2xl" className="mb-6">
              {title}{" "}
              {gradientText && (
                <span className="text-gradient">{gradientText}</span>
              )}
            </Heading>
            <Text
              color="muted"
              size="lg"
              className={size === "large" ? "leading-relaxed" : undefined}
            >
              {description}
            </Text>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
