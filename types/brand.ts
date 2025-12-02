import type { CarBrand } from "./car";

export interface Brand {
  id: CarBrand;
  name: string;
  logo: string;
  description: string;
  country: string;
  founded: number;
  invert?: boolean;
}
