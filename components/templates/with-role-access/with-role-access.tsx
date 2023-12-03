'use client';
import { FC, PropsWithChildren } from 'react';

import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import useAuthStore from '@/services/auth';

type Props = {
  rolesWithAccess: EMPLOYEE_ROLE[];
};

export const WithRoleAccess: FC<PropsWithChildren<Props>> = ({ rolesWithAccess, children }) => {
  const user = useAuthStore((state) => state.user);

  return user?.role && rolesWithAccess.includes(user.role) && children;
};
