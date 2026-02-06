'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCartStore } from '@/lib/stores/cart';
import { formatPrice } from '@/lib/utils';
import { paymentApi } from '@/lib/api/services/payment';
import { orderApi } from '@/lib/api/services/order';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    request: '',
    paymentMethod: 'kakaopay',
  });

  // 로그인 확인
  if (!isAuthenticated()) {
    router.push('/login?redirect=/checkout');
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl">주문할 상품이 없습니다</p>
          <Button onClick={() => router.push('/products')}>쇼핑하러 가기</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address || !formData.detailAddress) {
      alert('배송 정보를 모두 입력해주세요.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. 첫 번째 상품으로 주문 생성 (현재 백엔드는 단일 상품 주문만 지원)
      const firstItem = items[0];

      const orderData = {
        productId: firstItem.productId,
        orderQuantity: firstItem.quantity,
        requirement: formData.request || '',
        broadcastId: null,
        couponId: null,
      };

      const order = await orderApi.createOrder(orderData);
      console.log('주문 생성 완료:', order);

      // 2. 결제 준비 (카카오페이)
      if (formData.paymentMethod === 'kakaopay') {
        const itemNames = items.map(item => item.name).join(', ');
        const paymentData = {
          orderId: order.orderId,
          amount: getTotalPrice(),
          itemName: items.length > 1 ? `${items[0].name} 외 ${items.length - 1}건` : items[0].name,
        };

        const paymentReady = await paymentApi.readyPayment(paymentData);
        console.log('결제 준비 완료:', paymentReady);

        // 3. 주문 정보를 세션에 저장 (콜백에서 사용)
        sessionStorage.setItem('checkout_order', JSON.stringify({
          orderId: order.orderId,
          tid: paymentReady.tid,
        }));

        // 4. 카카오페이 결제 페이지로 리다이렉트
        window.location.href = paymentReady.next_redirect_pc_url;
      } else {
        // 다른 결제 수단 (미구현)
        alert('현재 카카오페이만 지원됩니다.');
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('결제 처리 실패:', error);
      alert(error.response?.data?.message || '결제 처리 중 오류가 발생했습니다.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">주문/결제</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold">주문 상품</h2>
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between py-4">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">수량: {item.quantity}개</p>
                      </div>
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold">배송 정보</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">받는 사람 *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-1234-5678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">주소 *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="서울시 강남구 테헤란로 123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="detailAddress">상세 주소 *</Label>
                    <Input
                      id="detailAddress"
                      required
                      value={formData.detailAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, detailAddress: e.target.value })
                      }
                      placeholder="101동 1001호"
                    />
                  </div>
                  <div>
                    <Label htmlFor="request">배송 요청사항</Label>
                    <Input
                      id="request"
                      value={formData.request}
                      onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                      placeholder="문 앞에 놓아주세요"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold">결제 수단</h2>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="kakaopay" id="kakaopay" />
                    <Label htmlFor="kakaopay" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium">카카오페이</span>
                        <span className="text-xs text-gray-500">(현재 지원)</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">신용/체크카드</span>
                        <span className="text-xs text-gray-500">(준비중)</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                    <RadioGroupItem value="transfer" id="transfer" disabled />
                    <Label htmlFor="transfer" className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">무통장입금</span>
                        <span className="text-xs text-gray-500">(준비중)</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            </div>

            <div>
              <Card className="sticky top-20 p-6">
                <h2 className="mb-4 text-xl font-bold">결제 금액</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>상품 금액</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span>무료</span>
                  </div>
                  <div className="flex justify-between">
                    <span>할인</span>
                    <span className="text-red-600">-0원</span>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="mb-6 flex justify-between text-xl font-bold">
                  <span>최종 결제금액</span>
                  <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      처리중...
                    </>
                  ) : (
                    `${formatPrice(getTotalPrice())} 결제하기`
                  )}
                </Button>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  주문 완료 시 이용약관 및 개인정보처리방침에 동의한 것으로 간주합니다.
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
