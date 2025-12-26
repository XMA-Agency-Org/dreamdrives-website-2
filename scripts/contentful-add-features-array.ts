import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "tsz5b6wk9hsp";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const CONTENT_TYPE_ID = "rentalVehicle";

if (!MANAGEMENT_TOKEN) {
  console.error("Error: CONTENTFUL_MANAGEMENT_TOKEN is not set.");
  process.exit(1);
}

async function main() {
  console.log("=== Add Vehicle Features Array Field ===\n");

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log(`Connected to space: ${space.name}\n`);

  let contentType = await environment.getContentType(CONTENT_TYPE_ID);
  console.log(`Found content type: ${contentType.name}`);

  const existingField = contentType.fields.find((f) => f.id === "vehicleFeatures");

  if (existingField) {
    console.log("vehicleFeatures field already exists. No changes needed.");
    return;
  }

  console.log("Adding vehicleFeatures field as Array of Symbol...");

  contentType.fields.push({
    id: "vehicleFeatures",
    name: "Vehicle Features",
    type: "Array",
    items: { type: "Symbol" },
    required: false,
    localized: true,
  });

  console.log("Updating content type...");
  contentType = await contentType.update();
  console.log("Content type updated.");

  console.log("Publishing content type...");
  await contentType.publish();
  console.log("Content type published.\n");

  console.log("Done! New vehicleFeatures field added.");
  console.log("The upload script will use this field for the features array.");
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
