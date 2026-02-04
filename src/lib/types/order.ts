export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

export interface Order {
  orderId: string;
  userId: string;
  productId: string;
  orderQuantity: number;
  productTotalPrice: number;
  finalPaidPrice: number;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderCreateRequest {
  broadcastId?: string | null;
  productId: string;
  orderQuantity: number;
  couponId?: string | null;
}

export interface OrderUpdateRequest {
  orderQuantity?: number;
}

export interface OrderStatusUpdateRequest {
  status: OrderStatus;
}
