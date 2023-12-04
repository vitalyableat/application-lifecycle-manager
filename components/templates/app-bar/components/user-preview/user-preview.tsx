'use client';
import { FC } from 'react';

import { User } from '@nextui-org/user';

import useAuthStore from '@/services/auth';

export const UserPreview: FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    user && (
      <User name={`${user.name} ${user.surname}`} description={user.position} avatarProps={{ src: user?.avatar }} />
    )
  );
};
