import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://64.227.142.191:8080/application-test-v1.1';

    return [
      {
        source: "/api/books", 
        destination: `${apiUrl}/books`,
      },
      {
        source: "/api/books/:id", 
        destination: `${apiUrl}/books/:id`,
      },
    ];
  },
};

export default nextConfig;
