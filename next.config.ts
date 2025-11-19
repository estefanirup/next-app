import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/colmeia",
        destination: "http://192.168.30.66/api/nosql/colmeias",
      },
    ];
  },
};

export default nextConfig;
