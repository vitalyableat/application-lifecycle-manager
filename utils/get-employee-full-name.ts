import { IEmployee } from '@/models/employee';

export const getEmployeeFullName = (employeeId: string, employees: IEmployee[]) => {
  const employee = employees.find((employee) => employee.id === employeeId);

  return employee?.name + ' ' + employee?.surname;
};
