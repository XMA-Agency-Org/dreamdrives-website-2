import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "tsz5b6wk9hsp",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

interface VehicleEntry {
  fields: {
    vehicleName?: string;
    urlSlug?: string;
  };
}

async function main() {
  const response = await client.getEntries({
    content_type: "rentalVehicle",
    limit: 100,
    select: ["fields.vehicleName", "fields.urlSlug"],
  });

  console.log(`Total vehicles in Contentful: ${response.total}`);
  console.log("\nVehicle list:");
  (response.items as VehicleEntry[]).forEach((item, index) => {
    console.log(`${index + 1}. ${item.fields.vehicleName} (${item.fields.urlSlug})`);
  });
}

main().catch(console.error);
