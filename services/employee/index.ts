import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IEmployee } from '@/models/employee';
import { addEmployee, getEmployees } from '@/services/employee/api';
import { EmployeePersonalData } from '@/services/employee/types';

interface EmployeeState {
  employees: IEmployee[];
  isLoading: boolean;
  getEmployees: () => Promise<void>;
  addEmployee: (employeeCreateData: EmployeePersonalData) => Promise<void>;
}

const useEmployeeStore = createWithEqualityFn<EmployeeState>()(
  (set) => ({
    employees: [],
    isLoading: false,
    getEmployees: async () => {
      set({ isLoading: true });

      try {
        const { data } = await getEmployees();

        set({ employees: data });
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    addEmployee: async (employeePersonalData: EmployeePersonalData) => {
      set({ isLoading: true });

      try {
        const { data } = await addEmployee(employeePersonalData);

        set((state) => ({ employees: [...state.employees, data] }));
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useEmployeeStore;
