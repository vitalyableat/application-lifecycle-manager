import { notFound } from 'next/navigation';

import { IEmployee } from '@/models/employee';

import { getEmployeeById } from './api';

export const getEmployeeByIdHandler = async (id: string): Promise<IEmployee> => {
  try {
    const { data } = await getEmployeeById(id);

    return data;
  } catch (e) {
    notFound();
  }
};
