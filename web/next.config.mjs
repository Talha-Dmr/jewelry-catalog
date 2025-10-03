/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com'
      }
    ]
  }
};

export default config;
