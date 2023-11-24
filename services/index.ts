import axios, { type AxiosInstance } from 'axios';

import { COOKIE_NAME } from '@/constants/cookie-name';
import useAuthStore from '@/services/auth';
import { refreshTokens } from '@/services/auth/api';

const isServer = typeof window === 'undefined';

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const accessToken = cookies().get(COOKIE_NAME.ACCESS_TOKEN)?.value;
    const refreshToken = cookies().get(COOKIE_NAME.REFRESH_TOKEN)?.value;

    !config.headers.has('Cookie') &&
      config.headers.set('Cookie', [
        refreshToken ? `${COOKIE_NAME.REFRESH_TOKEN}=${refreshToken}` : '',
        accessToken ? `${COOKIE_NAME.ACCESS_TOKEN}=${accessToken}` : '',
      ]);
  }

  return config;
});

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === undefined) {
      try {
        const { data: isRefreshed, headers } = await refreshTokens();

        if (isServer) {
          const cookies = headers['set-cookie'] || [];
          let accessToken = cookies.find((v) => v.includes('accessToken')) || '';
          let refreshToken = cookies.find((v) => v.includes('refreshToken')) || '';

          accessToken = accessToken.substring(accessToken.indexOf('=') + 1, accessToken.indexOf(';'));
          refreshToken = refreshToken.substring(refreshToken.indexOf('=') + 1, refreshToken.indexOf(';'));

          error.config.headers['Cookie'] = [
            `${COOKIE_NAME.ACCESS_TOKEN}=${accessToken}`,
            `${COOKIE_NAME.REFRESH_TOKEN}=${refreshToken}`,
          ];
        }

        if (isRefreshed) {
          return api.request(error.config);
        } else {
          await useAuthStore.getState().logout();
        }
      } catch (e) {
        await useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);
