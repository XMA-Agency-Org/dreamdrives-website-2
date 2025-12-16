"use client";

import { Heading, Text, Button, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { getWhatsAppUrl } from "@/lib/utils";

interface AboutCTAProps {
  className?: string;
}

export function AboutCTA({ className }: AboutCTAProps) {
  return (
    <Section spacing="xl" className={className}>
        <RevealOnScroll className="text-center max-w-2xl mx-auto">
          <Heading as="h2" size="xl" className="mb-6">
            Ready to Experience the{" "}
            <span className="text-gradient">Difference</span>?
          </Heading>
          <Text color="muted" size="lg" className="mb-8">
            Contact us today and discover why we&apos;re Dubai&apos;s most trusted
            luxury car rental service.
          </Text>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as="a"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              Get in Touch
            </Button>
            <Button as="a" href="/cars" variant="outline" size="lg">
              Browse Cars
            </Button>
          </div>
        </RevealOnScroll>
    </Section>
  );
}
