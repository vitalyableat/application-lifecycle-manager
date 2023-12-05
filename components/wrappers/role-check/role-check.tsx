'use client';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Loader } from '@/components/ui';
import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import useAuthStore from '@/services/auth';

type Props = {
  role: EMPLOYEE_ROLE;
  redirect: APP_ROUTE;
};

export const RoleCheck: FC<PropsWithChildren<Props>> = ({ role, redirect, children }) => {
  const router = useRouter();
  const [user, isLoading] = useAuthStore((state) => [state.user, state.isLoading]);

  useEffect(() => {
    if (user && user.role !== role) {
      router.push(redirect);
    }
  }, [user]);

  return !isLoading && user && user.role === role ? children : <Loader />;
};
