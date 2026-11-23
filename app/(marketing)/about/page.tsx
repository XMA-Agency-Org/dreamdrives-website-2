import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared";
import {
  StatsGrid,
  MissionSection,
  ValuesGrid,
  AboutCTA,
  ShowroomImage,
  type StatItem,
} from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
  description:
    "Learn about Dream Drives - Dubai's premier luxury car rental service with exceptional vehicles and outstanding customer service.",
};

// Only claims we can stand behind. No fleet size, years or customer counts until the client confirms them.
const stats: StatItem[] = [
  { value: "5.0", label: "Rated on Google" },
  { value: "Free", label: "Delivery anywhere in Dubai" },
  { value: "Daily", label: "Weekly and monthly rates" },
  { value: "1", label: "WhatsApp message to book" },
];

const missionBulletPoints = [
  "Handpicked selection of premium vehicles",
  "Personalized service tailored to your needs",
  "Daily, weekly and monthly rentals",
  "Booked on WhatsApp, delivered to your door",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tagline="Our Story"
        title="Redefining Luxury"
        gradientText="Car Rental in Dubai"
        description="Dream Drives was born from a passion for exceptional automobiles and an unwavering commitment to customer satisfaction. We believe that driving a luxury car should be an experience, not just transportation."
        size="large"
      />

      <ShowroomImage
        src="/images/about/showroom.jpg"
        alt="Dream Drives Dubai Showroom"
      />

      <StatsGrid stats={stats} />

      <MissionSection
        tagline="Our Mission"
        title="Delivering Extraordinary Experiences"
        description="We are more than a car rental company. We are curators of unforgettable experiences. Whether you're a tourist exploring Dubai's wonders, an influencer capturing content, or a business executive making an impression, we provide the perfect vehicle for every occasion."
        bulletPoints={missionBulletPoints}
        image="/images/about/lifestyle.jpg"
        imageAlt="Dubai luxury lifestyle"
      />

      <ValuesGrid tagline="Our Values" title="What Drives Us" />

      <AboutCTA />
    </>
  );
}
