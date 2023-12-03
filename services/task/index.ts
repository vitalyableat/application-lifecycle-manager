import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { ITask } from '@/models/task';

import { addTask, deleteTask, getProjectTasks, updateTask } from './api';
import { CreateTaskData } from './types';

interface TaskState {
  tasks: ITask[];
  isLoading: boolean;
  getProjectTasks: (projectId: string) => Promise<void>;
  addTask: (createTaskData: CreateTaskData) => Promise<ITask>;
  updateTask: (task: ITask) => Promise<ITask>;
  deleteTask: (taskId: string) => Promise<void>;
}

const useTaskStore = createWithEqualityFn<TaskState>()(
  (set) => ({
    tasks: [],
    isLoading: false,
    getProjectTasks: async (projectId: string) => {
      set({ isLoading: true });
      try {
        const { data } = await getProjectTasks(projectId);

        set({ tasks: data });
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    addTask: async (createTaskData: CreateTaskData) => {
      set({ isLoading: true });
      try {
        const { data } = await addTask(createTaskData);

        set((state) => ({ tasks: [...state.tasks, data].sort((a, b) => (a.title < b.title ? -1 : 1)) }));

        return data;
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    updateTask: async (task: ITask) => {
      set({ isLoading: true });
      try {
        const { data } = await updateTask(task);

        set((state) => ({ tasks: state.tasks.map((task) => (task.id === data.id ? data : task)) }));

        return data;
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    deleteTask: async (taskId: string) => {
      set({ isLoading: true });
      try {
        await deleteTask(taskId);

        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) }));
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useTaskStore;
