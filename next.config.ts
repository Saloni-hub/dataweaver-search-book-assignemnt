import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/books/:id",
        destination: "http://64.227.142.191:8080/application-test-v1.1/books/:id",
      },
      {
        source: "/api/books",
        destination: "http://64.227.142.191:8080/application-test-v1.1/books",
      },
    ];
  },
};

export default nextConfig;
