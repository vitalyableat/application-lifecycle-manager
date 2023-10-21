import { FC, PropsWithChildren } from 'react';

import { AppBar } from 'components/templates/app-bar';
import { Navbar } from 'components/templates/navbar';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar />
      <main className="h-[calc(100vh-64px)]">
        <div className="flex">
          <Navbar />
          <div className="bg-default-100 w-full max-h-full p-6">
            <div className="bg-white w-full h-full overflow-hidden flex-col rounded-lg shadow">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AppLayout;
