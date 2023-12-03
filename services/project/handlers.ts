import { notFound } from 'next/navigation';

import { ProjectWithEmployees } from '@/services/project/types';

import { getProjectById } from './api';

export const getProjectByIdHandler = async (id: string): Promise<ProjectWithEmployees> => {
  try {
    const { data } = await getProjectById(id);

    return data;
  } catch (e) {
    notFound();
  }
};
