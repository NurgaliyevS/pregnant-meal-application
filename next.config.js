// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pregnantmeal.com',
        pathname: '/**',
      },
    ],
  },
};