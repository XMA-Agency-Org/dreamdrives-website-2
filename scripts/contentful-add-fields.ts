import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "tsz5b6wk9hsp";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const CONTENT_TYPE_ID = "rentalVehicle";

if (!MANAGEMENT_TOKEN) {
  console.error("Error: CONTENTFUL_MANAGEMENT_TOKEN is not set in environment variables.");
  console.error("Please set it in .env.local or pass it directly.");
  process.exit(1);
}

type FieldDefinition = {
  id: string;
  name: string;
  type: "Symbol" | "Integer" | "Boolean" | "Array" | "Text";
  items?: { type: "Symbol" };
  required?: boolean;
};

const fieldsToAdd: FieldDefinition[] = [
  { id: "weeklyPrice", name: "Weekly Price", type: "Integer" },
  { id: "monthlyPrice", name: "Monthly Price", type: "Integer" },
  { id: "depositAmount", name: "Deposit Amount", type: "Integer" },
  { id: "modelYear", name: "Model Year", type: "Integer" },
  { id: "tagline", name: "Tagline", type: "Symbol" },
  { id: "engine", name: "Engine", type: "Symbol" },
  { id: "horsepower", name: "Horsepower", type: "Integer" },
  { id: "accelerationTime", name: "Acceleration Time", type: "Symbol" },
  { id: "topSpeed", name: "Top Speed", type: "Integer" },
  { id: "transmissionType", name: "Transmission Type", type: "Symbol" },
  { id: "fuelType", name: "Fuel Type", type: "Symbol" },
  { id: "passengerCount", name: "Passenger Count", type: "Integer" },
  { id: "doorCount", name: "Door Count", type: "Integer" },
  { id: "features", name: "Features", type: "Array", items: { type: "Symbol" } },
  { id: "featuredFlag", name: "Featured", type: "Boolean" },
  { id: "availabilityStatus", name: "Available", type: "Boolean" },
  { id: "exteriorColor", name: "Exterior Color", type: "Symbol" },
  { id: "interiorColor", name: "Interior Color", type: "Symbol" },
];

async function main() {
  console.log("=== Contentful Add Fields Script ===\n");

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log(`Connected to space: ${space.name}`);
  console.log(`Environment: ${ENVIRONMENT_ID}\n`);

  let contentType = await environment.getContentType(CONTENT_TYPE_ID);
  console.log(`Found content type: ${contentType.name} (${CONTENT_TYPE_ID})`);
  console.log(`Current fields: ${contentType.fields.length}\n`);

  const existingFieldIds = new Set(contentType.fields.map((f) => f.id));
  let addedCount = 0;
  let skippedCount = 0;

  for (const fieldDef of fieldsToAdd) {
    if (existingFieldIds.has(fieldDef.id)) {
      console.log(`  SKIP: ${fieldDef.id} (already exists)`);
      skippedCount++;
      continue;
    }

    console.log(`  ADD: ${fieldDef.id} (${fieldDef.type})`);

    const newField: {
      id: string;
      name: string;
      type: string;
      required: boolean;
      localized: boolean;
      items?: { type: string };
    } = {
      id: fieldDef.id,
      name: fieldDef.name,
      type: fieldDef.type,
      required: fieldDef.required ?? false,
      localized: true,
    };

    if (fieldDef.items) {
      newField.items = { type: fieldDef.items.type };
    }

    contentType.fields.push(newField);
    addedCount++;
  }

  if (addedCount > 0) {
    console.log(`\nUpdating content type with ${addedCount} new fields...`);
    contentType = await contentType.update();
    console.log("Content type updated successfully.");

    console.log("Publishing content type...");
    await contentType.publish();
    console.log("Content type published successfully.");
  }

  console.log("\n=== Summary ===");
  console.log(`  Added: ${addedCount}`);
  console.log(`  Skipped (already exist): ${skippedCount}`);
  console.log(`  Total fields now: ${contentType.fields.length}`);
  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
