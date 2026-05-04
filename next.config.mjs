/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.pravatar.cc', 'pravatar.cc'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'pravatar.cc',
      }
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
