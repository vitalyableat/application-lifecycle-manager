'use client';
import { FC, useEffect, useMemo } from 'react';

import { Button } from '@nextui-org/react';
import { AddNoteBulkIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';
import { useParams, useRouter } from 'next/navigation';

import { APP_ROUTE } from '@/constants/app-route';
import useEmployeeStore from '@/services/employee';

export const EmployeeHeader: FC = () => {
  const { employeeId } = useParams<{ employeeId?: string }>();
  const router = useRouter();
  const [isLoading, employees] = useEmployeeStore((state) => [state.isLoading, state.employees]);
  const employee = useMemo(() => employees.find(({ id }) => id === employeeId), [employees, employeeId]);

  useEffect(() => {
    if (employees.length && !employee) {
      router.push(APP_ROUTE.EMPLOYEES);
    }
  }, [employee]);

  return (
    <div className="w-full border-b-1 p-6 relative h-[72px]">
      {!isLoading && (
        <p className="font-bold max-w-[calc(100%-40px)] txt-overflow">
          {employee?.name} {employee?.surname}
        </p>
      )}

      <Button
        className="absolute right-4 top-4"
        isIconOnly
        color="secondary"
        variant="flat"
        onClick={() =>
          router.push(
            employeeId ? APP_ROUTE.EMPLOYEE_DETAILS_EDIT.replace(':employeeId', employeeId) : APP_ROUTE.EMPLOYEE_CREATE,
          )
        }>
        {employeeId ? <EditDocumentBulkIcon fontSize={24} /> : <AddNoteBulkIcon fontSize={24} />}
      </Button>
    </div>
  );
};
