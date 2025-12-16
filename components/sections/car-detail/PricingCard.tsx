"use client";

import { MessageCircle, Phone, Check } from "lucide-react";
import { motion } from "motion/react";
import { Heading, Text, Button } from "@/components/ui";
import { formatPrice, getCarInquiryUrl } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import type { CarPricing } from "@/types";
import { Car } from "@/types";

interface PricingCardProps {
  car: Car;
}

export function PricingCard({ car }: PricingCardProps) {
  const { pricing, name: carName, year: carYear, features } = car;

  return (
    <motion.div className="lg:sticky lg:top-24 p-6 bg-background-elevated border border-border rounded-lg">
      {/* Price Display */}
      <Text size="2xl" weight="semibold" className="mb-4">
        {carName}
      </Text>
      <div className="mb-6">
        <Text size="sm" color="muted" className="mb-1">
          Starting from
        </Text>
        <div className="flex items-baseline gap-2">
          <Heading as="span" size="md" className="text-primary-500">
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
        {/* <div className="flex items-center justify-between pt-3 border-t border-border/50"> */}
        {/*   <Text color="subtle" size="sm"> */}
        {/*     Security Deposit */}
        {/*   </Text> */}
        {/*   <Text size="sm" color="subtle"> */}
        {/*     {formatPrice(pricing.deposit)} */}
        {/*   </Text> */}
        {/* </div> */}
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Button
          as="a"
          href={getCarInquiryUrl(carName, carYear)}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
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
