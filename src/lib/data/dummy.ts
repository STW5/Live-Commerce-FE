export const dummyProducts = [
  {
    productId: '1',
    name: '프리미엄 무선 이어폰',
    price: 89000,
    originalPrice: 129000,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    category: '전자기기',
    discount: 31,
  },
  {
    productId: '2',
    name: '스마트워치 프로',
    price: 249000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: '전자기기',
  },
  {
    productId: '3',
    name: '캐주얼 백팩',
    price: 45000,
    originalPrice: 59000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: '패션',
    discount: 24,
  },
  {
    productId: '4',
    name: '프리미엄 커피 머신',
    price: 159000,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    category: '가전',
  },
  {
    productId: '5',
    name: '운동화',
    price: 79000,
    originalPrice: 99000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: '패션',
    discount: 20,
  },
  {
    productId: '6',
    name: '스킨케어 세트',
    price: 69000,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    category: '뷰티',
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
