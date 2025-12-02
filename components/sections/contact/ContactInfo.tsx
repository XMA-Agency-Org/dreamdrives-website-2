"use client";

import { type LucideIcon } from "lucide-react";
import { Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
}

interface ContactInfoProps {
  items: ContactItem[];
  className?: string;
}

export function ContactInfo({ items, className }: ContactInfoProps) {
  return (
    <RevealOnScroll className={className}>
      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className="flex items-start gap-4 p-4 bg-background-elevated border border-border hover:border-primary-500/50 transition-all group rounded-md"
            >
              <div className="flex-none w-12 h-12 bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors rounded-md">
                <Icon className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <Text size="sm" color="muted" className="mb-1">
                  {item.label}
                </Text>
                <Text
                  weight="medium"
                  className="group-hover:text-primary-500 transition-colors"
                >
                  {item.value}
                </Text>
              </div>
            </a>
          );
        })}
      </div>
    </RevealOnScroll>
  );
}
