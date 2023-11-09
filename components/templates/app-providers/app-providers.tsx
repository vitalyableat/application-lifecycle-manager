'use client';
import { FC, PropsWithChildren, useEffect } from 'react';

import { NextUIProvider } from '@nextui-org/react';

import { Loader } from '@/components/ui/loader';
import useAuthStore from '@/services/auth';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  const [isFirstRequest, user, refreshUser] = useAuthStore((state) => [
    state.isFirstRequest,
    state.user,
    state.refreshUser,
  ]);

  useEffect(() => {
    if (!user) {
      refreshUser();
    }
  }, []);

  if (isFirstRequest) {
    return <Loader />;
  }

  return <NextUIProvider>{children}</NextUIProvider>;
};
