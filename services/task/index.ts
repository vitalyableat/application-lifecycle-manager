import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { getClientLocale, getDictionary } from '@/dictionaries';
import { ITask } from '@/models/task';
import { numericCollationSort } from '@/utils/numeric-collation-sort';

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

let d: ReturnType<typeof getDictionary> | undefined;

if (typeof window !== 'undefined') {
  d = getDictionary(getClientLocale());
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
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
      } finally {
        set({ isLoading: false });
      }
    },
    addTask: async (createTaskData: CreateTaskData) => {
      set({ isLoading: true });
      try {
        const { data } = await addTask(createTaskData);

        set((state) => ({ tasks: [...state.tasks, data].sort((a, b) => numericCollationSort(a.title, b.title)) }));

        return data;
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    updateTask: async (task: ITask) => {
      set({ isLoading: true });
      try {
        const { data } = await updateTask(task);

        set((state) => ({
          tasks: state.tasks
            .map((task) => (task.id === data.id ? data : task))
            .sort((a, b) => numericCollationSort(a.title, b.title)),
        }));

        return data;
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
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
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useTaskStore;
