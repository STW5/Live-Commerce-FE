'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function PaymentFailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorMessage = searchParams.get('message') || '결제가 취소되었습니다.';

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
          <Button className="flex-1" onClick={() => router.push('/checkout')}>
            다시 시도
          </Button>
        </div>
      </Card>
    </div>
  );
}
