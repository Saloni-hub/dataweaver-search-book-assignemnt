/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/books',
          destination: 'http://64.227.142.191:8080/application-test-v1.1/books',
        },
        {
          source: '/api/books/:path*',
          destination: 'http://64.227.142.191:8080/application-test-v1.1/books/:path*',
        }
      ];
    },
  }
  
  module.exports = nextConfig