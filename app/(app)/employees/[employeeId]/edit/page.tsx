import { FC } from 'react';

import { EmployeePersonalDataForm, EmployeeWorkingDataForm } from '@/components/forms';
import { Loader } from '@/components/ui';
import useEmployeeStore from '@/services/employee';
import { getEmployeeByIdHandler } from '@/services/employee/handlers';

const EmployeeDetailsEditPage: FC<{ params: { employeeId: string } }> = async ({ params }) => {
  const employee = await getEmployeeByIdHandler(params.employeeId);

  return (
    <main className="flex flex-col gap-6">
      {useEmployeeStore.getState().isLoading && <Loader />}
      <EmployeePersonalDataForm employee={employee} />
      <EmployeeWorkingDataForm employee={employee} />
    </main>
  );
};

export default EmployeeDetailsEditPage;
