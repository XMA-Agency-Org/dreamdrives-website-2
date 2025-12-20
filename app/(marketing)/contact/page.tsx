import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { PageHero } from "@/components/sections/shared";
import {
  ContactInfo,
  BusinessHours,
  ContactForm,
  MapPlaceholder,
  type HoursItem,
} from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dream Drives. Available 24/7 for luxury car rental inquiries in Dubai. Call, WhatsApp, or visit our office.",
};

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
        description="Have a question about our cars or need assistance with a booking? Our team is available 24/7 to provide you with exceptional service."
      />

      <Section spacing="none" className="pb-24">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <ContactInfo />
              <BusinessHours hours={hours} />
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
      </Section>

      <Section spacing="none" className="pb-24">
          <MapPlaceholder />
      </Section>
    </>
  );
}
