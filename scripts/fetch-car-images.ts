import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const BASE_URL = "https://www.uptowndxb.com";
const OUTPUT_DIR = "./public/uptown-images/cars";

interface CarImage {
  carName: string;
  carSlug: string;
  category: string;
  images: string[];
  thumbnail: string | null;
}

interface CarPageData {
  url: string;
  category: string;
  slug: string;
}

async function getCarPageUrls(): Promise<CarPageData[]> {
  const categories = [
    "sport-cars",
    "luxury-cars",
    "suv",
    "convertible",
    "exotic-cars",
    "all-cars",
  ];

  const carPages: CarPageData[] = [];

  for (const category of categories) {
    try {
      const response = await fetch(`${BASE_URL}/Rent/${category}/`);
      const html = await response.text();

      const productLinkRegex =
        /href="(https:\/\/www\.uptowndxb\.com\/Rental\/[^"]+)"/g;
      let match;

      while ((match = productLinkRegex.exec(html)) !== null) {
        const url = match[1].replace(/\/$/, "");
        const slug = url.split("/").pop() || "";

        const urlCategory = url.split("/Rental/")[1]?.split("/")[0] || category;

        if (!carPages.find((p) => p.url === url)) {
          carPages.push({
            url,
            category: urlCategory,
            slug,
          });
        }
      }

      console.log(`Found ${carPages.length} car pages in ${category}`);
    } catch (error) {
      console.error(`Error fetching category ${category}:`, error);
    }
  }

  return carPages;
}

async function extractImagesFromCarPage(
  pageData: CarPageData
): Promise<CarImage | null> {
  try {
    const response = await fetch(pageData.url);
    const html = await response.text();

    const images: string[] = [];

    const wpContentRegex =
      /https:\/\/www\.uptowndxb\.com\/wp-content\/uploads\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi;
    let match;

    while ((match = wpContentRegex.exec(html)) !== null) {
      const imageUrl = match[0];

      const isCarImage =
        !imageUrl.includes("Milage") &&
        !imageUrl.includes("Engine-size") &&
        !imageUrl.includes("Car-Seat") &&
        !imageUrl.includes("Free-Delivery") &&
        !imageUrl.includes("5-Star") &&
        !imageUrl.includes("Road-side") &&
        !imageUrl.includes("Clean-Cars") &&
        !imageUrl.includes("New-Models") &&
        !imageUrl.includes("Credit-Card") &&
        !imageUrl.includes("24-7") &&
        !imageUrl.includes("Favicon") &&
        !imageUrl.includes("logo") &&
        !imageUrl.includes("-100x100") &&
        !imageUrl.includes("-150x150");

      if (isCarImage && !images.includes(imageUrl)) {
        images.push(imageUrl);
      }
    }

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const carName = titleMatch
      ? titleMatch[1].replace(" - Uptown Rent a Car", "").trim()
      : pageData.slug;

    const ogImageMatch = html.match(
      /og:image"\s*content="([^"]+)"/i
    );
    const thumbnail = ogImageMatch ? ogImageMatch[1] : null;

    return {
      carName,
      carSlug: pageData.slug,
      category: pageData.category,
      images: images.filter((img) => !img.includes("-300x300")),
      thumbnail,
    };
  } catch (error) {
    console.error(`Error fetching ${pageData.url}:`, error);
    return null;
  }
}

async function downloadImage(
  url: string,
  outputPath: string
): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status}`);
      return false;
    }

    const buffer = await response.arrayBuffer();
    await writeFile(outputPath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return false;
  }
}

async function main() {
  console.log("Starting car image scraper...\n");

  console.log("Step 1: Fetching car page URLs...");
  const carPages = await getCarPageUrls();
  console.log(`Found ${carPages.length} unique car pages\n`);

  console.log("Step 2: Extracting images from each car page...");
  const allCarImages: CarImage[] = [];

  for (let i = 0; i < carPages.length; i++) {
    const pageData = carPages[i];
    console.log(
      `Processing ${i + 1}/${carPages.length}: ${pageData.slug}`
    );

    const carImage = await extractImagesFromCarPage(pageData);
    if (carImage) {
      allCarImages.push(carImage);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\nExtracted images from ${allCarImages.length} car pages\n`);

  console.log("Step 3: Saving results...");

  if (!existsSync("./data")) {
    await mkdir("./data", { recursive: true });
  }

  await writeFile(
    "./data/car-images.json",
    JSON.stringify(allCarImages, null, 2)
  );
  console.log("Saved car images data to ./data/car-images.json");

  const summary = {
    totalCars: allCarImages.length,
    totalImages: allCarImages.reduce((acc, car) => acc + car.images.length, 0),
    byCategory: allCarImages.reduce(
      (acc, car) => {
        acc[car.category] = (acc[car.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    cars: allCarImages.map((car) => ({
      name: car.carName,
      slug: car.carSlug,
      category: car.category,
      imageCount: car.images.length,
      thumbnail: car.thumbnail,
    })),
  };

  await writeFile(
    "./data/car-images-summary.json",
    JSON.stringify(summary, null, 2)
  );
  console.log("Saved summary to ./data/car-images-summary.json");

  console.log("\n=== Summary ===");
  console.log(`Total cars: ${summary.totalCars}`);
  console.log(`Total images: ${summary.totalImages}`);
  console.log("\nBy category:");
  Object.entries(summary.byCategory).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} cars`);
  });
}

main().catch(console.error);
