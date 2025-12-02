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
  description:
    "Learn about Uptown Rent a Car - Dubai's premier luxury car rental service with over 5 years of experience and 100+ premium vehicles.",
};

const stats: StatItem[] = [
  { value: "100+", label: "Luxury Vehicles" },
  { value: "5+", label: "Years Experience" },
  { value: "2000+", label: "Happy Customers" },
  { value: "24/7", label: "Support Available" },
];

const missionBulletPoints = [
  "Handpicked selection of premium vehicles",
  "Personalized service tailored to your needs",
  "Flexible rental options and transparent pricing",
  "Dedicated support team available around the clock",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tagline="Our Story"
        title="Redefining Luxury"
        gradientText="Car Rental in Dubai"
        description="Uptown Rent a Car was born from a passion for exceptional automobiles and an unwavering commitment to customer satisfaction. We believe that driving a luxury car should be an experience, not just transportation."
        size="large"
      />

      <ShowroomImage
        src="/images/about/showroom.jpg"
        alt="Uptown Dubai Showroom"
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
