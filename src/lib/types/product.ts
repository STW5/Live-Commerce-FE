export interface Product {
  productId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: string;
  status?: string;
  companyId?: string;
  soldOut?: boolean;
  availableQuantity?: number;
  discount?: number;
  image?: string;
}

export interface ProductSearchParams {
  page?: number;
  size?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface InventoryCheckRequest {
  productId: string;
  quantity: number;
}

export interface InventoryCheckResponse {
  orderable: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
