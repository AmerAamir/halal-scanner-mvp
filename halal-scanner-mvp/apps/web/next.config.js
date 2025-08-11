/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined, // ← add this
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  output: 'export',
  transpilePackages: ['@halalscanner/engine', '@halalscanner/rules'],
};

module.exports = withPWA(nextConfig);
