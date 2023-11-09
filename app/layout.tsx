import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

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
        <Toaster position="bottom-right" reverseOrder toastOptions={{ duration: 4000 }} />
        <AppProviders>
          <main className="h-screen">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
