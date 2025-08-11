/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true
  },
  output: 'export',
  // Ensure local workspace packages are transpiled by Next.js
  transpilePackages: ['@halalscanner/engine', '@halalscanner/rules']
};

module.exports = withPWA(nextConfig);