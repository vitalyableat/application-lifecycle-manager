import { EmployeePreview } from '@/components/ui';
import { getDictionary, getServerLocale } from '@/dictionaries';
import { getEmployeeByIdHandler } from '@/services/employee/handlers';

const EmployeeDetailsPage = async ({ params }: { params: { employeeId: string } }) => {
  const d = getDictionary(await getServerLocale());
  const employee = await getEmployeeByIdHandler(params.employeeId);

  return <EmployeePreview employee={employee} d={d} />;
};

export default EmployeeDetailsPage;
