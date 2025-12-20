"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Heading, Text, Badge, Section } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { VALUE_PROPOSITIONS } from "@/lib/constants";

const features = [
  "24/7 Roadside Assistance",
  "Free Delivery & Pickup",
  "Comprehensive Insurance",
  "Unlimited Mileage Options",
  "Airport Transfer Available",
  "Flexible Payment Methods",
];

export function ExperienceSection() {
  return (
    <Section spacing="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <RevealOnScroll direction="left" className="relative">
            <div className="relative aspect-[4/5] overflow-clip rounded-lg">
              {/* Main Image */}
              <div className="absolute inset-0 bg-background-elevated">
                <Image
                  src="/images/experience/dubai-lifestyle.jpg"
                  alt="Dubai luxury lifestyle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Floating stat card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 p-6 glass rounded-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="sm" color="muted" className="mb-1">
                      Starting from
                    </Text>
                    <Heading as="span" size="lg" className="text-primary-500">
                      250 AED
                    </Heading>
                    <Text size="sm" color="subtle">
                      /day
                    </Text>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-right">
                    <Text size="sm" color="muted" className="mb-1">
                      Premium Cars
                    </Text>
                    <Heading as="span" size="lg">
                      100+
                    </Heading>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-primary-500/20 -z-10 rounded-lg" />
          </RevealOnScroll>

          {/* Content Side */}
          <RevealOnScroll direction="right">
            <Badge variant="outline" size="sm" font="display" className="mb-4">
              Why Choose Us
            </Badge>
            <Heading as="h2" size="2xl" className="mb-6">
              More Than Just{" "}
              <span className="text-gradient">Car Rental</span>
            </Heading>
            <Text color="muted" size="lg" className="mb-8 leading-relaxed">
              At Dream Drives, we deliver an experience that transcends
              traditional car rental. From the moment you contact us to the
              second you return the keys, every interaction is crafted for your
              satisfaction.
            </Text>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-none w-6 h-6 bg-primary-500/20 flex items-center justify-center rounded-sm">
                    <Check className="w-4 h-4 text-primary-500" />
                  </div>
                  <Text color="muted">{feature}</Text>
                </motion.div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-6 border-t border-border">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-background-elevated border-2 border-background flex items-center justify-center text-xs font-medium text-foreground-muted rounded-sm"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <Text size="sm" weight="semibold">
                  2000+ Happy Customers
                </Text>
                <Text size="sm" color="subtle">
                  Trusted by travelers worldwide
                </Text>
              </div>
            </div>
          </RevealOnScroll>
        </div>
    </Section>
  );
}
