import { IProject } from '@/models/project';
import { api } from '@/services';

import { CreateProjectData, ProjectWithEmployees } from './types';

export const getProjects = () => api.get<IProject[]>('/projects');

export const getProjectById = (projectId: string) => api.get<ProjectWithEmployees>(`/projects/${projectId}`);

export const addProject = (createProjectData: CreateProjectData) => api.post<IProject>('/projects', createProjectData);

export const updateProject = (project: IProject) => api.put<IProject>('/projects', project);

export const deleteProject = (projectId: string) => api.delete(`/projects/${projectId}`);
