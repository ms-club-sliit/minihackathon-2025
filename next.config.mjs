/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  // Ensure assets are properly handled during build
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Allow external images for ticket generation
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.cdnfonts.com',
      },
    ],
    unoptimized: true, // Helps with static export
  },
  // Ensure all static files are included
  trailingSlash: false,
  // Better handling of static assets
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
