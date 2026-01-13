import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jestersimpps.github.io",
      },
    ],
  },
};

export default nextConfig;
