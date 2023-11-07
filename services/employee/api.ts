import { IEmployee } from '@/models/employee';
import { api } from '@/services';

import { EmployeePersonalData } from './types';

export const getEmployees = () => api.get<IEmployee[]>('/employees');

export const addEmployee = (employeePersonalData: EmployeePersonalData) =>
  api.post<IEmployee>('/employees', employeePersonalData);
