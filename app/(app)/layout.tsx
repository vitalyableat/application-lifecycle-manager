import { FC, PropsWithChildren } from 'react';

import { Navbar } from '@/templates/navbar';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <Navbar />
      <div className="bg-default-100 w-full max-h-full p-6">
        <div className="bg-white w-full h-full overflow-hidden flex-col rounded-lg shadow">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;