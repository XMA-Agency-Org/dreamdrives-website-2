"use client";

import { motion } from "motion/react";
import {
  Star,
  Wrench,
  Clock,
  Car,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { Container, Text } from "@/components/ui";

const trustItems = [
  {
    icon: Star,
    label: "5 Star Rated",
    description: "Premium service quality",
  },
  {
    icon: Wrench,
    label: "Roadside Assistance",
    description: "24/7 emergency support",
  },
  {
    icon: Clock,
    label: "24/7 Service",
    description: "Always available",
  },
  {
    icon: Car,
    label: "Newest Models",
    description: "Latest vehicle lineup",
  },
  {
    icon: Sparkles,
    label: "Clean Vehicles",
    description: "Sanitized & detailed",
  },
  {
    icon: CreditCard,
    label: "Cards Accepted",
    description: "Flexible payments",
  },
];

export function TrustSignals() {
  return (
    <section className="py-8 lg:py-12 bg-background-elevated border-y border-border">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <Text size="sm" weight="semibold" className="text-foreground">
                  {item.label}
                </Text>
                <Text size="xs" color="muted" className="hidden sm:block">
                  {item.description}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
