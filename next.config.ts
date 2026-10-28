import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating dev badge so local demos look like the real site.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
  },
};

export default nextConfig;
