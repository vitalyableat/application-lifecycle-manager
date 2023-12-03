import { FC } from 'react';

import { EmployeePersonalDataForm, EmployeeWorkingDataForm } from '@/components/forms';
import { getEmployeeByIdHandler } from '@/services/employee/handlers';

import { ShowLoader } from '../../components';

const EmployeeDetailsEditPage: FC<{ params: { employeeId: string } }> = async ({ params }) => {
  const employee = await getEmployeeByIdHandler(params.employeeId);

  return (
    <main className="flex flex-col gap-6">
      <ShowLoader />
      <EmployeePersonalDataForm employee={employee} />
      <EmployeeWorkingDataForm employee={employee} />
    </main>
  );
};

export default EmployeeDetailsEditPage;
