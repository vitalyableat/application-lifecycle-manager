import { ITask } from '@/models/task';
import { api } from '@/services';

import { CreateTaskData } from './types';

export const getProjectTasks = (projectId: string) => api.get<ITask[]>(`/tasks/${projectId}`);

export const addTask = (createTaskData: CreateTaskData) => api.post<ITask>('/tasks', createTaskData);

export const updateTask = (task: ITask) => api.put<ITask>('/tasks', task);

export const deleteTask = (taskId: string) => api.delete(`/tasks/${taskId}`);
