'use client';
import { FC, Key, PropsWithChildren, useState } from 'react';

import { Badge, Listbox, ListboxItem } from '@nextui-org/react';
import { ChevronRightIcon } from '@nextui-org/shared-icons';
import { usePathname, useRouter } from 'next/navigation';

import { APP_ROUTE } from '@/constants/app-route';
import useAuthStore from '@/services/auth';

import { NAVBAR_LISTBOX } from './navbar.constants';

export const Navbar: FC<PropsWithChildren> = ({ children }) => {
  const logout = useAuthStore((state) => state.logout);
  const [navbarOpen, setNavbarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const onAction = async (key: Key) => {
    if ((key as APP_ROUTE) === APP_ROUTE.LOGIN) {
      await logout();
    }
    router.push(key as APP_ROUTE);
  };

  return (
    <>
      <Badge
        content={
          <ChevronRightIcon
            className={`p-1 w-6 h-6 bg-white border-1 rounded-full cursor-pointer hover:bg-default-100 ${
              navbarOpen && 'rotate-180'
            }`}
          />
        }
        shape="circle"
        disableOutline
        className="p-0 absolute right-0 top-7"
        onClick={() => setNavbarOpen((c) => !c)}>
        <div className={`h-[calc(100vh-64px)] overflow-auto border-r-1 ${navbarOpen ? 'w-[200px]' : 'w-[56px]'}`}>
          <Listbox
            onAction={onAction}
            variant="flat"
            className="p-0 gap-0"
            aria-label="Navbar Listbox"
            itemClasses={{ title: 'text-medium font-bold' }}>
            {NAVBAR_LISTBOX.map(({ key, title, Icon }) => (
              <ListboxItem
                key={key}
                startContent={<Icon className="min-w-[24px]" />}
                color={title === 'Logout' ? 'danger' : pathname.startsWith(key) ? 'secondary' : 'default'}
                className={`h-14 px-4 rounded-none data-[hover=true]:text-inherit 
                ${pathname.startsWith(key) && 'bg-secondary-200'} 
                ${title === 'Settings' && 'border-b-1'}
              `}>
                {navbarOpen && title}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </Badge>
      <div className="bg-default-100 w-full max-h-full p-6">
        <div
          className="relative bg-white w-full h-full flex-col rounded-lg shadow"
          style={{ maxWidth: `calc(100vw - ${navbarOpen ? '248px' : '104px'})` }}>
          {children}
        </div>
      </div>
    </>
  );
};
