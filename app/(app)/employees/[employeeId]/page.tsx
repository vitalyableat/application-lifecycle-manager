import { EmployeePreview } from '@/components/ui';
import { getEmployeeByIdHandler } from '@/services/employee/handlers';

const EmployeeDetailsPage = async ({ params }: { params: { employeeId: string } }) => {
  const employee = await getEmployeeByIdHandler(params.employeeId);

  return <EmployeePreview employee={employee} />;
};

export default EmployeeDetailsPage;
