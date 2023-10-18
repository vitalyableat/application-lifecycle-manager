import { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';

import { AppBar } from '@/templates/app-bar';
import { AppProviders } from '@/templates/app-providers';

import './globals.css';

const font = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Application Lifecycle Manager',
  description: 'Application Lifecycle Manager',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <AppProviders>
          <AppBar />
          <main className="h-[calc(100vh-64px)]">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
