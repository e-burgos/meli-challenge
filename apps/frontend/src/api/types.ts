/**
 * API types aligned with backend OpenAPI (apps/backend/src/openapi/openapi.yaml).
 */

export interface Installments {
  quantity: number;
  amount: number;
}

export interface ProductSummary {
  id: string;
  title: string;
  price: number;
  currency_id?: string;
  original_price?: number;
  thumbnail?: string;
  condition?: string;
  seller_id?: string;
  installments?: Installments;
  free_shipping?: boolean;
  shipping_label?: string;
}

export interface ProductRatings {
  average: number;
  count: number;
}

export interface ProductAttribute {
  name: string;
  value: string;
  category?: string;
}

export interface VariantOption {
  value: string;
  thumbnail_url?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  selected: string;
  options: VariantOption[];
}

export interface ProductShipping {
  free_shipping?: boolean;
  label?: string;
  same_day_delivery?: boolean;
  pickup_available?: boolean;
  pickup_available_day?: string;
}

export interface Seller {
  id: string;
  nickname: string;
  reputation?: string | null;
  badge?: string | null;
  sales_count?: number | null;
  followers_count?: number | null;
  product_count?: number | null;
  invoice_type?: string | null;
  attention_rating?: string | null;
  delivery_rating?: string | null;
}

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
  /** Suggested search terms for "También puede interesarte" (product detail header). */
  suggested_terms?: string[] | null;
  seller: Seller;
}

export interface ApiError {
  message: string;
  code?: string | null;
}
