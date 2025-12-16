"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heading, Text, Badge, Button, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { FAQItem } from "./FAQItem";

export const faqData = [
  {
    question: "What documents are required to rent a luxury car in Dubai?",
    answer:
      "For UAE Residents: Emirates ID and a valid UAE driving license. For Tourists: Passport, visit visa, and either your home country driving license or an International Driving Permit (IDP). Some nationalities can rent directly with their home country license.",
  },
  {
    question: "What is the age requirement for renting a luxury car?",
    answer:
      "The minimum age requirement is generally 21 years for regular luxury cars and 23 years for sports cars and supercars. A valid driving license held for at least 1-2 years is typically required.",
  },
  {
    question: "Can I rent a luxury car without a credit card?",
    answer:
      "Yes! While credit cards are commonly used for security deposits, we also accept cash and debit cards. Contact us directly to discuss alternative payment arrangements for your rental.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Yes, basic comprehensive insurance is included in all our rental prices. Additional coverage options, like collision damage waiver (CDW) and zero excess coverage, are available for extra peace of mind.",
  },
  {
    question: "Are there mileage limits when renting?",
    answer:
      "Yes, we set daily, weekly, or monthly mileage limits depending on your rental duration. Standard packages include generous mileage allowances. Exceeding limits incurs additional charges per kilometer.",
  },
  {
    question: "Do you offer airport pickup and drop-off?",
    answer:
      "Absolutely! We provide complimentary delivery and pickup services at Dubai International Airport (DXB) and Al Maktoum International Airport. We can also deliver to your hotel or any location in Dubai.",
  },
  {
    question: "What types of luxury cars are available?",
    answer:
      "We have Ferrari, Lamborghini, Rolls Royce, Bentley, Mercedes-Benz, BMW, Porsche, Range Rover, and many more. From supercars to luxury SUVs, we have options for every preference.",
  },
  {
    question: "Is it cheaper to rent or buy a luxury car in Dubai?",
    answer:
      "Renting is significantly more cost-effective for short to medium-term use. You avoid high purchase prices, maintenance costs, insurance premiums, and rapid depreciation typical of luxury vehicles.",
  },
  {
    question: "Can tourists use their home country driving license?",
    answer:
      "Tourists from GCC countries, USA, UK, Canada, Australia, and most European countries can use their home country license. Others may need an International Driving Permit (IDP) alongside their original license.",
  },
];

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
            <Heading as="h2" size="2xl" className="mb-6">
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
