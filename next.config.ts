import type { NextConfig } from "next";
import { legacyRedirects } from "./legacy-redirects";

const nextConfig: NextConfig = {
  // Hide the floating dev badge so local demos look like the real site.
  devIndicators: false,
  // Lets pages built ahead of time know when they were built (e.g. to close expired job adverts).
  env: { BUILD_TIME: String(Date.now()) },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
  },
};

export default nextConfig;
