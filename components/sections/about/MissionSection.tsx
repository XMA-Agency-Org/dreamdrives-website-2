"use client";

import Image, { type StaticImageData } from "next/image";
import { Check } from "lucide-react";
import { Container, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";

interface MissionSectionProps {
  tagline: string;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string | StaticImageData;
  imageAlt: string;
  className?: string;
}

export function MissionSection({
  tagline,
  title,
  description,
  bulletPoints,
  image,
  imageAlt,
  className,
}: MissionSectionProps) {
  return (
    <section className={`py-24 bg-background ${className ?? ""}`}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll direction="left">
            <div className="relative aspect-[4/5] overflow-clip bg-background-elevated rounded-lg">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div>
              <Text
                size="sm"
                color="primary"
                weight="semibold"
                className="uppercase tracking-widest mb-4"
              >
                {tagline}
              </Text>
              <Heading as="h2" size="xl" className="mb-6">
                {title}
              </Heading>
              <Text color="muted" size="lg" className="mb-8 leading-relaxed">
                {description}
              </Text>

              <div className="space-y-4">
                {bulletPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex-none w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary-500" />
                    </div>
                    <Text>{item}</Text>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
