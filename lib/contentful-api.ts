import { contentfulClient, isContentfulConfigured } from "./contentful";
import type { Car, CarImage, CarBrand, CarCategory, CarSpecs, CarPricing } from "@/types/car";
import type { Entry, Asset } from "contentful";

interface ContentfulRichText {
  content?: Array<{
    nodeType?: string;
    content?: Array<{
      value?: string;
    }>;
  }>;
}

interface ContentfulBrand {
  brandName: string;
  urlSlug: string;
}

interface ContentfulCategory {
  categoryName: string;
  urlSlug: string;
}

interface ContentfulRentalVehicle {
  vehicleName: string;
  urlSlug: string;
  description?: ContentfulRichText;
  dailyPrice: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  depositAmount?: number;
  brand?: Entry<ContentfulBrand>;
  category?: Entry<ContentfulCategory>;
  modelYear?: number;
  tagline?: string;
  engine?: string;
  horsepower?: number;
  accelerationTime?: string;
  topSpeed?: number;
  transmissionType?: string;
  fuelType?: string;
  passengerCount?: number;
  doorCount?: number;
  features?: string[];
  mainImage?: Asset;
  imageGallery?: Asset[];
  featuredFlag?: boolean;
  availabilityStatus?: boolean;
  exteriorColor?: string;
  interiorColor?: string;
}

const VALID_BRANDS: CarBrand[] = [
  "rolls-royce", "lamborghini", "ferrari", "bentley", "mercedes",
  "bmw", "porsche", "range-rover", "audi", "mclaren",
  "aston-martin", "chevrolet", "cadillac", "mini", "gmc",
  "nissan", "maserati"
];

const VALID_CATEGORIES: CarCategory[] = [
  "supercar", "luxury-sedan", "suv", "sports", "convertible", "coupe"
];

function extractTextFromRichText(richText?: ContentfulRichText): string {
  if (!richText?.content) return "";

  return richText.content
    .map((node) => {
      if (node.nodeType === "paragraph" && node.content) {
        return node.content.map((textNode) => textNode.value || "").join("");
      }
      return "";
    })
    .join("\n")
    .trim();
}

function extractYearFromName(name: string): number {
  const yearMatch = name.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
}

function normalizeBrand(brandSlug?: string): CarBrand {
  if (!brandSlug) return "mercedes";
  const normalized = brandSlug.toLowerCase().replace(/\s+/g, "-");
  return VALID_BRANDS.includes(normalized as CarBrand)
    ? (normalized as CarBrand)
    : "mercedes";
}

function normalizeCategory(categorySlug?: string): CarCategory {
  if (!categorySlug) return "luxury-sedan";
  const normalized = categorySlug.toLowerCase().replace(/\s+/g, "-");
  return VALID_CATEGORIES.includes(normalized as CarCategory)
    ? (normalized as CarCategory)
    : "luxury-sedan";
}

function normalizeTransmission(transmission?: string): CarSpecs["transmission"] {
  const t = transmission?.toLowerCase() || "";
  if (t.includes("manual")) return "Manual";
  if (t.includes("dual") || t.includes("dct")) return "Dual-Clutch";
  if (t.includes("pdk")) return "PDK";
  return "Automatic";
}

function normalizeFuelType(fuelType?: string): CarSpecs["fuelType"] {
  const f = fuelType?.toLowerCase() || "";
  if (f.includes("diesel")) return "Diesel";
  if (f.includes("hybrid")) return "Hybrid";
  if (f.includes("electric")) return "Electric";
  return "Petrol";
}

function getAssetUrl(asset?: Asset): string {
  const url = asset?.fields?.file?.url;
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

function transformContentfulToCar(entry: Entry<ContentfulRentalVehicle>): Car {
  const fields = entry.fields;
  const dailyPrice = fields.dailyPrice || 500;

  const images: CarImage[] = [];

  const mainImageUrl = getAssetUrl(fields.mainImage);
  if (mainImageUrl) {
    images.push({
      src: mainImageUrl,
      alt: fields.vehicleName || "Car image",
      isPrimary: true,
    });
  }

  if (fields.imageGallery) {
    fields.imageGallery.forEach((asset) => {
      const url = getAssetUrl(asset);
      if (url && url !== mainImageUrl) {
        images.push({
          src: url,
          alt: fields.vehicleName || "Car image",
        });
      }
    });
  }

  const pricing: CarPricing = {
    daily: dailyPrice,
    weekly: fields.weeklyPrice || Math.round(dailyPrice * 6),
    monthly: fields.monthlyPrice || Math.round(dailyPrice * 25),
    deposit: fields.depositAmount || Math.round(dailyPrice * 3),
    currency: "AED",
  };

  const specs: CarSpecs = {
    engine: fields.engine || "V8",
    horsepower: fields.horsepower || 400,
    acceleration: fields.accelerationTime || "4.5s  km/h",
    topSpeed: fields.topSpeed || 280,
    transmission: normalizeTransmission(fields.transmissionType),
    fuelType: normalizeFuelType(fields.fuelType),
    seats: fields.passengerCount || 4,
    doors: fields.doorCount || 4,
  };

  const brandSlug = fields.brand?.fields?.urlSlug;
  const categorySlug = fields.category?.fields?.urlSlug;

  return {
    id: fields.urlSlug || entry.sys.id,
    slug: fields.urlSlug || entry.sys.id,
    name: fields.vehicleName || "Unknown Vehicle",
    brand: normalizeBrand(brandSlug),
    category: normalizeCategory(categorySlug),
    year: fields.modelYear || extractYearFromName(fields.vehicleName || ""),
    tagline: fields.tagline || `Experience the ${fields.vehicleName || "luxury"}`,
    description: extractTextFromRichText(fields.description) || `Rent the ${fields.vehicleName} in Dubai.`,
    images,
    pricing,
    specs,
    features: fields.features || ["GPS Navigation", "Bluetooth", "Premium Sound System"],
    isFeatured: fields.featuredFlag ?? false,
    isAvailable: fields.availabilityStatus ?? true,
    color: fields.exteriorColor || "Black",
    interiorColor: fields.interiorColor || "Black Leather",
  };
}

export async function getAllVehiclesFromContentful(): Promise<Car[]> {
  if (!isContentfulConfigured() || !contentfulClient) {
    return [];
  }

  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: "rentalVehicle",
      include: 2,
      limit: 1000,
    });

    return response.items.map(transformContentfulToCar);
  } catch (error) {
    console.error("Error fetching vehicles from Contentful:", error);
    return [];
  }
}

export async function getVehicleBySlugFromContentful(slug: string): Promise<Car | null> {
  if (!isContentfulConfigured() || !contentfulClient) {
    return null;
  }

  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: "rentalVehicle",
      "fields.urlSlug": slug,
      include: 2,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformContentfulToCar(response.items[0]);
  } catch (error) {
    console.error("Error fetching vehicle by slug:", error);
    return null;
  }
}

export async function getFeaturedVehiclesFromContentful(): Promise<Car[]> {
  if (!isContentfulConfigured() || !contentfulClient) {
    return [];
  }

  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: "rentalVehicle",
      "fields.featuredFlag": true,
      include: 2,
    });

    return response.items.map(transformContentfulToCar);
  } catch (error) {
    console.error("Error fetching featured vehicles:", error);
    return [];
  }
}

export async function getVehiclesByBrandFromContentful(brandSlug: string): Promise<Car[]> {
  if (!isContentfulConfigured() || !contentfulClient) {
    return [];
  }

  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: "rentalVehicle",
      "fields.brand.fields.urlSlug": brandSlug,
      "fields.brand.sys.contentType.sys.id": "carRentalBrand",
      include: 2,
    });

    return response.items.map(transformContentfulToCar);
  } catch (error) {
    console.error("Error fetching vehicles by brand:", error);
    return [];
  }
}

export async function getVehiclesByCategoryFromContentful(categorySlug: string): Promise<Car[]> {
  if (!isContentfulConfigured() || !contentfulClient) {
    return [];
  }

  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: "rentalVehicle",
      "fields.category.fields.urlSlug": categorySlug,
      "fields.category.sys.contentType.sys.id": "vehicleCategory",
      include: 2,
    });

    return response.items.map(transformContentfulToCar);
  } catch (error) {
    console.error("Error fetching vehicles by category:", error);
    return [];
  }
}
