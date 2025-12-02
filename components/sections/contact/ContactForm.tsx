"use client";

import { MessageCircle } from "lucide-react";
import { Heading, Text, Button, Input, Textarea, Select } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { getWhatsAppUrl } from "@/lib/utils";

const carCategories = [
  { value: "supercar", label: "Supercars" },
  { value: "luxury-sedan", label: "Luxury Sedans" },
  { value: "suv", label: "SUVs" },
  { value: "sports", label: "Sports Cars" },
  { value: "convertible", label: "Convertibles" },
];

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  return (
    <RevealOnScroll direction="right" className={className}>
      <div className="p-8 bg-background-elevated border border-border rounded-lg">
        <Heading as="h2" size="lg" className="mb-2">
          Send us a Message
        </Heading>
        <Text color="muted" className="mb-8">
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </Text>

        <form className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              id="name"
              name="name"
              label="Full Name"
              placeholder="Your name"
              required
            />
            <Input
              type="tel"
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="+971 XX XXX XXXX"
              required
            />
          </div>

          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="you@example.com"
            required
          />

          <Select
            id="carInterest"
            name="carInterest"
            label="Car of Interest (Optional)"
            placeholder="Select a car category"
            options={carCategories}
          />

          <Textarea
            id="message"
            name="message"
            label="Message"
            placeholder="Tell us about your rental needs..."
            rows={4}
            required
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" className="flex-1">
              Send Message
            </Button>
            <Button
              as="a"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              leftIcon={<MessageCircle className="w-5 h-5" />}
            >
              WhatsApp Instead
            </Button>
          </div>
        </form>
      </div>
    </RevealOnScroll>
  );
}
