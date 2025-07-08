import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/breweries/:path*",
        destination: "https://api.openbrewerydb.org/v1/breweries/:path*",
      },
    ];
  },
};

export default nextConfig;
