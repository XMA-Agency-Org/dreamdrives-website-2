import type { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "lamborghini",
    name: "Lamborghini",
    logo: "/brands/lamborghini.svg",
    description: "Italian manufacturer of luxury sports cars and SUVs.",
    country: "Italy",
    founded: 1963,
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    logo: "/brands/Mercedes-Benz-logo-2009-1920x1080.png",
    description: "German manufacturer of luxury vehicles, buses, coaches, and trucks.",
    country: "Germany",
    founded: 1926,
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "/brands/bmw-logo-2020-white-download.png",
    description: "German multinational manufacturer of luxury vehicles and motorcycles.",
    country: "Germany",
    founded: 1916,
  },
  {
    id: "audi",
    name: "Audi",
    logo: "/brands/audi-logo-2016-download.png",
    description: "German automobile manufacturer known for sophisticated engineering.",
    country: "Germany",
    founded: 1909,
    invert: true,
  },
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}
