import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

interface CarImage {
  carName: string;
  carSlug: string;
  category: string;
  images: string[];
  thumbnail: string | null;
}

const OUTPUT_DIR = "./public/uptown-images/cars";

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

function getFileNameFromUrl(url: string): string {
  const urlPath = new URL(url).pathname;
  return path.basename(urlPath);
}

async function main() {
  console.log("Loading car images data...");

  const dataPath = "./data/car-images.json";
  if (!existsSync(dataPath)) {
    console.error(
      "car-images.json not found. Run fetch-car-images.ts first."
    );
    process.exit(1);
  }

  const data = await readFile(dataPath, "utf-8");
  const carImages: CarImage[] = JSON.parse(data);

  console.log(`Found ${carImages.length} cars to process\n`);

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  let totalDownloaded = 0;
  let totalFailed = 0;

  for (const car of carImages) {
    const carDir = path.join(OUTPUT_DIR, car.category, car.carSlug);

    if (!existsSync(carDir)) {
      await mkdir(carDir, { recursive: true });
    }

    console.log(`\nDownloading images for: ${car.carName}`);
    console.log(`  Category: ${car.category}`);
    console.log(`  Images: ${car.images.length}`);

    for (let i = 0; i < car.images.length; i++) {
      const imageUrl = car.images[i];
      const fileName = getFileNameFromUrl(imageUrl);
      const outputPath = path.join(carDir, fileName);

      if (existsSync(outputPath)) {
        console.log(`  [SKIP] ${fileName} (already exists)`);
        continue;
      }

      const success = await downloadImage(imageUrl, outputPath);
      if (success) {
        totalDownloaded++;
        console.log(`  [OK] ${fileName}`);
      } else {
        totalFailed++;
        console.log(`  [FAIL] ${fileName}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    if (car.thumbnail) {
      const thumbnailName = `thumbnail-${getFileNameFromUrl(car.thumbnail)}`;
      const thumbnailPath = path.join(carDir, thumbnailName);

      if (!existsSync(thumbnailPath)) {
        const success = await downloadImage(car.thumbnail, thumbnailPath);
        if (success) {
          totalDownloaded++;
          console.log(`  [OK] ${thumbnailName} (thumbnail)`);
        }
      }
    }
  }

  console.log("\n=== Download Complete ===");
  console.log(`Downloaded: ${totalDownloaded} images`);
  console.log(`Failed: ${totalFailed} images`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

main().catch(console.error);
