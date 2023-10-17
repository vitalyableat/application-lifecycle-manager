'use client';
import { useState } from 'react';

import { Badge, Listbox, ListboxItem } from '@nextui-org/react';
import { ChevronRightIcon } from '@nextui-org/shared-icons';
import { usePathname, useRouter } from 'next/navigation';

import { APP_ROUTES } from '@/constants/app-routes';

import { NAVBAR_LISTBOX } from './navbar.constants';

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  return (
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
          items={NAVBAR_LISTBOX}
          onAction={(key) => router.push(key as APP_ROUTES)}
          variant="flat"
          className="p-0 gap-0"
          aria-label="Navbar Listbox"
          itemClasses={{ title: 'text-medium font-bold' }}>
          {({ key, title, Icon }) => (
            <ListboxItem
              key={key}
              startContent={<Icon className="min-w-[24px]" />}
              color={title === 'Logout' ? 'danger' : pathname.startsWith(key) ? 'secondary' : 'default'}
              showDivider={title === 'Settings'}
              className={`h-14 px-4 rounded-none data-[hover=true]:text-inherit
               ${pathname.startsWith(key) && 'bg-secondary-200'}`}>
              {navbarOpen && title}
            </ListboxItem>
          )}
        </Listbox>
      </div>
    </Badge>
  );
};
