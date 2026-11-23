import { Section } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Cars for Rent in Dubai",
  alternates: { canonical: "/cars" },
  description:
    "The Dream Drives collection: Mercedes-AMG G63, Lamborghini Urus, Cadillac Escalade, Range Rover and more, with the daily price on every car and free delivery in Dubai.",
};

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Section className="mt-10">{children}</Section>;
}
