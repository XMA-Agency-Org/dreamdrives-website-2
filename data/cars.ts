import type { Car } from "@/types";
import carImagesData from "./car-images.json";
import cars from "./cars-data";

type CarImageData = {
  carName: string;
  carSlug: string;
  category: string;
  images: string[];
  thumbnail: string;
};

export function getImagesForSlug(
  slug: string,
): { src: string; alt: string; isPrimary?: boolean }[] {
  const carData = (carImagesData as CarImageData[]).find(
    (car) => car.carSlug === slug,
  );
  if (!carData) return [];

  return carData.images
    .filter((img) => !img.includes("UPTOWN-LOGO"))
    .map((src, index) => ({
      src,
      alt: carData.carName,
      isPrimary: index === 0,
    }));
}

export function getThumbnail(slug: string): string {
  const carData = (carImagesData as CarImageData[]).find(
    (car) => car.carSlug === slug,
  );
  return carData?.thumbnail || "";
}

export function getFeaturedCars(): Car[] {
  return cars.filter((car) => car.isFeatured && car.isAvailable);
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((car) => car.slug === slug);
}

export function getCarsByBrand(brand: string): Car[] {
  return cars.filter((car) => car.brand === brand && car.isAvailable);
}

export function getCarsByCategory(category: string): Car[] {
  return cars.filter((car) => car.category === category && car.isAvailable);
}

export function getSimilarCars(car: Car, limit: number = 4): Car[] {
  return cars
    .filter(
      (c) =>
        c.id !== car.id &&
        c.isAvailable &&
        (c.brand === car.brand || c.category === car.category),
    )
    .slice(0, limit);
}
