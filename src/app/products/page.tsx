import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dummyProducts } from '@/lib/data/dummy';
import { formatPrice } from '@/lib/utils';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">전체 상품</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input placeholder="상품 검색..." className="pl-10" />
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-64 lg:block">
            <Card className="p-6">
              <h2 className="mb-4 font-semibold">카테고리</h2>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  전체
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  전자기기
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  패션
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  뷰티
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  가전
                </Button>
              </div>

              <hr className="my-6" />

              <h2 className="mb-4 font-semibold">가격대</h2>
              <div className="space-y-2 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  50,000원 미만
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  50,000원 - 100,000원
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  100,000원 이상
                </label>
              </div>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">총 {dummyProducts.length}개의 상품</p>
              <select className="rounded border px-3 py-1 text-sm">
                <option>인기순</option>
                <option>낮은 가격순</option>
                <option>높은 가격순</option>
                <option>최신순</option>
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {dummyProducts.map((product) => (
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
        </div>
      </div>
    </div>
  );
}
