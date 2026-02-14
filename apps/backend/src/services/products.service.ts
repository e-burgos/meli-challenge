import * as fs from 'fs';
import * as path from 'path';
import type {
  Installments,
  Product,
  ProductDetail,
  ProductSummary,
} from '../types';
import { getSellerById } from './sellers.service';

const PRODUCTS_FILE =
  process.env.NODE_ENV === 'test'
    ? path.join(process.cwd(), 'src', 'data', 'products.json')
    : path.join(__dirname, 'data', 'products.json');

function loadProducts(): Product[] {
  const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error('products.json must contain an array of products');
  }
  return parsed as Product[];
}

function toSummary(p: Product): ProductSummary {
  const thumbnail = p.images?.[0] ?? undefined;
  const installments: Installments | undefined =
    p.installments != null ? p.installments : undefined;
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    currency_id: p.currency_id ?? undefined,
    original_price: p.original_price ?? undefined,
    thumbnail,
    condition: p.condition ?? undefined,
    seller_id: p.seller_id,
    installments,
    free_shipping: p.shipping?.free_shipping ?? undefined,
    shipping_label: p.shipping?.label ?? undefined,
  };
}

/**
 * Returns product summaries for the home list, optionally filtered by seller_id.
 */
export function listProducts(sellerId?: string): ProductSummary[] {
  const products = loadProducts();
  const filtered =
    sellerId != null && sellerId.trim() !== ''
      ? products.filter((p) => p.seller_id === sellerId)
      : products;
  return filtered.map(toSummary);
}

/**
 * Returns full product detail by id with seller resolved, or null if not found.
 */
export function getProductById(productId: string): ProductDetail | null {
  const products = loadProducts();
  const found = products.find((p) => p.id === productId) ?? null;
  if (found === null) {
    return null;
  }
  const seller = getSellerById(found.seller_id);
  if (seller === null) {
    throw new Error(
      `Seller not found for product ${found.id}: seller_id=${found.seller_id}`
    );
  }
  const images = Array.isArray(found.images) ? found.images : [];
  const detail: ProductDetail = {
    id: found.id,
    title: found.title,
    description: found.description ?? undefined,
    price: found.price,
    currency_id: found.currency_id ?? undefined,
    original_price: found.original_price ?? undefined,
    price_without_taxes: found.price_without_taxes ?? undefined,
    images,
    payment_methods: found.payment_methods ?? undefined,
    condition: found.condition ?? undefined,
    stock: found.stock ?? undefined,
    sold_quantity: found.sold_quantity ?? undefined,
    ratings: found.ratings ?? undefined,
    installments: found.installments ?? undefined,
    highlights: found.highlights ?? undefined,
    attributes: found.attributes ?? undefined,
    variants: found.variants ?? undefined,
    warranty: found.warranty ?? undefined,
    return_policy: found.return_policy ?? undefined,
    fulfillment_type: found.fulfillment_type ?? undefined,
    shipping: found.shipping ?? undefined,
    other_offers_count: found.other_offers_count ?? undefined,
    other_offers_min_price: found.other_offers_min_price ?? undefined,
    seller,
  };
  return detail;
}
