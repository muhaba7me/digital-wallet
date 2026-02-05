import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Disable TypeScript errors during production builds (optional)
    ignoreBuildErrors: false,
  },
  images: {
    qualities: [100],
  },
  /* config options here */
};

export default nextConfig;
