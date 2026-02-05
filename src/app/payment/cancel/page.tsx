'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="max-w-md p-8 text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-yellow-600" />
        <h2 className="mb-2 text-2xl font-bold">결제가 취소되었습니다</h2>
        <p className="mb-6 text-gray-600">
          결제를 취소하셨습니다.
          <br />
          다시 시도하시려면 아래 버튼을 눌러주세요.
        </p>
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
