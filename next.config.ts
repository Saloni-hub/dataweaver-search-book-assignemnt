/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://64.227.142.191:8080/application-test-v1.1/:path*',
        },
      ];
    },
  }
  
  module.exports = nextConfig