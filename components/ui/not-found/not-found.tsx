import { FC, PropsWithChildren } from 'react';

export const NotFound: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex w-full h-full justify-center items-center text-3xl font-bold">{children}</div>;
};
