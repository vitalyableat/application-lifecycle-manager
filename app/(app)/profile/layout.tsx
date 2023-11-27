import { FC, PropsWithChildren } from 'react';

const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className="relative w-full h-full max-h-[calc(100vh-112px)] overflow-auto p-6">{children}</main>;
};

export default ProfileLayout;
