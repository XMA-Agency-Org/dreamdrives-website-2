"use client";

import { motion } from "motion/react";
import {
  Crown,
  Armchair,
  Route,
  Gem,
  Briefcase,
  LayoutGrid,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import { Container, Heading, Text, Badge } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";

const advantages = [
  {
    icon: Crown,
    title: "Unmatched Style",
    description:
      "Make a memorable impression at high-profile events or while exploring the city with vehicles from prestigious brands.",
  },
  {
    icon: Armchair,
    title: "Optimal Comfort",
    description:
      "High-end interiors, state-of-the-art technology, and superior performance for an unparalleled driving experience.",
  },
  {
    icon: Route,
    title: "Flexibility",
    description:
      "Explore Dubai at your own pace without dependency on public transport. Perfect for spontaneous travel plans.",
  },
  {
    icon: Gem,
    title: "Elite Lifestyle",
    description:
      "Experience the luxury and extravagance that Dubai is famous for, even if just for a short duration.",
  },
  {
    icon: Briefcase,
    title: "Business Ready",
    description:
      "Project a successful image for business meetings and corporate events. Ideal for professionals.",
  },
  {
    icon: LayoutGrid,
    title: "Wide Selection",
    description:
      "From sleek convertibles to powerful sports cars and spacious SUVs - something for every taste and need.",
  },
  {
    icon: PiggyBank,
    title: "Cost-Effective",
    description:
      "Enjoy luxury at a fraction of ownership cost. No worries about maintenance, insurance, or depreciation.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Advanced safety features and comprehensive insurance for peace of mind on Dubai's roads.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="py-24 lg:py-16 bg-background">
      <Container>
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-12">
          <Badge variant="outline" size="sm" font="display" className="mb-4">
            Why Choose Us
          </Badge>
          <Heading as="h2" size="2xl" className="mb-6">
            The Uptown Advantage
          </Heading>
          <Text color="muted" size="lg" className="max-w-2xl mx-auto">
            Discover why discerning travelers choose Uptown Rent a Car for their
            luxury driving experience in Dubai.
          </Text>
        </RevealOnScroll>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-6 bg-background-elevated border border-border rounded-md hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-md bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <advantage.icon className="w-6 h-6 text-primary-500" />
              </div>
              <Heading as="h3" size="xs" className="mb-2">
                {advantage.title}
              </Heading>
              <Text size="sm" color="muted">
                {advantage.description}
              </Text>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
