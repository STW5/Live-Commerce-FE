'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/lib/stores/auth';
import { useCartStore } from '@/lib/stores/cart';

export function Header() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            라이브커머스
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              홈
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary">
              상품
            </Link>
            <Link href="/broadcasts" className="text-sm font-medium hover:text-primary">
              라이브 방송
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.nickname?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/mypage">마이페이지</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">주문내역</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button asChild variant="outline" size="sm">
                <Link href="/signup">회원가입</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/login">로그인</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 pt-8">
                <Link href="/" className="text-sm font-medium">
                  홈
                </Link>
                <Link href="/products" className="text-sm font-medium">
                  상품
                </Link>
                <Link href="/broadcasts" className="text-sm font-medium">
                  라이브 방송
                </Link>
                {isAuthenticated() ? (
                  <>
                    <Link href="/mypage" className="text-sm font-medium">
                      마이페이지
                    </Link>
                    <Link href="/orders" className="text-sm font-medium">
                      주문내역
                    </Link>
                    <Button onClick={handleLogout} variant="outline" className="mt-4">
                      로그아웃
                    </Button>
                  </>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <Link href="/signup">회원가입</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/login">로그인</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
