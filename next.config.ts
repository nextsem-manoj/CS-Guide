import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.29.170:3000', '192.168.29.170', '192.168.29.170:3001', '192.168.29.2:3001', '192.168.29.2', 'localhost:3001'],
  devIndicators: false,
  turbopack: {},
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;
