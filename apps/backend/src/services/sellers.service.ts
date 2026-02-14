import * as fs from 'fs';
import * as path from 'path';
import type { Seller } from '../types';

const SELLERS_FILE =
  process.env.NODE_ENV === 'test'
    ? path.join(process.cwd(), 'src', 'data', 'sellers.json')
    : path.join(__dirname, 'data', 'sellers.json');

function loadSellers(): Seller[] {
  const raw = fs.readFileSync(SELLERS_FILE, 'utf-8');
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error('sellers.json must contain an array of sellers');
  }
  return parsed as Seller[];
}

let cachedSellers: Seller[] | null = null;

function getSellersCache(): Seller[] {
  if (cachedSellers === null) {
    cachedSellers = loadSellers();
  }
  return cachedSellers;
}

/**
 * Returns all sellers.
 */
export function listSellers(): Seller[] {
  return getSellersCache();
}

/**
 * Returns seller by id, or null if not found.
 */
export function getSellerById(sellerId: string): Seller | null {
  const sellers = getSellersCache();
  const found = sellers.find((s) => s.id === sellerId) ?? null;
  return found;
}
