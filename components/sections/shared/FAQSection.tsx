"use client";

import { faqData } from "@/data/faqs";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heading, Text, Badge, Button, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { FAQItem } from "./FAQItem";


interface FAQSectionProps {
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
  alternateBackground?: boolean;
}

export function FAQSection({
  limit,
  showHeader = true,
  showViewAll = true,
  alternateBackground = false,
}: FAQSectionProps) {
  const displayedFAQs = limit ? faqData.slice(0, limit) : faqData;

  return (
    <Section
      spacing="lg"
      background={alternateBackground ? "elevated" : "default"}
    >
        {/* Section Header */}
        {showHeader && (
          <RevealOnScroll className="text-center mb-12">
            <h2 className="mb-6 font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] sm:text-6xl">
              Good to know.
            </h2>
            <Text color="muted" size="lg" className="max-w-2xl mx-auto">
              Quick answers to common questions. Anything else, we&apos;re a
              WhatsApp away.
            </Text>
          </RevealOnScroll>
        )}

        {/* FAQ Items */}
        <RevealOnScroll>
          <div className="bezel mx-auto max-w-4xl"><div className="bezel-core p-6 lg:p-10">
            {displayedFAQs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={index === 0}
              />
            ))}
          </div></div>
        </RevealOnScroll>

        {/* View All Link */}
        {showViewAll && limit && limit < faqData.length && (
          <RevealOnScroll className="mt-8 text-center">
            <Button as={Link} href="/faq" variant="outline" size="lg">
              View All FAQs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </RevealOnScroll>
        )}
    </Section>
  );
}
