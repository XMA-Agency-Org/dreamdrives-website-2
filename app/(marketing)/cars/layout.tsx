import { Section } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Cars for Rent in Dubai",
  alternates: { canonical: "/cars" },
  description:
    "Browse our complete collection of luxury cars in Dubai. Mercedes, BMW, Range Rover, and more premium vehicles available for rent.",
};

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Section className="mt-10">{children}</Section>;
}
