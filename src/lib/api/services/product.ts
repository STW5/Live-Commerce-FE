import apiClient from '../client';
import {
  Product,
  ProductSearchParams,
  InventoryCheckResponse,
  PageResponse,
} from '@/lib/types/product';

export const productApi = {
  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/api/v1/products/${id}`);
    return response.data;
  },

  searchProducts: async (params: ProductSearchParams): Promise<PageResponse<Product>> => {
    const response = await apiClient.get('/api/v1/products/search', { params });
    return response.data;
  },

  getPopularProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get('/api/v1/products/popular');
    return response.data;
  },

  checkInventory: async (productId: string, quantity: number): Promise<InventoryCheckResponse> => {
    const response = await apiClient.get('/api/v1/inventories/check-orderable', {
      params: { productId, quantity },
    });
    return response.data;
  },
};
