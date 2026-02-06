import apiClient from '../client';
import {
  Payment,
  PaymentReadyRequest,
  PaymentReadyResponse,
  PaymentApproveRequest,
  PaymentApproveResponse,
} from '@/lib/types/payment';
import { PageResponse } from '@/lib/types/product';

export const paymentApi = {
  readyPayment: async (data: PaymentReadyRequest): Promise<PaymentReadyResponse> => {
    const response = await apiClient.post('/api/v1/payments/ready', data);
    return response.data.data;
  },

  approvePayment: async (data: PaymentApproveRequest): Promise<PaymentApproveResponse> => {
    const response = await apiClient.post('/api/v1/payments/approve', data);
    return response.data.data;
  },

  getPayment: async (id: string): Promise<Payment> => {
    const response = await apiClient.get(`/api/v1/payments/${id}`);
    return response.data.data;
  },

  getPayments: async (page: number = 0, size: number = 10): Promise<PageResponse<Payment>> => {
    const response = await apiClient.get('/api/v1/payments', {
      params: { page, size },
    });
    return response.data.data;
  },

  refundPayment: async (orderId: string): Promise<void> => {
    const response = await apiClient.post(`/api/v1/payments/${orderId}/refund`);
    return response.data.data;
  },

  cancelPayment: async (orderId: string): Promise<void> => {
    await apiClient.post(`/api/v1/payments/${orderId}/cancel`);
  },
};
