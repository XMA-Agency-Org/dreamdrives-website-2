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
            <Badge variant="outline" size="sm" font="display" className="mb-4">
              FAQ
            </Badge>
            <Heading as="h2" size="lg" className="mb-6">
              Before You Ask
            </Heading>
            <Text color="muted" size="lg" className="max-w-2xl mx-auto">
              Quick answers to common questions. Still unsure? We&apos;re a
              WhatsApp away.
            </Text>
          </RevealOnScroll>
        )}

        {/* FAQ Items */}
        <RevealOnScroll>
          <div className="bg-background-elevated border border-border rounded-md p-6 lg:p-8">
            {displayedFAQs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={index === 0}
              />
            ))}
          </div>
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
