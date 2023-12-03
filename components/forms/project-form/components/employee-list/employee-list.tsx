import { FC } from 'react';

import { Button } from '@nextui-org/react';
import { CloseIcon } from '@nextui-org/shared-icons';

import { EmployeeItem } from '@/components/ui';
import { IEmployee } from '@/models/employee';

type Props = {
  employees: IEmployee[];
  rotateIcon?: boolean;
  onIconClick: (employeeId: string) => void;
};

export const EmployeeList: FC<Props> = ({ employees, rotateIcon, onIconClick }) => {
  return (
    <div className="flex flex-col gap-3 items-start w-full max-h-80 overflow-y-auto pr-3">
      {employees.map((employee) => (
        <div key={employee.id} className="flex w-full gap-5 relative">
          <EmployeeItem employee={employee} />
          <Button
            className="absolute top-0 right-0"
            isIconOnly
            color="secondary"
            variant="flat"
            onClick={() => onIconClick(employee.id)}>
            <CloseIcon fontSize={24} className={`${rotateIcon && 'rotate-45'}`} />
          </Button>
        </div>
      ))}
    </div>
  );
};
