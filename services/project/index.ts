import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IProject } from '@/models/project';

import { addProject, deleteProject, getProjects, updateProject } from './api';
import { CreateProjectData } from './types';

interface ProjectState {
  projects: IProject[];
  isLoading: boolean;
  getProjects: () => Promise<void>;
  addProject: (createProjectData: CreateProjectData) => Promise<IProject>;
  updateProject: (project: IProject) => Promise<IProject>;
  deleteProject: (projectId: string) => Promise<void>;
}

const useProjectStore = createWithEqualityFn<ProjectState>()(
  (set) => ({
    projects: [],
    isLoading: false,
    getProjects: async () => {
      set({ isLoading: true });
      try {
        const { data } = await getProjects();

        set({ projects: data });
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    addProject: async (createProjectData: CreateProjectData) => {
      set({ isLoading: true });
      try {
        const { data } = await addProject(createProjectData);

        set((state) => ({ projects: [...state.projects, data].sort((a, b) => (a.name < b.name ? -1 : 1)) }));

        return data;
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    updateProject: async (project: IProject) => {
      set({ isLoading: true });
      try {
        const { data } = await updateProject(project);

        set((state) => ({ projects: state.projects.map((project) => (project.id === data.id ? data : project)) }));

        return data;
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
        throw new Error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    deleteProject: async (projectId: string) => {
      set({ isLoading: true });
      try {
        await deleteProject(projectId);

        set((state) => ({ projects: state.projects.filter((project) => project.id !== projectId) }));
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useProjectStore;
