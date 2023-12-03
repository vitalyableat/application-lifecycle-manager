'use client';
import { FC } from 'react';

import { Loader } from '@/components/ui';
import useProjectStore from '@/services/project';

export const ShowLoader: FC = () => {
  const isLoading = useProjectStore((state) => state.isLoading);

  return <>{isLoading && <Loader />}</>;
};
