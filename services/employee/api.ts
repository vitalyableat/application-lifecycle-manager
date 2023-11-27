import { IEmployee } from '@/models/employee';
import { api } from '@/services';

import { EmployeePersonalData } from './types';

export const getEmployees = () => api.get<IEmployee[]>('/employees');

export const getEmployeeById = (employeeId: string) => api.get<IEmployee>(`/employees/${employeeId}`);

export const addEmployee = (employeePersonalData: EmployeePersonalData) =>
  api.post<IEmployee>('/employees', employeePersonalData);

export const updateEmployee = (employeeUpdateData: Partial<IEmployee>) =>
  api.put<IEmployee>('/employees', employeeUpdateData);
