import { FC, PropsWithChildren } from 'react';

import { AppBar, Navbar } from 'components/templates';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar />
      <main className="h-[calc(100vh-64px)] flex">
        <Navbar>{children}</Navbar>
      </main>
    </>
  );
};

export default AppLayout;
