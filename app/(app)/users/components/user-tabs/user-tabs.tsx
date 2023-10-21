'use client';
import { FC } from 'react';

import { Listbox, ListboxItem } from '@nextui-org/react';
import { Search } from 'components/ui/search';
import { usePathname, useRouter } from 'next/navigation';

import { APP_ROUTE } from '@/constants/app-route';

import { MOCKED_USERS } from './user-tabs.constants';

export const UserTabs: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-w-[200px] w-80 border-r-1">
      <div className="p-2">
        <Search />
      </div>
      <Listbox
        onAction={(key) => router.push(APP_ROUTE.USER_DETAILS.replace(':userId', key as string))}
        variant="flat"
        className="px-0 py-2 gap-0 overflow-auto h-[calc(100vh-168px)] max-h-[calc(100vh-160px)]"
        aria-label="User Listbox"
        itemClasses={{ title: 'font-bold', description: 'text-default-900' }}>
        {MOCKED_USERS.map(({ id, name, surname, position, level }) => (
          <ListboxItem
            title={name + ' ' + surname}
            description={
              <p>
                {position} (<b>{level}</b>)
              </p>
            }
            key={id}
            className={
              'h-auto rounded-none ' +
              (pathname.startsWith(APP_ROUTE.USERS + '/' + id + '/') || pathname === APP_ROUTE.USERS + '/' + id
                ? 'bg-secondary-200 data-[hover=true]:bg-secondary-100'
                : '')
            }
          />
        ))}
      </Listbox>
    </div>
  );
};
