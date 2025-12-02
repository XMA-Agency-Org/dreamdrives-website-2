"use client";

import { Clock } from "lucide-react";
import { Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";

export interface HoursItem {
  day: string;
  time: string;
}

interface BusinessHoursProps {
  hours: HoursItem[];
  delay?: number;
  className?: string;
}

export function BusinessHours({ hours, delay = 0.2, className }: BusinessHoursProps) {
  return (
    <RevealOnScroll delay={delay} className={className}>
      <div className="p-6 bg-background-elevated border border-border rounded-md">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-primary-500" />
          <Heading as="h3" size="xs">
            Business Hours
          </Heading>
        </div>
        <div className="space-y-3">
          {hours.map((item) => (
            <div key={item.day} className="flex items-center justify-between">
              <Text size="sm" color="muted">
                {item.day}
              </Text>
              <Text size="sm" weight="medium" color="primary">
                {item.time}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}
