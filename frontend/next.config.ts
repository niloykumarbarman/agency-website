import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // In local dev, Next's image optimizer blocks "localhost" because it
    // resolves to a loopback/private IP (SSRF protection), even though
    // remotePatterns explicitly allows it. Disabling optimization only in
    // development sidesteps this; production (devliora.com, a public
    // domain) keeps full optimization.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5240",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "devliora.com",
      },
    ],
  },
};

export default nextConfig;
