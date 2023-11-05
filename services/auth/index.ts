import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IEmployee } from '@/models/employee';
import { login, logout, refreshUser } from '@/services/auth/api';

import { LoginData } from './types';

interface AuthState {
  user: IEmployee | null;
  isLoading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = createWithEqualityFn<AuthState>()(
  (set) => ({
    user: null,
    isLoading: true,
    login: async (loginData: LoginData) => {
      set({ isLoading: true });

      const { data } = await login(loginData);

      set({ user: data, isLoading: false });
    },
    refreshUser: async () => {
      set({ isLoading: true });
      const { data } = await refreshUser();

      set({ user: data, isLoading: false });
    },
    logout: async () => {
      set({ isLoading: true });
      await logout();
      set({ user: null, isLoading: false });
    },
  }),
  shallow,
);

export default useAuthStore;
