import type { Car, CarBrand, CarCategory, CarSpecs } from "@/types";
import { sanityFetch } from "@/lib/sanity/client";
import { imageUrl } from "@/lib/sanity/image";
import { ALL_CARS, CAR_BY_SLUG } from "@/lib/sanity/queries";
import snapshot from "./fleet-snapshot.json";
import { studioStill } from "./studio-stills";

/**
 * Fleet data. Sanity (project gzcp7ons) is the source of truth.
 * - Async functions read Sanity, cached under the "cars" tag; a Sanity webhook hits
 *   /api/revalidate to refresh within seconds of an edit.
 * - Sync functions read data/fleet-snapshot.json (regenerate with `bun scripts/snapshot-fleet.ts`).
 *   They exist for client components (nav counts) and as the fallback if Sanity is unreachable.
 */

type SanityCar = {
  _id: string; name: string; slug: string; variant?: string; plate?: string; bodyType?: string; year?: number;
  tagline?: string; description?: string; useCases?: string[]; featured?: boolean; available?: boolean;
  dailyPrice: number; weeklyPrice?: number; monthlyPrice?: number; deposit?: number; included?: Car["included"];
  engine?: string; horsepower?: number; acceleration?: string; topSpeed?: number; transmission?: string; fuelType?: string;
  seats?: number; doors?: number; exteriorColor?: string; interiorColor?: string; features?: string[];
  brand?: { name: string; slug: string }; category?: { name: string; slug: string };
  mainImage?: { alt?: string; asset: unknown }; gallery?: { alt?: string; angle?: string; asset: unknown }[];
};

function transmission(t?: string): CarSpecs["transmission"] {
  const v = (t ?? "").toLowerCase();
  if (v.includes("manual")) return "Manual";
  if (v.includes("dual") || v.includes("dct")) return "Dual-Clutch";
  if (v.includes("pdk")) return "PDK";
  return "Automatic";
}
function fuel(f?: string): CarSpecs["fuelType"] {
  const v = (f ?? "").toLowerCase();
  if (v.includes("diesel")) return "Diesel";
  if (v.includes("hybrid")) return "Hybrid";
  if (v.includes("electric")) return "Electric";
  return "Petrol";
}

/** No invented defaults: a missing spec becomes 0 or "", and the UI hides it. */
export function toCar(c: SanityCar): Car {
  const still = studioStill(c.slug);
  const images = [
    // The studio still leads (consistent premium look); his real photos follow in the gallery.
    ...(still ? [{ src: still, alt: `${c.name} in the Dream Drives studio`, isPrimary: true, angle: "studio" }] : []),
    ...(c.mainImage?.asset ? [{ src: imageUrl(c.mainImage), alt: c.mainImage.alt || c.name, isPrimary: !still }] : []),
    ...(c.gallery ?? []).filter((g) => g?.asset).map((g) => ({ src: imageUrl(g), alt: g.alt || c.name, angle: g.angle })),
  ];
  return {
    id: c.slug, slug: c.slug, name: c.name,
    brand: (c.brand?.slug ?? "") as CarBrand, brandName: c.brand?.name,
    category: (c.bodyType === "suv" ? "suv" : "sedan") as CarCategory,
    year: c.year ?? 0, tagline: c.tagline ?? "", description: c.description ?? "",
    images,
    pricing: { daily: c.dailyPrice, weekly: c.weeklyPrice ?? 0, monthly: c.monthlyPrice ?? 0, deposit: c.deposit ?? 0, currency: "AED" },
    specs: {
      engine: c.engine ?? "", horsepower: c.horsepower ?? 0, acceleration: c.acceleration ? `${c.acceleration.replace(/s$/, "")}s` : "",
      topSpeed: c.topSpeed ?? 0, transmission: transmission(c.transmission), fuelType: fuel(c.fuelType),
      seats: c.seats ?? 0, doors: c.doors ?? 0,
    },
    features: c.features ?? [],
    isFeatured: c.featured ?? false, isAvailable: c.available ?? true,
    color: c.exteriorColor ?? "", interiorColor: c.interiorColor ?? "",
    variant: c.variant, plate: c.plate, useCases: c.useCases, included: c.included,
  };
}

const fleet = snapshot as unknown as Car[];

// ---------- async (server components) ----------

export async function getAllCarsAsync(): Promise<Car[]> {
  try {
    const cars = await sanityFetch<SanityCar[]>(ALL_CARS, {}, ["sanity", "cars"]);
    if (cars?.length) return cars.map(toCar);
  } catch (e) {
    console.error("Sanity fetch failed, using snapshot", e);
  }
  return getAllCars();
}

export async function getCarBySlugAsync(slug: string): Promise<Car | undefined> {
  try {
    const car = await sanityFetch<SanityCar | null>(CAR_BY_SLUG, { slug }, ["sanity", "cars", `car:${slug}`]);
    if (car) return toCar(car);
  } catch (e) {
    console.error("Sanity fetch failed, using snapshot", e);
  }
  return getCarBySlug(slug);
}

export async function getFeaturedCarsAsync(): Promise<Car[]> {
  return (await getAllCarsAsync()).filter((c) => c.isFeatured);
}
export async function getCarsByBrandAsync(brand: string): Promise<Car[]> {
  return (await getAllCarsAsync()).filter((c) => c.brand === brand);
}
export async function getCarsByCategoryAsync(category: string): Promise<Car[]> {
  return (await getAllCarsAsync()).filter((c) => c.category === category);
}
export async function getCarsByBodyTypeAsync(bodyType: string): Promise<Car[]> {
  return (await getAllCarsAsync()).filter((c) => c.category === bodyType);
}
/** Similar = same body type, closest daily price. */
export async function getSimilarCarsAsync(car: Car, limit = 4): Promise<Car[]> {
  return (await getAllCarsAsync())
    .filter((c) => c.slug !== car.slug && c.category === car.category)
    .sort((a, b) => Math.abs(a.pricing.daily - car.pricing.daily) - Math.abs(b.pricing.daily - car.pricing.daily))
    .slice(0, limit);
}

// ---------- sync (snapshot) ----------

export function getAllCars(): Car[] {
  return fleet.filter((c) => c.isAvailable);
}
export function getCarBySlug(slug: string): Car | undefined {
  return fleet.find((c) => c.slug === slug);
}
export function getFeaturedCars(): Car[] {
  return getAllCars().filter((c) => c.isFeatured);
}
export function getCarsByBrand(brand: string): Car[] {
  return getAllCars().filter((c) => c.brand === brand);
}
export function getCarsByCategory(category: string): Car[] {
  return getAllCars().filter((c) => c.category === category);
}
export function getCarsByBodyType(bodyType: string): Car[] {
  return getCarsByCategory(bodyType);
}
export function getSimilarCars(car: Car, limit = 4): Car[] {
  return getAllCars().filter((c) => c.slug !== car.slug && c.category === car.category).slice(0, limit);
}
export function getTotalCarCount(): number {
  return getAllCars().length;
}
export function getCarCountByBrand(): Record<string, number> {
  return getAllCars().reduce<Record<string, number>>((acc, c) => ((acc[c.brand] = (acc[c.brand] || 0) + 1), acc), {});
}
export function getCarCountByCategory(): Record<string, number> {
  return getAllCars().reduce<Record<string, number>>((acc, c) => ((acc[c.category] = (acc[c.category] || 0) + 1), acc), {});
}

/** Only brands that actually have cars in the fleet. */
export function getAllBrandsWithCount(): { id: string; name: string; count: number }[] {
  const counts = getCarCountByBrand();
  const names = new Map(getAllCars().map((c) => [c.brand, c.brandName ?? getBrandDisplayName(c.brand)]));
  return [...names.entries()]
    .map(([id, name]) => ({ id, name, count: counts[id] || 0 }))
    .sort((a, b) => b.count - a.count);
}

export function getBrandDisplayName(brandId: string): string {
  const fromFleet = fleet.find((c) => c.brand === brandId)?.brandName;
  if (fromFleet) return fromFleet;
  return brandId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
