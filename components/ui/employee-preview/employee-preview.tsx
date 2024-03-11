'use client';
import { FC } from 'react';

import { AvatarPreview } from '@/components/ui';
import { getClientLocale, getDictionary } from '@/dictionaries';
import { IEmployee } from '@/models/employee';
import { dateToString } from '@/utils/date-to-string';

type Props = {
  employee: IEmployee;
  d: ReturnType<typeof getDictionary>;
};

export const EmployeePreview: FC<Props> = ({ employee, d }) => {
  return (
    <main className="flex flex-col gap-5">
      <AvatarPreview avatar={employee?.avatar} />
      <p className="text-xl font-bold text-center">{d.pages.employees.personalInformation}</p>
      <div className="flex flex-col">
        <p className="text-md">
          <b>{d.pages.employees.phone}</b>
          {employee.phone}
        </p>
        <p className="text-md">
          <b>{d.pages.employees.email}</b>
          {employee.email}
        </p>
        {employee.birthDate && (
          <p className="text-md">
            <b>{d.pages.employees.birthDate}</b>
            {dateToString(employee.birthDate)}
          </p>
        )}
      </div>
      <p className="text-xl font-bold text-center">{d.pages.employees.workingInformation}</p>
      <div className="flex flex-col">
        {employee.position && (
          <p className="text-md">
            <b>{d.pages.employees.position}</b>
            {employee.position}
          </p>
        )}
        <p className="text-md">
          <b>{d.pages.employees.level}</b>
          {employee.level}
        </p>
        <p className="text-md">
          <b>{d.pages.employees.hiringDate}</b>
          {dateToString(employee.startDate)}
        </p>
        {!employee.active && <p className="text-md font-bold text-red-700">{d.pages.employees.fired}</p>}
      </div>
    </main>
  );
};
