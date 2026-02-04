import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dummyProducts, dummyBroadcasts } from '@/lib/data/dummy';
import { formatPrice } from '@/lib/utils';

export default function Home() {
  const livebroadcasts = dummyBroadcasts.filter((b) => b.status === 'LIVE');

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold">실시간 라이브 쇼핑</h1>
            <p className="mb-8 text-xl">지금 바로 라이브 방송에서 특별한 혜택을 만나보세요</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/broadcasts">라이브 방송 보러가기</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/signup">회원가입하고 시작하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {livebroadcasts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold">🔴 지금 LIVE 중</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {livebroadcasts.map((broadcast) => (
                <Link key={broadcast.broadcastId} href={`/broadcasts/${broadcast.broadcastId}`}>
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative aspect-video">
                      <Image
                        src={broadcast.thumbnail}
                        alt={broadcast.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute left-2 top-2 bg-red-600">LIVE</Badge>
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-sm text-white">
                        👁 {broadcast.viewers.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 font-semibold">{broadcast.title}</h3>
                      <p className="text-sm text-gray-600">{broadcast.host}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">인기 상품</h2>
            <Button variant="outline" asChild>
              <Link href="/products">전체 보기</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dummyProducts.slice(0, 4).map((product) => (
              <Link key={product.productId} href={`/products/${product.productId}`}>
                <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.discount && (
                      <Badge className="absolute left-2 top-2 bg-red-600">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-sm text-gray-600">{product.category}</p>
                    <h3 className="mb-2 font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
