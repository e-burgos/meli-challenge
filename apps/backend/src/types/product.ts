import type { Seller } from './seller';

/** Ratings for product (average and review count). */
export interface ProductRatings {
  average: number;
  count: number;
}

/** Installments info — e.g. "12 cuotas de $ 92.499". */
export interface Installments {
  quantity: number;
  amount: number;
}

/** Shipping info for display (free shipping, label, pickup, etc.). */
export interface ProductShipping {
  free_shipping?: boolean;
  label?: string;
  same_day_delivery?: boolean;
  pickup_available?: boolean;
  pickup_available_day?: string;
}

/** Single attribute for "Características del producto" (name/value, optional category). */
export interface ProductAttribute {
  name: string;
  value: string;
  category?: string;
}

/** One option inside a variant (e.g. color "Negro" with optional thumbnail). */
export interface VariantOption {
  value: string;
  thumbnail_url?: string;
}

/** Variant selector (e.g. Color, Memoria interna) with selected value and options. */
export interface ProductVariant {
  id: string;
  name: string;
  selected: string;
  options: VariantOption[];
}

/**
 * Product as stored in products.json (references seller by seller_id).
 * Per data-model-redesign.
 */
export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description?: string | null;
  price: number;
  currency_id?: string | null;
  original_price?: number | null;
  price_without_taxes?: number | null;
  images: string[];
  payment_methods?: string[] | null;
  condition?: string | null;
  stock?: number | null;
  sold_quantity?: number | null;
  ratings?: ProductRatings | null;
  installments?: Installments | null;
  highlights?: string[] | null;
  attributes?: ProductAttribute[] | null;
  variants?: ProductVariant[] | null;
  warranty?: string | null;
  return_policy?: string | null;
  fulfillment_type?: string | null;
  shipping?: ProductShipping | null;
  other_offers_count?: number | null;
  other_offers_min_price?: number | null;
}

/**
 * Product detail as returned by API (GET /products/:id): Product with seller resolved (no seller_id).
 */
export interface ProductDetail {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  currency_id?: string | null;
  original_price?: number | null;
  price_without_taxes?: number | null;
  images: string[];
  payment_methods?: string[] | null;
  condition?: string | null;
  stock?: number | null;
  sold_quantity?: number | null;
  ratings?: ProductRatings | null;
  installments?: Installments | null;
  highlights?: string[] | null;
  attributes?: ProductAttribute[] | null;
  variants?: ProductVariant[] | null;
  warranty?: string | null;
  return_policy?: string | null;
  fulfillment_type?: string | null;
  shipping?: ProductShipping | null;
  other_offers_count?: number | null;
  other_offers_min_price?: number | null;
  seller: Seller;
}

/**
 * Product summary for list (home, carousels). Derived from Product by backend.
 */
export interface ProductSummary {
  id: string;
  title: string;
  price: number;
  currency_id?: string | null;
  original_price?: number | null;
  thumbnail?: string | null;
  condition?: string | null;
  seller_id?: string | null;
  installments?: Installments | null;
  free_shipping?: boolean | null;
  shipping_label?: string | null;
}
