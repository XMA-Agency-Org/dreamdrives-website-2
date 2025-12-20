import type { MetadataRoute } from "next";
import { getAllBrandsWithCount, getAllCars } from "@/data/cars";
import { CAR_BODY_TYPES, CAR_CATEGORIES } from "@/lib/constants";

const BASE_URL = "https://dreamdrives.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const brands = getAllBrandsWithCount();
  const cars = getAllCars();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/cars`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE_URL}/cars/brand/${brand.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const bodyTypePages: MetadataRoute.Sitemap = CAR_BODY_TYPES.filter(
    (type) => type.id !== "all",
  ).map((type) => ({
    url: `${BASE_URL}/cars/body-type/${type.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = CAR_CATEGORIES.filter(
    (cat) => cat.id !== "all",
  ).map((cat) => ({
    url: `${BASE_URL}/cars/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const carPages: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${BASE_URL}/cars/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...brandPages,
    ...bodyTypePages,
    ...categoryPages,
    ...carPages,
  ];
}
