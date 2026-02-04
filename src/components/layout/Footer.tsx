import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold">회사 정보</h3>
            <p className="text-sm text-gray-600">
              라이브커머스 주식회사
              <br />
              대표이사: 홍길동
              <br />
              사업자등록번호: 123-45-67890
              <br />
              통신판매업신고: 2024-서울강남-12345
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">고객센터</h3>
            <p className="text-sm text-gray-600">
              대표전화: 1234-5678
              <br />
              평일 09:00 - 18:00
              <br />
              주말 및 공휴일 휴무
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">이용안내</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                이용약관
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                개인정보처리방침
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                고객센터
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          © 2026 라이브커머스. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
