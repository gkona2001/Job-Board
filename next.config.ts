import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "gagan-job-board.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "gagan-job-board.s3.amazonaws.com",
      }
    ],
  },
};

export default nextConfig;
