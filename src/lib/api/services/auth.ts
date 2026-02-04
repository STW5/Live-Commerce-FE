import apiClient from '../client';

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  nickname: string;
  alarmConsent: boolean;
  userRole: 'CUSTOMER' | 'SELLER' | 'SHOW_HOST';
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  signUp: async (data: SignUpRequest) => {
    const response = await apiClient.post('/api/v1/auth/signup', data);
    return response.data;
  },

  signIn: async (data: SignInRequest) => {
    const response = await apiClient.post<{ data: AuthResponse }>('/api/v1/auth/signin', data);
    return response.data.data;
  },

  logout: async () => {
    const response = await apiClient.post('/api/v1/auth/logout');
    return response.data;
  },

  reissue: async (refreshToken: string) => {
    const response = await apiClient.post<{ data: AuthResponse }>('/api/v1/auth/reissue', {
      refreshToken,
    });
    return response.data.data;
  },
};
