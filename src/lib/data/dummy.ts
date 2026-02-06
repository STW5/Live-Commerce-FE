export const dummyProducts = [
  {
    productId: '30000000-0000-0000-0000-000000000001',
    name: '유기농 사과',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    category: 'FOOD',
  },
  {
    productId: '30000000-0000-0000-0000-000000000002',
    name: '햇쌀밥',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'FOOD',
  },
  {
    productId: '30000000-0000-0000-0000-000000000003',
    name: '누룽지 과자',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: 'FOOD',
  },
];

export const dummyBroadcasts = [
  {
    broadcastId: '1',
    title: '인기 가전제품 특가 라이브',
    host: '김쇼호스트',
    viewers: 1234,
    status: 'LIVE' as const,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    startTime: new Date().toISOString(),
  },
  {
    broadcastId: '2',
    title: '봄 신상 패션쇼',
    host: '박라이브',
    viewers: 856,
    status: 'LIVE' as const,
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    startTime: new Date().toISOString(),
  },
  {
    broadcastId: '3',
    title: '뷰티 신제품 소개',
    host: '이호스트',
    viewers: 0,
    status: 'SCHEDULED' as const,
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
    startTime: new Date(Date.now() + 3600000).toISOString(),
  },
];

export const dummyOrders = [
  {
    orderId: 'ORD-2026-001',
    productName: '프리미엄 무선 이어폰',
    quantity: 1,
    totalPrice: 89000,
    status: 'PAID',
    createdAt: '2026-01-30',
  },
  {
    orderId: 'ORD-2026-002',
    productName: '스마트워치 프로',
    quantity: 1,
    totalPrice: 249000,
    status: 'PROCESSING',
    createdAt: '2026-01-29',
  },
];
