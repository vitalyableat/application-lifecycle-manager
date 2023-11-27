import { FC } from 'react';

import { AvatarPreview } from '@/components/ui';
import { IEmployee } from '@/models/employee';
import { dateToString } from '@/utils/date-to-string';

type Props = {
  employee: IEmployee;
};

export const EmployeePreview: FC<Props> = ({ employee }) => {
  return (
    <main className="flex flex-col gap-5">
      <AvatarPreview avatar={employee?.avatar} />
      <p className="text-xl font-bold text-center">Personal Information</p>
      <div className="flex flex-col">
        <p className="text-md">
          <b>Phone: </b>
          {employee.phone}
        </p>
        <p className="text-md">
          <b>Email: </b>
          {employee.email}
        </p>
        {employee.birthDate && (
          <p className="text-md">
            <b>Birth Date: </b>
            {dateToString(employee.birthDate)}
          </p>
        )}
      </div>
      <p className="text-xl font-bold text-center">Working Information</p>
      <div className="flex flex-col">
        {employee.position && (
          <p className="text-md">
            <b>Position: </b>
            {employee.position}
          </p>
        )}
        <p className="text-md">
          <b>Professional Level: </b>
          {employee.level}
        </p>
        <p className="text-md">
          <b>Hiring Date: </b>
          {dateToString(employee.startDate)}
        </p>
        {!employee.active && <p className="text-md font-bold text-red-700">Fired</p>}
      </div>
    </main>
  );
};
