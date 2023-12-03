import { FC } from 'react';

import { EmployeePersonalDataForm, EmployeeWorkingDataForm } from '@/components/forms';
import { RoleCheck } from '@/components/templates';
import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { getEmployeeByIdHandler } from '@/services/employee/handlers';

import { ShowLoader } from '../../components';

const EmployeeDetailsEditPage: FC<{ params: { employeeId: string } }> = async ({ params }) => {
  const employee = await getEmployeeByIdHandler(params.employeeId);

  return (
    <RoleCheck role={EMPLOYEE_ROLE.RESOURCE_MANAGER} redirect={APP_ROUTE.EMPLOYEES}>
      <main className="flex flex-col gap-6">
        <ShowLoader />
        <EmployeePersonalDataForm employee={employee} />
        <EmployeeWorkingDataForm employee={employee} />
      </main>
    </RoleCheck>
  );
};

export default EmployeeDetailsEditPage;
