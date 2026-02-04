# Live Commerce Frontend

라이브 커머스 플랫폼 프론트엔드

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Form Handling**: React Hook Form + Zod

## 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/            # 인증 관련 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── product/          # 상품 관련 컴포넌트
│   ├── broadcast/        # 방송 관련 컴포넌트
│   ├── order/            # 주문 관련 컴포넌트
│   └── payment/          # 결제 관련 컴포넌트
├── lib/
│   ├── api/              # API 클라이언트
│   │   ├── client.ts     # Axios 인스턴스
│   │   ├── services/     # API 서비스 함수
│   │   └── types/        # API 타입 정의
│   ├── stores/           # Zustand 스토어
│   ├── hooks/            # 커스텀 훅
│   └── utils.ts          # 유틸리티 함수
└── public/               # 정적 파일
```

## 환경 변수

`.env.local` 파일 생성:

```
NEXT_PUBLIC_API_URL=http://localhost:19091
NEXT_PUBLIC_WS_URL=ws://localhost:19050
```

## 주요 기능

- ✅ JWT 기반 인증/인가
- ✅ 자동 토큰 갱신
- ✅ API 클라이언트 (Axios + Interceptors)
- ✅ 전역 상태 관리 (Zustand)
- ✅ React Query 캐싱
- 🚧 실시간 채팅 (Socket.io)
- 🚧 상품 목록/상세
- 🚧 주문/결제 플로우
- 🚧 라이브 방송

## API 연동

백엔드 Gateway: `http://localhost:19091`

- User/Auth: `/api/v2/auth/*`
- Products: `/api/v1/products/*`
- Orders: `/api/v2/orders/*`
- Payments: `/api/v2/payments/*`
- Broadcasts: `/api/v1/livebroadcasts/*`

## 다음 단계

1. shadcn/ui 컴포넌트 추가
2. 상품 목록/상세 페이지 구현
3. 장바구니 UI 구현
4. 주문/결제 플로우 완성
5. 라이브 방송 페이지 구현
6. WebSocket 실시간 채팅 연동
