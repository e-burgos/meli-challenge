/**
 * Seller (vendedor) — independent entity per data-model-redesign.
 * Stored in sellers.json; referenced by Product.seller_id.
 */
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
