'use client';
import { FC } from 'react';

import { User } from '@nextui-org/user';
import { useRouter } from 'next/navigation';

import { APP_ROUTE } from '@/constants/app-route';
import { IEmployee } from '@/models/employee';

type Props = {
  employee: IEmployee;
  withRedirect?: boolean;
};

export const EmployeeItem: FC<Props> = ({ employee, withRedirect }) => {
  const router = useRouter();

  return (
    <User
      name={employee.name + ' ' + employee.surname}
      description={
        <p>
          {employee.position} (<b>{employee.level}</b>)
        </p>
      }
      avatarProps={{
        src: employee.avatar,
      }}
      onClick={() => withRedirect && router.push(APP_ROUTE.EMPLOYEE_DETAILS.replace(':employeeId', employee.id))}
      className={`${withRedirect && 'cursor-pointer hover:bg-default-100 p-3'}`}
    />
  );
};
