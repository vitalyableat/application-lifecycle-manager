'use client';
import { FC, useEffect, useMemo } from 'react';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { WithRoleAccess } from '@/components/templates';
import { ActionButton } from '@/components/ui';
import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import useEmployeeStore from '@/services/employee';

export const EmployeeHeader: FC = () => {
  const { employeeId } = useParams<{ employeeId?: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const shouldShowBack = pathname.includes('/create') || pathname.includes('edit');
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

      <WithRoleAccess rolesWithAccess={[EMPLOYEE_ROLE.RESOURCE_MANAGER]}>
        <ActionButton
          icon={shouldShowBack ? 'back' : employeeId ? 'edit' : 'create'}
          routerBack={shouldShowBack}
          onClick={() =>
            router.push(
              employeeId
                ? APP_ROUTE.EMPLOYEE_DETAILS_EDIT.replace(':employeeId', employeeId)
                : APP_ROUTE.EMPLOYEE_CREATE,
            )
          }
        />
      </WithRoleAccess>
    </div>
  );
};
