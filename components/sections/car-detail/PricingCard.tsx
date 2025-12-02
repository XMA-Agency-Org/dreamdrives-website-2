"use client";

import { MessageCircle, Phone, Check } from "lucide-react";
import { motion } from "motion/react";
import { Heading, Text, Button } from "@/components/ui";
import { formatPrice, getCarInquiryUrl } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import type { CarPricing } from "@/types";

interface PricingCardProps {
  pricing: CarPricing;
  carName: string;
  carYear: number;
  features: string[];
}

export function PricingCard({ pricing, carName, carYear, features }: PricingCardProps) {
  return (
    <motion.div
      className="sticky top-24 p-6 bg-background-elevated border border-border rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Price Display */}
      <div className="mb-6">
        <Text size="sm" color="muted" className="mb-1">
          Starting from
        </Text>
        <div className="flex items-baseline gap-2">
          <Heading as="span" size="2xl" className="text-primary-500">
            {formatPrice(pricing.daily)}
          </Heading>
          <Text color="muted">/day</Text>
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex items-center justify-between">
          <Text color="muted">Daily Rate</Text>
          <Text weight="semibold">{formatPrice(pricing.daily)}</Text>
        </div>
        <div className="flex items-center justify-between">
          <Text color="muted">Weekly Rate</Text>
          <Text weight="semibold">{formatPrice(pricing.weekly)}</Text>
        </div>
        <div className="flex items-center justify-between">
          <Text color="muted">Monthly Rate</Text>
          <Text weight="semibold">{formatPrice(pricing.monthly)}</Text>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <Text color="subtle" size="sm">
            Security Deposit
          </Text>
          <Text size="sm" color="subtle">
            {formatPrice(pricing.deposit)}
          </Text>
        </div>
      </div>

      {/* Features included */}
      <div className="mb-6">
        <Text size="sm" weight="medium" className="mb-3">
          Included with rental:
        </Text>
        <div className="space-y-2">
          {features.slice(0, 4).map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="flex-none w-5 h-5 bg-primary-500/20 flex items-center justify-center rounded-sm">
                <Check className="w-3 h-3 text-primary-500" />
              </div>
              <Text size="sm" color="muted">
                {feature}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Button
          as="a"
          href={getCarInquiryUrl(carName, carYear)}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          className="w-full"
          leftIcon={<MessageCircle className="w-5 h-5" />}
        >
          Inquire on WhatsApp
        </Button>
        <Button
          as="a"
          href={`tel:${COMPANY.phoneClean}`}
          variant="secondary"
          size="lg"
          className="w-full"
          leftIcon={<Phone className="w-5 h-5" />}
        >
          Call Now
        </Button>
      </div>

      {/* Additional info */}
      <Text size="xs" color="subtle" className="text-center mt-4">
        Prices are exclusive of 5% VAT. Terms apply.
      </Text>
    </motion.div>
  );
}
