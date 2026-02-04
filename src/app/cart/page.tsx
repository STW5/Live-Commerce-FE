'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl text-gray-600">장바구니가 비어있습니다</p>
          <Button asChild>
            <Link href="/products">쇼핑 계속하기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">장바구니</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="divide-y">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 p-6">
                  {item.image && (
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <Link
                        href={`/products/${item.productId}`}
                        className="font-semibold hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.productId)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-lg font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <div className="mt-4">
              <Button variant="outline" onClick={clearCart}>
                장바구니 비우기
              </Button>
            </div>
          </div>

          <div>
            <Card className="sticky top-20 p-6">
              <h2 className="mb-4 text-xl font-bold">주문 요약</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>상품 금액</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>무료</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="mb-6 flex justify-between text-lg font-bold">
                <span>총 결제금액</span>
                <span className="text-primary">{formatPrice(getTotalPrice())}</span>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">주문하기</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
