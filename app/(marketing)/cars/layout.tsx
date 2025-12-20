import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Cars for Rent | Dream Drives Dubai",
  description:
    "Browse our complete collection of luxury cars in Dubai. Mercedes, BMW, Range Rover, and more premium vehicles available for rent.",
};

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
