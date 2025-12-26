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
  console.log("=== Fix Features Field Type ===\n");

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log(`Connected to space: ${space.name}\n`);

  let contentType = await environment.getContentType(CONTENT_TYPE_ID);
  console.log(`Found content type: ${contentType.name}`);
  console.log(`Current fields: ${contentType.fields.length}\n`);

  const featuresFieldIndex = contentType.fields.findIndex((f) => f.id === "features");

  if (featuresFieldIndex === -1) {
    console.log("Features field not found. Adding it as Array of Symbol...");
    contentType.fields.push({
      id: "features",
      name: "Features",
      type: "Array",
      items: { type: "Symbol" },
      required: false,
      localized: true,
    });
  } else {
    const currentField = contentType.fields[featuresFieldIndex];
    console.log(`Current features field type: ${currentField.type}`);

    if (currentField.type === "Text") {
      console.log("Removing Text field and replacing with Array of Symbol...");

      contentType.fields.splice(featuresFieldIndex, 1);

      contentType.fields.push({
        id: "features",
        name: "Features",
        type: "Array",
        items: { type: "Symbol" },
        required: false,
        localized: true,
      });
    } else if (currentField.type === "Array") {
      console.log("Features field is already an Array. No changes needed.");
      return;
    }
  }

  console.log("\nUpdating content type...");
  contentType = await contentType.update();
  console.log("Content type updated.");

  console.log("Publishing content type...");
  await contentType.publish();
  console.log("Content type published.\n");

  console.log("Done! The features field is now an Array of Symbol.");
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
