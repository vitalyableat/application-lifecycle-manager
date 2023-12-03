import { IEmployee } from '@/models/employee';
import { IProject } from '@/models/project';

export type CreateProjectData = Omit<IProject, 'id'>;

export type ProjectWithEmployees = IProject & {
  employees: IEmployee[];
};
