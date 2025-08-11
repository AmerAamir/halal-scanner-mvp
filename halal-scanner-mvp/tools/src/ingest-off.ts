#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import fetch from 'node-fetch';
import { program } from 'commander';

/**
 * Fetch products from Open Food Facts for a given country.
 * This script respects the public API and should be used with small limits
 * to avoid hitting rate limits.  The resulting JSON is stored in the
 * `cache` directory.
 */
program
  .option('--country <code>', 'Two‑letter country code (e.g. CA)', 'CA')
  .option('--limit <n>', 'Number of products to fetch', '50');

program.parse(process.argv);

interface Product {
  code: string;
  product_name: string;
  ingredients_text: string;
}

async function run() {
  const { country, limit } = program.opts();
  const n = parseInt(limit, 10);
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=${n}&country=${country}&fields=code,product_name,ingredients_text`;
  console.log(`Fetching ${n} products for ${country} from Open Food Facts...`);
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch: ${resp.status}`);
  }
  const data = await resp.json() as { products: Product[] };
  const cacheDir = path.join(__dirname, '..', 'cache');
  await fs.mkdir(cacheDir, { recursive: true });
  const filePath = path.join(cacheDir, `${country}.json`);
  await fs.writeFile(filePath, JSON.stringify(data.products, null, 2));
  console.log(`Saved ${data.products.length} products to ${filePath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});