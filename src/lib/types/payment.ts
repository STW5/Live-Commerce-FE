export enum PaymentStatus {
  READY = 'READY',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

export interface Payment {
  paymentId: string;
  orderId: string;
  tid: string;
  amount: number;
  approvedAt: string;
  status: PaymentStatus;
}

export interface PaymentReadyRequest {
  orderId: string;
  amount: number;
  itemName: string;
}

export interface PaymentReadyResponse {
  tid: string;
  next_redirect_pc_url: string;
}

export interface PaymentApproveRequest {
  tid: string;
  pgToken: string;
  orderId: string;
}

export interface PaymentApproveResponse {
  tid: string;
  approvedAt: string;
  amount: number;
}
