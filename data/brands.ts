import type { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "rolls-royce",
    name: "Rolls-Royce",
    logo: "/brands/rolls-royce.svg",
    description: "The pinnacle of luxury automotive craftsmanship since 1906.",
    country: "United Kingdom",
    founded: 1906,
  },
  {
    id: "lamborghini",
    name: "Lamborghini",
    logo: "/brands/lamborghini.svg",
    description: "Italian manufacturer of luxury sports cars and SUVs.",
    country: "Italy",
    founded: 1963,
  },
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "/brands/ferrari-logo-2002-download.png",
    description: "Italian luxury sports car manufacturer synonymous with racing excellence.",
    country: "Italy",
    founded: 1947,
  },
  {
    id: "bentley",
    name: "Bentley",
    logo: "/brands/bentley-logo-2002-download.png",
    description: "British manufacturer of luxury grand tourers and SUVs.",
    country: "United Kingdom",
    founded: 1919,
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
    id: "porsche",
    name: "Porsche",
    logo: "/brands/porsche-logo-2014-download.png",
    description: "German automobile manufacturer specializing in high-performance sports cars.",
    country: "Germany",
    founded: 1931,
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
