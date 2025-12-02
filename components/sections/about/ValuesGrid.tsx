"use client";

import { Star, Shield, Clock, Award } from "lucide-react";
import { Container, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";

// Define values here since icons can't be passed from Server Components
const defaultValues = [
  {
    icon: Star,
    title: "Excellence",
    description:
      "We maintain the highest standards in every vehicle and every interaction.",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "Transparent pricing, comprehensive insurance, and complete peace of mind.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description:
      "24/7 availability with prompt delivery and pickup at your convenience.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Only the finest luxury vehicles, meticulously maintained and detailed.",
  },
];

interface ValuesGridProps {
  tagline: string;
  title: string;
  className?: string;
}

export function ValuesGrid({ tagline, title, className }: ValuesGridProps) {
  const values = defaultValues;
  return (
    <section className={`py-24 bg-background-elevated ${className ?? ""}`}>
      <Container>
        <RevealOnScroll className="text-center mb-16">
          <Text
            size="sm"
            color="primary"
            weight="semibold"
            className="uppercase tracking-widest mb-4"
          >
            {tagline}
          </Text>
          <Heading as="h2" size="2xl">
            {title}
          </Heading>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <RevealOnScroll key={value.title} delay={index * 0.1}>
                <div className="p-6 bg-background border border-border hover:border-primary-500/50 transition-colors rounded-md">
                  <div className="w-12 h-12 bg-primary-500/20 flex items-center justify-center mb-4 rounded-md">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <Heading as="h3" size="sm" className="mb-2">
                    {value.title}
                  </Heading>
                  <Text color="muted" size="sm">
                    {value.description}
                  </Text>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
