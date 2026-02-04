'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';
import { dummyBroadcasts, dummyProducts } from '@/lib/data/dummy';
import { formatPrice } from '@/lib/utils';

export default function BroadcastViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const broadcast = dummyBroadcasts.find((b) => b.broadcastId === id);
  const [message, setMessage] = useState('');
  const [chatMessages] = useState([
    { id: 1, user: '김철수', message: '안녕하세요!' },
    { id: 2, user: '이영희', message: '제품 좋네요' },
    { id: 3, user: '박민수', message: '할인 많이 해주세요~' },
  ]);

  if (!broadcast) {
    return <div className="p-8 text-center">방송을 찾을 수 없습니다.</div>;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      alert(`메시지 전송: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-black">
                <Image src={broadcast.thumbnail} alt={broadcast.title} fill className="object-contain" />
                {broadcast.status === 'LIVE' && (
                  <Badge className="absolute left-4 top-4 bg-red-600">LIVE</Badge>
                )}
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h1 className="text-2xl font-bold">{broadcast.title}</h1>
                  {broadcast.status === 'LIVE' && (
                    <div className="text-sm text-gray-600">
                      👁 {broadcast.viewers.toLocaleString()} 시청 중
                    </div>
                  )}
                </div>
                <p className="text-gray-600">호스트: {broadcast.host}</p>
              </div>
            </Card>

            <Card className="mt-6 p-6">
              <h2 className="mb-4 text-xl font-bold">방송 중 상품</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {dummyProducts.slice(0, 2).map((product) => (
                  <Link key={product.productId} href={`/products/${product.productId}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="flex h-[600px] flex-col">
              <div className="border-b p-4">
                <h2 className="font-bold">실시간 채팅</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <span className="font-semibold text-primary">{msg.user}: </span>
                      <span>{msg.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
