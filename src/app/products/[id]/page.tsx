'use client';

import { use } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { dummyProducts } from '@/lib/data/dummy';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = dummyProducts.find((p) => p.productId === id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  if (!product) {
    return <div className="p-8 text-center">상품을 찾을 수 없습니다.</div>;
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    if (confirm('장바구니에 담았습니다. 장바구니로 이동하시겠습니까?')) {
      router.push('/cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
            {product.discount && (
              <Badge className="absolute left-4 top-4 bg-red-600">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          <div>
            <Card className="p-6">
              <p className="mb-2 text-sm text-gray-600">{product.category}</p>
              <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

              <div className="mb-6">
                {product.originalPrice && (
                  <div className="mb-1 text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
              </div>

              <hr className="my-6" />

              <div className="mb-6">
                <p className="mb-2 font-semibold">수량</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>총 금액</span>
                  <span className="text-primary">{formatPrice(product.price * quantity)}</span>
                </div>
              </div>

              <div className="grid gap-3">
                <Button size="lg" className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  장바구니 담기
                </Button>
                <Button size="lg" variant="secondary" className="w-full">
                  바로 구매
                </Button>
              </div>
            </Card>

            <Card className="mt-6 p-6">
              <h2 className="mb-4 text-xl font-bold">상품 설명</h2>
              <p className="text-gray-600">
                {product.name}은(는) 최고 품질의 제품입니다. 엄선된 소재와 정교한 제작
                과정을 통해 탄생한 프리미엄 상품으로, 고객님의 만족을 보장합니다.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
