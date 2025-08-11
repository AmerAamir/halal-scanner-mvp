/** @type {import('next').NextConfig} */
const repo = 'halal-scanner-mvp'; // your repo name

export default {
  output: 'export',              // needed for GitHub Pages
  images: { unoptimized: true }, // required for static export
  trailingSlash: true,           // avoids 404s on Pages
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};
