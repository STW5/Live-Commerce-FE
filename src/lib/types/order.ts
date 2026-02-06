export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

export interface Order {
  orderId: string;
  userId?: string;
  productId: string;
  productQuantity: number;
  productTotalPrice: number;
  finalPaidPrice: number;
  requirement?: string;
  status: OrderStatus;
  broadcastId?: string | null;
  couponId?: string | null;
  message?: string;
  createdAt?: string;
}

export interface OrderCreateRequest {
  productId: string;
  orderQuantity: number;
  requirement?: string;
  broadcastId?: string | null;
  couponId?: string | null;
}

export interface OrderUpdateRequest {
  orderQuantity?: number;
}

export interface OrderStatusUpdateRequest {
  status: OrderStatus;
}
