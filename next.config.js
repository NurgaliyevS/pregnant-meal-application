/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible');

const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  images: {
    domains: [
      '0d3810ffb029f275b4526ce60d3098d7.r2.cloudflarestorage.com',
      'pregnantmeal.com',  // Add your domain
      'localhost:3000'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "0d3810ffb029f275b4526ce60d3098d7.r2.cloudflarestorage.com",
        port: "",
        pathname: "/pregnant-meal-images/**",
      },
      {
        protocol: "https",
        hostname: "pregnantmeal.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
});

module.exports = nextConfig;