"use client";

import { motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { Container, Heading, Text, Button, Badge, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { trackPhoneClick } from "@/lib/analytics";

export function CTASection() {
  return (
    <Section spacing="lg" containerSize="none" className="relative overflow-clip">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background to-background" />

      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-500/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-500/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary-500/20" />

      <Container className="relative z-10">
        <RevealOnScroll className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" size="md" font="display" className="mb-4">
            Ready to Experience Luxury?
          </Badge>

          <Heading as="h2" size="2xl" className="mb-6">
            Book Your Dream Car{" "}
            <span className="text-gradient">Today</span>
          </Heading>

          <Text color="muted" size="lg" className="mb-10 max-w-2xl mx-auto">
            Contact us now for instant quotes and availability. Our team is
            ready to help you find the perfect luxury vehicle for your Dubai
            experience.
          </Text>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as="a"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              leftIcon={<MessageCircle className="w-5 h-5" />}
            >
              WhatsApp Us Now
            </Button>
            <Button
              as="a"
              href={`tel:${COMPANY.phoneClean}`}
              onClick={() => trackPhoneClick("cta_section")}
              variant="secondary"
              size="lg"
              leftIcon={<Phone className="w-5 h-5" />}
            >
              {COMPANY.phone}
            </Button>
          </div>

          {/* Additional info */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Badge variant="ghost" size="sm" shape="soft">
              24/7 Available
            </Badge>
            <Badge variant="ghost" size="sm" shape="soft">
              Instant Response
            </Badge>
            <Badge variant="ghost" size="sm" shape="soft">
              Best Price Guarantee
            </Badge>
          </motion.div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
