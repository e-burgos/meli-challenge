import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import type { ListProductsParams } from '../api/products';

export const productsQueryKey = ['products'] as const;

export function useProducts(params: ListProductsParams = {}) {
  const queryKey = params.seller_id != null
    ? [...productsQueryKey, params.seller_id]
    : productsQueryKey;
  return useQuery({
    queryKey,
    queryFn: () => fetchProducts(params),
    staleTime: 60_000,
  });
}
