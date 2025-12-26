import type { Car } from "@/types";
import { getImagesForSlug } from "./cars";
import carsRawData from "./cars-raw.json";

type RawCar = Omit<Car, "images">;

const cars: Car[] = (carsRawData as RawCar[]).map((car) => ({
  ...car,
  images: getImagesForSlug(car.slug),
}));

export default cars;
