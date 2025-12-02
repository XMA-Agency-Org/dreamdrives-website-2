"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

interface ContactItem {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
}

const contactItems: ContactItem[] = [
  {
    icon: Phone,
    label: "Phone",
    value: COMPANY.phone,
    href: `tel:${COMPANY.phoneClean}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: COMPANY.phone,
    href: getWhatsAppUrl(),
    isExternal: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: COMPANY.address,
    href: "https://maps.google.com/?q=Dubai,UAE",
    isExternal: true,
  },
];

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className }: ContactInfoProps) {
  return (
    <RevealOnScroll className={className}>
      <div className="space-y-4">
        {contactItems.map((item) => {
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
