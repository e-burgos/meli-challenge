import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import type { ListProductsParams } from '../api/products';

export const productsQueryKey = ['products'] as const;

export function useProducts(params: ListProductsParams = {}) {
  const queryKey =
    params.seller_id != null && params.seller_id !== ''
      ? [...productsQueryKey, params.seller_id]
      : productsQueryKey;
  return useQuery({
    queryKey,
    queryFn: () => fetchProducts(params),
    staleTime: 60_000,
  });
}

/** Products by seller (for "Productos del vendedor"). Only runs when sellerId is set. */
export function useSellerProducts(sellerId: string | undefined) {
  return useQuery({
    queryKey: [...productsQueryKey, 'seller', sellerId ?? ''],
    queryFn: () => fetchProducts({ seller_id: sellerId as string }),
    staleTime: 60_000,
    enabled: typeof sellerId === 'string' && sellerId.trim() !== '',
  });
}
