import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IEmployee } from '@/models/employee';
import { login, logout, refreshUser } from '@/services/auth/api';

import { LoginData } from './types';

interface AuthState {
  user: IEmployee | null;
  isFirstRequest: boolean;
  isLoading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = createWithEqualityFn<AuthState>()(
  (set) => ({
    user: null,
    isFirstRequest: true,
    isLoading: false,
    login: async (loginData: LoginData) => {
      set({ isLoading: true });

      try {
        const { data } = await login(loginData);

        set({ user: data });
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    refreshUser: async () => {
      set({ isFirstRequest: true });

      try {
        const { data } = await refreshUser();

        set({ user: data });
      } catch (e) {
        if ((e as AxiosResponse).request.status !== 403) {
          toast.error((e as AxiosResponse).request.statusText);
        }
      } finally {
        set({ isFirstRequest: false });
      }
    },
    logout: async () => {
      set({ isLoading: true });

      try {
        await logout();
        set({ user: null, isLoading: false });
      } catch (e) {
        toast.error((e as AxiosResponse).request?.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useAuthStore;
