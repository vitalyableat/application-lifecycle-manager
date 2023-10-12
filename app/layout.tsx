import { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import { AppBar } from 'templates/app-bar';

import { AppProviders } from '@/templates/app-providers';
import { Navbar } from '@/templates/navbar';

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
          <div className="flex">
            <Navbar />
            <div className="bg-default-100 w-full max-h-full p-6">
              <div className="bg-white min-w-full min-h-full p-6 flex-col rounded-lg shadow">{children}</div>
            </div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
