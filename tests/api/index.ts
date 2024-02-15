/* eslint-disable max-len */
import axios, { type AxiosInstance } from 'axios';

import { COOKIE_NAME } from '@/constants/cookie-name';

const isServer = typeof window === 'undefined';

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === undefined) {
      try {
        const { data: isRefreshed, headers } = await api.put('auth');

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
        }
      } catch (e) {}
    }

    return Promise.reject(error);
  },
);

export const COOKIES = {
  RM: {
    Cookie:
      'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGEwNTEzYTNlZDlhNGFjNzFlZDAyNyIsInJvbGUiOiJSZXNvdXJjZSBNYW5hZ2VyIiwiaWF0IjoxNzA3OTQ2MzE3LCJleHAiOjE3MDc5NDk5MTd9.xJwyzGjpH_ZsMEtxfQBzFmNCR8oLF4FhWcmvZeMj0i8; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGEwNTEzYTNlZDlhNGFjNzFlZDAyNyIsImlhdCI6MTcwNzk0NjMxNywiZXhwIjoxNzA4NTUxMTE3fQ.pxUREMZFYxrbn88HP3YP0p-qACMq037JqgXSbwMr2to',
  },
  PM: {
    Cookie:
      'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGEwNTJkYTNlZDlhNGFjNzFlZDAyYiIsInJvbGUiOiJQcm9qZWN0IE1hbmFnZXIiLCJpYXQiOjE3MDc5NDYzODMsImV4cCI6MTcwNzk0OTk4M30.27Ogo7vf_w6ctwlLUvjofcDNs3Pmi7lFdx9cIMn_0us; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGEwNTJkYTNlZDlhNGFjNzFlZDAyYiIsImlhdCI6MTcwNzk0NjM4MywiZXhwIjoxNzA4NTUxMTgzfQ.ltMkKkAdBQucSDp_uqtY6oXJa-pwWrgPbc7D7jY28f8',
  },
  DEV: {
    Cookie:
      'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2JiOGNkNDEyMWFlZjk4ODU3NWFhZSIsInJvbGUiOiJEZXZlbG9wZXIiLCJpYXQiOjE3MDc5NDgxMDQsImV4cCI6MTcwNzk1MTcwNH0.tCd2oNuA3yeDfM74DEL4yDWmdIE436WOI8hZnDg-ZDA; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2JiOGNkNDEyMWFlZjk4ODU3NWFhZSIsImlhdCI6MTcwNzk0ODEwNCwiZXhwIjoxNzA4NTUyOTA0fQ.pPqWuJkq7spqCQ7wzgvky-92ukdPJvY1ARZcclasiTk',
  },
};
