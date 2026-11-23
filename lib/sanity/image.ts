import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Sanity serves the original unless told otherwise; cap width and let the CDN pick AVIF/WebP. */
export function imageUrl(source: SanityImageSource, width = 1600): string {
  return builder.image(source).width(width).quality(80).auto("format").fit("max").url();
}
