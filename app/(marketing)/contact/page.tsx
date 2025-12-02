import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/sections/shared";
import {
  ContactInfo,
  BusinessHours,
  ContactForm,
  MapPlaceholder,
  type ContactItem,
  type HoursItem,
} from "@/components/sections/contact";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Uptown Rent a Car. Available 24/7 for luxury car rental inquiries in Dubai. Call, WhatsApp, or visit our showroom.",
};

const contactInfo: ContactItem[] = [
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

const hours: HoursItem[] = [
  { day: "Monday - Friday", time: "24 Hours" },
  { day: "Saturday", time: "24 Hours" },
  { day: "Sunday", time: "24 Hours" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        tagline="Get in Touch"
        title="We're Here to"
        gradientText="Help"
        description="Have a question about our fleet or need assistance with a booking? Our team is available 24/7 to provide you with exceptional service."
      />

      {/* Contact Info & Form Section */}
      <section className="pb-24 bg-background">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              <ContactInfo items={contactInfo} />
              <BusinessHours hours={hours} />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="pb-24 bg-background">
        <Container>
          <MapPlaceholder address={COMPANY.address} />
        </Container>
      </section>
    </>
  );
}
