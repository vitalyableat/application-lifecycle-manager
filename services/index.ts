import axios, { type AxiosInstance } from 'axios';

import useAuthStore from '@/services/auth';
import { refreshTokens } from '@/services/auth/api';

export const api: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === undefined) {
      const { data: isRefreshed } = await refreshTokens();

      if (isRefreshed) {
        return await api.request(error.config);
      } else {
        await useAuthStore.getState().logout();
      }
    }
  },
);
