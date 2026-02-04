import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  userId: string;
  username: string;
  email: string;
  nickname: string;
  role: 'CUSTOMER' | 'SELLER' | 'SHOW_HOST' | 'MASTER';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user, accessToken, refreshToken) => {
        set({ user, accessToken, refreshToken });
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
      },
      clearAuth: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      },
      isAuthenticated: () => {
        return get().accessToken !== null;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
