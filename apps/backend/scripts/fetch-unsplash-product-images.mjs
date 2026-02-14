/**
 * Fetches Unsplash image URLs for a product by title and updates products.json.
 * Requires UNSPLASH_ACCESS_KEY (get one at https://unsplash.com/developers).
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=your_key node apps/backend/scripts/fetch-unsplash-product-images.mjs [productIndex]
 *   Default productIndex is 1 (second product = Samsung Galaxy S24).
 *
 * Example:
 *   UNSPLASH_ACCESS_KEY=xxx node apps/backend/scripts/fetch-unsplash-product-images.mjs 1
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = join(__dirname, '../src/data/products.json');

const key = process.env.UNSPLASH_ACCESS_KEY;
if (!key) {
  console.error('Missing UNSPLASH_ACCESS_KEY. Get one at https://unsplash.com/developers');
  process.exit(1);
}

const productIndex = parseInt(process.argv[2] ?? '1', 10);

const products = JSON.parse(readFileSync(productsPath, 'utf8'));
const product = products[productIndex];
if (!product) {
  console.error(`Product index ${productIndex} not found. Valid range: 0-${products.length - 1}`);
  process.exit(1);
}

const query = encodeURIComponent(product.title);
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${key}&per_page=3`;

console.log(`Searching Unsplash for: "${product.title}" (index ${productIndex})`);

const res = await fetch(url);
if (!res.ok) {
  console.error('Unsplash API error:', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const results = data.results ?? [];
if (results.length === 0) {
  console.error('No results found for:', product.title);
  process.exit(1);
}

const imageUrls = results.slice(0, 3).map((p) => {
  const u = p.urls?.regular ?? p.urls?.small ?? p.urls?.full;
  if (!u) return null;
  return u.includes('?') ? `${u}&w=600&q=80&fit=crop` : `${u}?w=600&q=80&fit=crop`;
}).filter(Boolean);

if (imageUrls.length === 0) {
  console.error('No image URLs in results');
  process.exit(1);
}

product.images = imageUrls;

if (product.variants) {
  for (const v of product.variants) {
    if (v.options) {
      for (const opt of v.options) {
        if (opt.thumbnail_url && imageUrls[0]) {
          opt.thumbnail_url = imageUrls[0].replace('w=600', 'w=400').replace('600&', '400&');
        }
      }
    }
  }
}

writeFileSync(productsPath, JSON.stringify(products, null, 2) + '\n', 'utf8');
console.log(`Updated product "${product.title}" with ${imageUrls.length} Unsplash image(s):`);
imageUrls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
