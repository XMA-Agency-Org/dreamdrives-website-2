import type { NextConfig } from "next";

/**
 * No longer `output: "export"`: the site runs as a normal Next app on Vercel so it can use
 * image optimisation, tag revalidation from Sanity (app/api/revalidate) and the /go/* tracking routes.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
