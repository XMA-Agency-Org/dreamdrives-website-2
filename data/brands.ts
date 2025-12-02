import type { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "rolls-royce",
    name: "Rolls-Royce",
    logo: "/images/brands/rolls-royce.svg",
    description: "The pinnacle of luxury automotive craftsmanship since 1906.",
    country: "United Kingdom",
    founded: 1906,
  },
  {
    id: "lamborghini",
    name: "Lamborghini",
    logo: "/images/brands/lamborghini.svg",
    description: "Italian manufacturer of luxury sports cars and SUVs.",
    country: "Italy",
    founded: 1963,
  },
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "/images/brands/ferrari.svg",
    description: "Italian luxury sports car manufacturer synonymous with racing excellence.",
    country: "Italy",
    founded: 1947,
  },
  {
    id: "bentley",
    name: "Bentley",
    logo: "/images/brands/bentley.svg",
    description: "British manufacturer of luxury grand tourers and SUVs.",
    country: "United Kingdom",
    founded: 1919,
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    logo: "/images/brands/mercedes.svg",
    description: "German manufacturer of luxury vehicles, buses, coaches, and trucks.",
    country: "Germany",
    founded: 1926,
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "/images/brands/bmw.svg",
    description: "German multinational manufacturer of luxury vehicles and motorcycles.",
    country: "Germany",
    founded: 1916,
  },
  {
    id: "porsche",
    name: "Porsche",
    logo: "/images/brands/porsche.svg",
    description: "German automobile manufacturer specializing in high-performance sports cars.",
    country: "Germany",
    founded: 1931,
  },
  {
    id: "range-rover",
    name: "Range Rover",
    logo: "/images/brands/range-rover.svg",
    description: "British manufacturer of luxury all-terrain vehicles.",
    country: "United Kingdom",
    founded: 1970,
  },
  {
    id: "audi",
    name: "Audi",
    logo: "/images/brands/audi.svg",
    description: "German automobile manufacturer known for sophisticated engineering.",
    country: "Germany",
    founded: 1909,
  },
  {
    id: "mclaren",
    name: "McLaren",
    logo: "/images/brands/mclaren.svg",
    description: "British automotive manufacturer of luxury, high-performance supercars.",
    country: "United Kingdom",
    founded: 1963,
  },
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}
