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

      try {
        const { data } = await login(loginData);

        set({ user: data });
      } catch (e) {
        console.log(e);
      } finally {
        set({ isLoading: false });
      }
    },
    refreshUser: async () => {
      set({ isLoading: true });

      try {
        const { data } = await refreshUser();

        set({ user: data });
      } catch (e) {
        console.log(e);
      } finally {
        set({ isLoading: false });
      }
    },
    logout: async () => {
      set({ isLoading: true });

      try {
        await logout();
        set({ user: null, isLoading: false });
      } catch (e) {
        console.log(e);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useAuthStore;
