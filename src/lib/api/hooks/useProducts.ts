import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { productApi } from '../services/product';
import { Product, ProductSearchParams, PageResponse, InventoryCheckResponse } from '@/lib/types/product';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductSearchParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  popular: () => [...productKeys.all, 'popular'] as const,
  inventory: (productId: string, quantity: number) =>
    [...productKeys.all, 'inventory', productId, quantity] as const,
};

export const useProducts = (
  params?: ProductSearchParams,
  options?: Omit<UseQueryOptions<PageResponse<Product>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<PageResponse<Product>>({
    queryKey: productKeys.list(params || {}),
    queryFn: () => productApi.searchProducts(params || {}),
    ...options,
  });
};

export const useProduct = (
  id: string,
  options?: Omit<UseQueryOptions<Product>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
    ...options,
  });
};

export const usePopularProducts = (
  options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Product[]>({
    queryKey: productKeys.popular(),
    queryFn: () => productApi.getPopularProducts(),
    ...options,
  });
};

export const useInventoryCheck = (
  productId: string,
  quantity: number,
  options?: Omit<UseQueryOptions<InventoryCheckResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<InventoryCheckResponse>({
    queryKey: productKeys.inventory(productId, quantity),
    queryFn: () => productApi.checkInventory(productId, quantity),
    enabled: !!productId && quantity > 0,
    ...options,
  });
};
