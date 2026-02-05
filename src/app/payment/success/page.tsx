'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { paymentApi } from '@/lib/api/services/payment';
import { useCartStore } from '@/lib/stores/cart';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const approvePayment = async () => {
      try {
        // URL에서 pg_token 가져오기
        const pgToken = searchParams.get('pg_token');

        if (!pgToken) {
          throw new Error('결제 토큰이 없습니다.');
        }

        // 세션에서 주문 정보 가져오기
        const checkoutData = sessionStorage.getItem('checkout_order');
        if (!checkoutData) {
          throw new Error('주문 정보를 찾을 수 없습니다.');
        }

        const { orderId, tid } = JSON.parse(checkoutData);

        // 결제 승인 요청
        const approveData = {
          tid,
          pgToken,
          orderId,
        };

        const result = await paymentApi.approvePayment(approveData);
        console.log('결제 승인 완료:', result);

        // 세션 정리
        sessionStorage.removeItem('checkout_order');

        // 장바구니 비우기
        clearCart();

        setStatus('success');
      } catch (error: any) {
        console.error('결제 승인 실패:', error);
        setErrorMessage(error.response?.data?.message || error.message || '결제 승인 중 오류가 발생했습니다.');
        setStatus('error');
      }
    };

    approvePayment();
  }, [searchParams, clearCart]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-primary" />
          <h2 className="text-xl font-semibold">결제 처리 중입니다...</h2>
          <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="max-w-md p-8 text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
          <h2 className="mb-2 text-2xl font-bold">결제 실패</h2>
          <p className="mb-6 text-gray-600">{errorMessage}</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => router.push('/cart')}>
              장바구니로
            </Button>
            <Button className="flex-1" onClick={() => router.push('/products')}>
              쇼핑 계속하기
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="max-w-md p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
        <h2 className="mb-2 text-2xl font-bold">결제가 완료되었습니다!</h2>
        <p className="mb-6 text-gray-600">
          주문해 주셔서 감사합니다.
          <br />
          주문 내역은 마이페이지에서 확인하실 수 있습니다.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => router.push('/orders')}>
            주문 내역
          </Button>
          <Button className="flex-1" onClick={() => router.push('/')}>
            홈으로
          </Button>
        </div>
      </Card>
    </div>
  );
}
