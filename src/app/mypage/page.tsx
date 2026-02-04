'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/lib/stores/auth';
import { dummyOrders } from '@/lib/data/dummy';
import { formatPrice } from '@/lib/utils';

export default function MyPage() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl">로그인이 필요합니다</p>
          <Button asChild>
            <Link href="/login">로그인하기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">마이페이지</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl">{user?.nickname?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{user?.nickname}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <Button variant="outline" className="mt-4 w-full">
                  프로필 수정
                </Button>
              </div>

              <div className="mt-6 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/orders">주문 내역</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  쿠폰함
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  찜한 상품
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  알림 설정
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">최근 주문</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/orders">전체보기</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {dummyOrders.slice(0, 3).map((order) => (
                  <div key={order.orderId} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{order.productName}</p>
                        <p className="text-sm text-gray-600">{order.createdAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(order.totalPrice)}</p>
                        <p className="text-sm text-gray-600">{order.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-2 font-semibold">보유 쿠폰</h3>
                <p className="text-3xl font-bold text-primary">3장</p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-2 font-semibold">포인트</h3>
                <p className="text-3xl font-bold text-primary">5,000P</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
