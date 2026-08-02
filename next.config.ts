import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.29.170:3000', '192.168.29.170'],
  devIndicators: false
};

export default nextConfig;
