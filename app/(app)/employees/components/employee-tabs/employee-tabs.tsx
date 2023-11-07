'use client';
import { FC, useEffect } from 'react';

import { Listbox, ListboxItem } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

import { Loader } from '@/components/ui/loader';
import { Search } from '@/components/ui/search';
import { APP_ROUTE } from '@/constants/app-route';
import useEmployeeStore from '@/services/employee';

export const EmployeeTabs: FC = () => {
  const [isLoading, employees, getEmployees] = useEmployeeStore((state) => [
    state.isLoading,
    state.employees,
    state.getEmployees,
  ]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="min-w-[200px] w-80 border-r-1 relative">
      {isLoading && <Loader />}
      <div className="p-2">
        <Search />
      </div>
      <Listbox
        onAction={(key) => router.push(APP_ROUTE.EMPLOYEE_DETAILS.replace(':employeeId', key as string))}
        variant="flat"
        className="px-0 py-2 gap-0 overflow-auto h-[calc(100vh-168px)] max-h-[calc(100vh-160px)]"
        aria-label="Employee Listbox"
        itemClasses={{ title: 'font-bold', description: 'text-default-900' }}>
        {employees.map(({ id, name, surname, position, level }) => (
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
              (pathname.startsWith(APP_ROUTE.EMPLOYEES + '/' + id + '/') || pathname === APP_ROUTE.EMPLOYEES + '/' + id
                ? 'bg-secondary-200 data-[hover=true]:bg-secondary-100'
                : '')
            }
          />
        ))}
      </Listbox>
    </div>
  );
};
