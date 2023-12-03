import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IEmployee } from '@/models/employee';
import { changePassword, login, logout, refreshUser, updateUser } from '@/services/auth/api';

import { ChangePasswordData, LoginData } from './types';

interface AuthState {
  user: IEmployee | null;
  isFirstRequest: boolean;
  isLoading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userUpdateData: Partial<IEmployee>) => Promise<void>;
  changePassword: (changePasswordData: ChangePasswordData & { id: string }) => Promise<void>;
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
        if ((e as AxiosResponse).request.status !== 401) {
          await useAuthStore.getState().logout();
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
    updateUser: async (userUpdateData: Partial<IEmployee>) => {
      set({ isLoading: true });
      try {
        const { data } = await updateUser(userUpdateData);

        set({ user: data });
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    changePassword: async (changePasswordData: ChangePasswordData & { id: string }) => {
      set({ isLoading: true });
      try {
        await changePassword(changePasswordData);
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useAuthStore;
