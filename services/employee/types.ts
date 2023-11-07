import { EMPLOYEE_LEVEL } from '@/constants/employee-level';

export type EmployeePersonalData = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  birthDate?: string;
};

export type EmployeeWorkingData = {
  position: string;
  level: EMPLOYEE_LEVEL;
  active?: string;
};
