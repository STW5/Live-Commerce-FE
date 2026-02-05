'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { Search, Loader2 } from 'lucide-react';
import { useProducts } from '@/lib/api/hooks/useProducts';
import { ProductSearchParams } from '@/lib/types/product';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    page: 0,
    size: 12,
  });

  const { data, isLoading, isError, error } = useProducts(searchParams);

  const handleCategoryChange = (category: string) => {
    setSearchParams((prev) => ({
      ...prev,
      category: category === 'all' ? undefined : category,
      page: 0,
    }));
  };

  const handleSortChange = (sort: string) => {
    setSearchParams((prev) => ({
      ...prev,
      sort,
      page: 0,
    }));
  };

  const handlePriceFilter = (minPrice?: number, maxPrice?: number) => {
    setSearchParams((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
      page: 0,
    }));
  };

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
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('all')}
                >
                  전체
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('전자기기')}
                >
                  전자기기
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('패션')}
                >
                  패션
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('뷰티')}
                >
                  뷰티
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('가전')}
                >
                  가전
                </Button>
              </div>

              <hr className="my-6" />

              <h2 className="mb-4 font-semibold">가격대</h2>
              <div className="space-y-2 text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePriceFilter(undefined, 50000);
                      } else {
                        handlePriceFilter(undefined, undefined);
                      }
                    }}
                  />
                  50,000원 미만
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePriceFilter(50000, 100000);
                      } else {
                        handlePriceFilter(undefined, undefined);
                      }
                    }}
                  />
                  50,000원 - 100,000원
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePriceFilter(100000, undefined);
                      } else {
                        handlePriceFilter(undefined, undefined);
                      }
                    }}
                  />
                  100,000원 이상
                </label>
              </div>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                총 {data?.totalElements || 0}개의 상품
              </p>
              <select
                className="rounded border px-3 py-1 text-sm"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">인기순</option>
                <option value="price,asc">낮은 가격순</option>
                <option value="price,desc">높은 가격순</option>
                <option value="createdAt,desc">최신순</option>
              </select>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {isError && (
              <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
                상품을 불러오는데 실패했습니다. {error instanceof Error && error.message}
              </div>
            )}

            {!isLoading && !isError && data && (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {data.content.map((product) => (
                  <Link key={product.productId} href={`/products/${product.productId}`}>
                    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || '/placeholder-product.jpg'}
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
            )}

            {!isLoading && !isError && data && data.content.length === 0 && (
              <div className="py-12 text-center text-gray-600">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
