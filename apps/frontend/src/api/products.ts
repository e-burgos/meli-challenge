import type { ProductDetail, ProductSummary } from './types';
import { apiClient } from './client';

export interface ListProductsParams {
  seller_id?: string;
}

/**
 * GET /products — list product summaries (home). Optional filter by seller_id.
 */
export async function fetchProducts(
  params: ListProductsParams = {}
): Promise<ProductSummary[]> {
  const { data } = await apiClient.get<ProductSummary[]>('/products', { params });
  return data;
}

/**
 * GET /products/:productId — product detail by id. Resolves with 404 when not found.
 */
export async function fetchProductById(productId: string): Promise<ProductDetail> {
  const { data } = await apiClient.get<ProductDetail>(`/products/${encodeURIComponent(productId)}`);
  return data;
}
