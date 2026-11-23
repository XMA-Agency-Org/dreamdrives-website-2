export type CarCategory =
  | "sedan"
  | "suv";

export type CarBrand =
  | "rolls-royce"
  | "lamborghini"
  | "ferrari"
  | "bentley"
  | "mercedes"
  | "bmw"
  | "porsche"
  | "range-rover"
  | "audi"
  | "mclaren"
  | "aston-martin"
  | "chevrolet"
  | "cadillac"
  | "mini"
  | "gmc"
  | "nissan"
  | "maserati"
  | "hyundai"
  | "kia"
  | "mazda";

export interface CarImage {
  src: string;
  alt: string;
  isPrimary?: boolean;
  angle?: string;
}

/** Per-car rental terms. Empty fields fall back to Site settings; still-empty fields are hidden, never guessed. */
export interface CarIncluded {
  kmPerDay?: number;
  extraKmAed?: number;
  insurance?: string;
  depositRefundDays?: number;
  minimumAge?: number;
}

export interface CarPricing {
  daily: number;
  weekly: number;
  monthly: number;
  deposit: number;
  currency: "AED";
}

export interface CarSpecs {
  engine: string;
  horsepower: number;
  acceleration: string;
  topSpeed: number;
  transmission: "Automatic" | "Manual" | "Dual-Clutch" | "PDK";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  seats: number;
  doors: number;
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: CarBrand;
  category: CarCategory;
  year: number;
  tagline: string;
  description: string;
  images: CarImage[];
  pricing: CarPricing;
  specs: CarSpecs;
  features: string[];
  isFeatured?: boolean;
  isAvailable: boolean;
  color: string;
  interiorColor: string;
  variant?: string;
  plate?: string;
  brandName?: string;
  useCases?: string[];
  included?: CarIncluded;
}

export interface CarFilters {
  brand?: CarBrand;
  category?: CarCategory;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
