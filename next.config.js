/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible');

const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "0d3810ffb029f275b4526ce60d3098d7.r2.cloudflarestorage.com",
        port: "",
        pathname: "/pregnant-meal-images/**",
      },
    ],
  },
});

module.exports = nextConfig;