import { FC, PropsWithChildren } from 'react';

import { AppProviders } from 'components/templates/app-providers';
import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';

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
          <main className="h-screen">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
