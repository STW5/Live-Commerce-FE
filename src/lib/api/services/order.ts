import apiClient from '../client';
import {
  Order,
  OrderCreateRequest,
  OrderStatusUpdateRequest,
} from '@/lib/types/order';
import { PageResponse } from '@/lib/types/product';

export const orderApi = {
  createOrder: async (data: OrderCreateRequest): Promise<Order> => {
    const response = await apiClient.post('/api/v1/orders', data);
    return response.data;
  },

  getOrders: async (page: number = 0, size: number = 10): Promise<PageResponse<Order>> => {
    const response = await apiClient.get('/api/v1/orders', {
      params: { page, size, sort: 'createdAt,desc' },
    });
    return response.data;
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await apiClient.get(`/api/v1/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, data: OrderStatusUpdateRequest): Promise<Order> => {
    const response = await apiClient.patch(`/api/v1/orders/${id}/status`, data);
    return response.data;
  },
};
