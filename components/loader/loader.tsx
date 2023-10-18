import { FC } from 'react';

import { Spinner } from '@nextui-org/spinner';

export const Loader: FC = () => {
  return (
    <div className="flex w-full h-full justify-center items-center bg-default-100 bg-opacity-50">
      <Spinner size="lg" color="secondary" />
    </div>
  );
};
