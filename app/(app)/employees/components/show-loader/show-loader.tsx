'use client';
import { FC } from 'react';

import { Loader } from '@/components/ui';
import useEmployeeStore from '@/services/employee';

export const ShowLoader: FC = () => {
  const isLoading = useEmployeeStore((state) => state.isLoading);

  return <>{isLoading && <Loader />}</>;
};
