import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';

export function productByIdQueryKey(productId: string): readonly ['product', string] {
  return ['product', productId] as const;
}

export function useProductById(productId: string | undefined) {
  return useQuery({
    queryKey: productByIdQueryKey(productId ?? ''),
    queryFn: () => fetchProductById(productId as string),
    enabled: typeof productId === 'string' && productId.length > 0,
    staleTime: 60_000,
  });
}
