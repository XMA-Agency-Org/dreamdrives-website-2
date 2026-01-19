import { createClient } from "contentful-management";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "tsz5b6wk9hsp";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";

if (!MANAGEMENT_TOKEN) {
  console.error("Error: CONTENTFUL_MANAGEMENT_TOKEN is not set in environment variables.");
  console.error("Please set it in .env.local or pass it directly.");
  process.exit(1);
}

type CarData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  year: number;
  tagline: string;
  description: string;
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    deposit: number;
    currency: string;
  };
  specs: {
    engine: string;
    horsepower: number;
    acceleration: string;
    topSpeed: number;
    transmission: string;
    fuelType: string;
    seats: number;
    doors: number;
  };
  features: string[];
  isFeatured?: boolean;
  isAvailable: boolean;
  color: string;
  interiorColor: string;
};

type CarImageData = {
  carName: string;
  carSlug: string;
  category: string;
  images: string[];
  thumbnail: string;
};

const cars: CarData[] = JSON.parse(
  readFileSync(join(projectRoot, "data", "cars-raw.json"), "utf-8")
);

const carImagesData: CarImageData[] = JSON.parse(
  readFileSync(join(projectRoot, "data", "car-images.json"), "utf-8")
);

const brandDisplayNames: Record<string, string> = {
  hyundai: "Hyundai",
  kia: "Kia",
  mazda: "Mazda",
  nissan: "Nissan",
  bmw: "BMW",
  mercedes: "Mercedes-Benz",
  "range-rover": "Range Rover",
  lamborghini: "Lamborghini",
};

const categoryDisplayNames: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
};

async function main() {
  console.log("=== Contentful Upload Script ===\n");
  console.log(`Loaded ${cars.length} cars from cars-raw.json\n`);

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log(`Connected to space: ${space.name}\n`);

  const brandEntries: Record<string, string> = {};
  const categoryEntries: Record<string, string> = {};

  console.log("--- Phase 1: Fetching existing brands and categories ---\n");

  const existingBrands = await environment.getEntries({
    content_type: "carRentalBrand",
    limit: 100,
  });

  for (const entry of existingBrands.items) {
    const slug = entry.fields.urlSlug?.["en-US"];
    if (slug) {
      brandEntries[slug] = entry.sys.id;
      console.log(`  Found brand: ${slug} (${entry.sys.id})`);
    }
  }

  const existingCategories = await environment.getEntries({
    content_type: "vehicleCategory",
    limit: 100,
  });

  for (const entry of existingCategories.items) {
    const slug = entry.fields.urlSlug?.["en-US"];
    if (slug) {
      categoryEntries[slug] = entry.sys.id;
      console.log(`  Found category: ${slug} (${entry.sys.id})`);
    }
  }

  console.log("\n--- Phase 2: Creating missing brands ---\n");

  const requiredBrands = [...new Set(cars.map((c) => c.brand))];
  for (const brandSlug of requiredBrands) {
    if (!brandEntries[brandSlug]) {
      console.log(`  Creating brand: ${brandSlug}`);
      const entry = await environment.createEntry("carRentalBrand", {
        fields: {
          brandName: { "en-US": brandDisplayNames[brandSlug] || brandSlug },
          urlSlug: { "en-US": brandSlug },
        },
      });
      await entry.publish();
      brandEntries[brandSlug] = entry.sys.id;
      console.log(`    Created and published: ${entry.sys.id}`);
    }
  }

  console.log("\n--- Phase 3: Creating missing categories ---\n");

  const requiredCategories = [...new Set(cars.map((c) => c.category))];
  for (const catSlug of requiredCategories) {
    if (!categoryEntries[catSlug]) {
      console.log(`  Creating category: ${catSlug}`);
      const entry = await environment.createEntry("vehicleCategory", {
        fields: {
          categoryName: { "en-US": categoryDisplayNames[catSlug] || catSlug },
          urlSlug: { "en-US": catSlug },
        },
      });
      await entry.publish();
      categoryEntries[catSlug] = entry.sys.id;
      console.log(`    Created and published: ${entry.sys.id}`);
    }
  }

  console.log("\n--- Phase 4: Uploading images and creating vehicles ---\n");

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const car of cars) {
    console.log(`\nProcessing: ${car.name}`);

    try {
      const imageData = carImagesData.find((c) => c.carSlug === car.slug);
      if (!imageData) {
        console.log(`  No image data found for ${car.slug}`);
        failed++;
        continue;
      }

      const existingVehicles = await environment.getEntries({
        content_type: "rentalVehicle",
        "fields.urlSlug": car.slug,
        limit: 1,
      });

      const isUpdate = existingVehicles.items.length > 0;
      let existingEntry = isUpdate ? existingVehicles.items[0] : null;

      let assetIds: string[] = [];

      if (isUpdate && existingEntry) {
        const existingMainImage = existingEntry.fields.mainImage?.["en-US"]?.sys?.id;
        const existingGallery = existingEntry.fields.imageGallery?.["en-US"] || [];

        if (existingMainImage) {
          assetIds.push(existingMainImage);
          for (const img of existingGallery) {
            if (img?.sys?.id) {
              assetIds.push(img.sys.id);
            }
          }
          console.log(`  Reusing ${assetIds.length} existing images`);
        }
      }

      if (assetIds.length === 0) {
        console.log(`  Uploading ${imageData.images.length} images...`);

        for (let i = 0; i < imageData.images.length; i++) {
          const imagePath = imageData.images[i];
          const fullPath = join(projectRoot, "public", imagePath);
          const fileName = imagePath.split("/").pop() || `image-${i}.jpg`;
          const contentType = fileName.endsWith(".jpeg") || fileName.endsWith(".jpg")
            ? "image/jpeg"
            : "image/png";

          try {
            const fileBuffer = readFileSync(fullPath);
            const base64 = fileBuffer.toString("base64");

            const asset = await environment.createAssetFromFiles({
              fields: {
                title: { "en-US": `${car.name} - Image ${i + 1}` },
                file: {
                  "en-US": {
                    contentType,
                    fileName,
                    file: Buffer.from(base64, "base64"),
                  },
                },
              },
            });

            await asset.processForAllLocales();

            let processedAsset = await environment.getAsset(asset.sys.id);
            let attempts = 0;
            while (!processedAsset.fields.file?.["en-US"]?.url && attempts < 10) {
              await new Promise((r) => setTimeout(r, 1000));
              processedAsset = await environment.getAsset(asset.sys.id);
              attempts++;
            }

            await processedAsset.publish();
            assetIds.push(processedAsset.sys.id);
            console.log(`    Uploaded: ${fileName}`);
          } catch (imgErr) {
            console.log(`    Failed: ${fileName} - ${imgErr}`);
          }
        }

        if (assetIds.length === 0) {
          console.log(`  No images uploaded, skipping vehicle creation`);
          failed++;
          continue;
        }
      }

      const vehicleFields = {
        vehicleName: { "en-US": car.name },
        urlSlug: { "en-US": car.slug },
        description: {
          "en-US": {
            nodeType: "document",
            data: {},
            content: [
              {
                nodeType: "paragraph",
                data: {},
                content: [{ nodeType: "text", value: car.description, marks: [], data: {} }],
              },
            ],
          },
        },
        dailyPrice: { "en-US": car.pricing.daily },
        weeklyPrice: { "en-US": car.pricing.weekly },
        monthlyPrice: { "en-US": car.pricing.monthly },
        depositAmount: { "en-US": car.pricing.deposit },
        brand: {
          "en-US": {
            sys: { type: "Link", linkType: "Entry", id: brandEntries[car.brand] },
          },
        },
        category: {
          "en-US": {
            sys: { type: "Link", linkType: "Entry", id: categoryEntries[car.category] },
          },
        },
        modelYear: { "en-US": car.year },
        tagline: { "en-US": car.tagline },
        engine: { "en-US": car.specs.engine },
        horsepower: { "en-US": car.specs.horsepower },
        accelerationTime: { "en-US": car.specs.acceleration.replace(/[^\d.]/g, "") || "0" },
        topSpeed: { "en-US": car.specs.topSpeed },
        transmissionType: { "en-US": car.specs.transmission },
        fuelType: { "en-US": car.specs.fuelType },
        passengerCount: { "en-US": car.specs.seats },
        doorCount: { "en-US": car.specs.doors },
        vehicleFeatures: { "en-US": car.features },
        featuredFlag: { "en-US": car.isFeatured || false },
        availabilityStatus: { "en-US": car.isAvailable },
        exteriorColor: { "en-US": car.color },
        interiorColor: { "en-US": car.interiorColor },
        mainImage: {
          "en-US": {
            sys: { type: "Link", linkType: "Asset", id: assetIds[0] },
          },
        },
        imageGallery: {
          "en-US": assetIds.slice(1).map((id) => ({
            sys: { type: "Link", linkType: "Asset", id },
          })),
        },
      };

      if (isUpdate && existingEntry) {
        console.log(`  Updating existing entry: ${existingEntry.sys.id}`);

        if (existingEntry.sys.publishedVersion) {
          existingEntry = await existingEntry.unpublish();
        }

        existingEntry.fields = vehicleFields;
        const updatedEntry = await existingEntry.update();
        await updatedEntry.publish();
        updated++;
        console.log(`  Updated and published: ${car.name}`);
      } else {
        console.log(`  Creating new entry...`);
        const entry = await environment.createEntry("rentalVehicle", {
          fields: vehicleFields,
        });
        await entry.publish();
        created++;
        console.log(`  Created and published: ${car.name}`);
      }
    } catch (err) {
      console.log(`  Failed: ${err}`);
      failed++;
    }
  }

  console.log("\n=== Summary ===");
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Failed: ${failed}`);
  console.log("\nDone!");
}

main().catch(console.error);
