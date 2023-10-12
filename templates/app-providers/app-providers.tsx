'use client';
import { FC, PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
