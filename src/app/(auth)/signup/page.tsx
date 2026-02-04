'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { authApi } from '@/lib/api/services/auth';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    nickname: '',
    role: 'CUSTOMER',
    terms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!formData.terms) {
      alert('이용약관에 동의해주세요.');
      return;
    }

    setLoading(true);
    try {
      await authApi.signUp({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        nickname: formData.nickname,
        alarmConsent: formData.terms,
        userRole: formData.role as 'CUSTOMER' | 'SELLER' | 'SHOW_HOST',
      });
      
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.push('/login');
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      alert(error.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">회원가입</h1>
          <p className="mt-2 text-gray-600">라이브커머스에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
            />
          </div>

          <div>
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="영문, 숫자 4-20자"
            />
          </div>

          <div>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              required
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              placeholder="닉네임"
            />
          </div>

          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="8자 이상"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="비밀번호 재입력"
            />
          </div>

          <div>
            <Label>회원 유형</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CUSTOMER" id="customer" />
                <Label htmlFor="customer">일반 회원</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SELLER" id="seller" />
                <Label htmlFor="seller">판매자</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.terms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, terms: checked as boolean })
              }
            />
            <Label htmlFor="terms" className="text-sm">
              이용약관 및 개인정보처리방침에 동의합니다
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '처리 중...' : '회원가입'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            로그인
          </Link>
        </div>
      </Card>
    </div>
  );
}
