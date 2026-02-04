import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dummyOrders } from '@/lib/data/dummy';
import { formatPrice } from '@/lib/utils';

const statusMap = {
  PAID: { label: '결제완료', color: 'bg-blue-600' },
  PROCESSING: { label: '배송중', color: 'bg-green-600' },
  DELIVERED: { label: '배송완료', color: 'bg-gray-600' },
  CANCELLED: { label: '취소', color: 'bg-red-600' },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">주문 내역</h1>

        <div className="space-y-4">
          {dummyOrders.map((order) => (
            <Card key={order.orderId} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{order.createdAt}</p>
                  <p className="font-semibold">주문번호: {order.orderId}</p>
                </div>
                <Badge className={statusMap[order.status as keyof typeof statusMap].color}>
                  {statusMap[order.status as keyof typeof statusMap].label}
                </Badge>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-semibold">{order.productName}</p>
                  <p className="text-sm text-gray-600">수량: {order.quantity}개</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{formatPrice(order.totalPrice)}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    상세보기
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {dummyOrders.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-xl">주문 내역이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
