import { FC, PropsWithChildren } from 'react';

import { UserTabs } from './components/user-tabs';

const UsersLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <UserTabs />
      <div className="bg-white min-w-full min-h-full p-6 flex-col">{children}</div>
    </div>
  );
};

export default UsersLayout;
