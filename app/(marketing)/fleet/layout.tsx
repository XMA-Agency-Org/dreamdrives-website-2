import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Car Fleet | Uptown Rent a Car Dubai",
  description:
    "Browse our complete collection of luxury and exotic cars in Dubai. Rolls Royce, Lamborghini, Ferrari, Bentley, Porsche and more available for rent.",
};

export default function FleetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
