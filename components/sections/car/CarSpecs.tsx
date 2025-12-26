"use client";

import { motion } from "motion/react";
import {
  Gauge,
  Zap,
  Fuel,
  Users,
  DoorOpen,
  Cog,
} from "lucide-react";
import { Heading, Text } from "@/components/ui";
import type { CarSpecs as CarSpecsType } from "@/types";

interface CarSpecsProps {
  specs: CarSpecsType;
}

const specItems = [
  { key: "engine", label: "Engine", icon: Cog },
  { key: "horsepower", label: "Power", icon: Zap, suffix: " HP" },
  { key: "acceleration", label: "0-100 km/h", icon: Gauge },
  { key: "topSpeed", label: "Top Speed", icon: Gauge, suffix: " km/h" },
  { key: "transmission", label: "Transmission", icon: Cog },
  { key: "fuelType", label: "Fuel Type", icon: Fuel },
  { key: "seats", label: "Seats", icon: Users },
  { key: "doors", label: "Doors", icon: DoorOpen },
];

export function CarSpecs({ specs }: CarSpecsProps) {
  return (
    <div>
      <Heading as="h2" size="md" className="mb-6">
        Specifications
      </Heading>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {specItems.map((item, index) => {
          const Icon = item.icon;
          const value = specs[item.key as keyof CarSpecsType];

          return (
            <motion.div
              key={item.key}
              className="p-4 bg-background-elevated border border-border rounded-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-2 text-primary-500 mb-2">
                <Icon className="w-4 h-4" />
                <Text size="xs" color="muted" className="uppercase tracking-wider">
                  {item.label}
                </Text>
              </div>
              <Text weight="semibold" size="lg">
                {value}
                {item.suffix || ""}
              </Text>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
