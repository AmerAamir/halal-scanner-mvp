/** @type {import('next').NextConfig} */
const repo = 'halal-scanner-mvp'; // your repo name

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};
