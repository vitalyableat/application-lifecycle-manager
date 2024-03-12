import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { getClientLocale, getDictionary } from '@/dictionaries';
import { IEmployee } from '@/models/employee';
import { addEmployee, getEmployees, updateEmployee } from '@/services/employee/api';
import { EmployeePersonalData } from '@/services/employee/types';

interface EmployeeState {
  employees: IEmployee[];
  isLoading: boolean;
  getEmployees: () => Promise<void>;
  addEmployee: (employeeCreateData: EmployeePersonalData) => Promise<IEmployee>;
  updateEmployee: (employeeUpdateData: Partial<IEmployee>) => Promise<IEmployee>;
}

let d: ReturnType<typeof getDictionary> | undefined;

if (typeof window !== 'undefined') {
  d = getDictionary(getClientLocale());
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
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
      } finally {
        set({ isLoading: false });
      }
    },
    addEmployee: async (employeePersonalData: EmployeePersonalData) => {
      set({ isLoading: true });
      try {
        const { data } = await addEmployee(employeePersonalData);

        set((state) => ({
          employees: [...state.employees, data].sort((a, b) =>
            a.name + ' ' + a.surname < b.name + ' ' + b.surname ? -1 : 1,
          ),
        }));

        return data;
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    updateEmployee: async (employeeUpdateData: Partial<IEmployee>) => {
      set({ isLoading: true });
      try {
        const { data } = await updateEmployee(employeeUpdateData);

        set((state) => ({
          employees: state.employees
            .map((employee) => (employee.id === data.id ? data : employee))
            .sort((a, b) => (a.name + ' ' + a.surname < b.name + ' ' + b.surname ? -1 : 1)),
        }));

        return data;
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useEmployeeStore;
