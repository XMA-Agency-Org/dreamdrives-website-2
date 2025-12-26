import { Suspense } from "react";
import { getAllCarsAsync } from "@/data/cars";
import { CarsPageClient } from "./CarsPageClient";

export default async function CarsPage() {
  const cars = await getAllCarsAsync();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CarsPageClient cars={cars} />
    </Suspense>
  );
}
