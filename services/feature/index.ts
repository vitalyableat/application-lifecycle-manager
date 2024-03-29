import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { getClientLocale, getDictionary } from '@/dictionaries';
import { IFeature } from '@/models/feature';
import { numericCollationSort } from '@/utils/numeric-collation-sort';

import { addFeature, deleteFeature, getProjectFeatures, updateFeature } from './api';
import { CreateFeatureData } from './types';

interface FeatureState {
  features: IFeature[];
  isLoading: boolean;
  getProjectFeatures: (projectId: string) => Promise<void>;
  addFeature: (createFeatureData: CreateFeatureData) => Promise<void>;
  updateFeature: (feature: IFeature) => Promise<void>;
  deleteFeature: (featureId: string) => Promise<void>;
}

let d: ReturnType<typeof getDictionary> | undefined;

if (typeof window !== 'undefined') {
  d = getDictionary(getClientLocale());
}

const useFeatureStore = createWithEqualityFn<FeatureState>()(
  (set) => ({
    features: [],
    isLoading: false,
    getProjectFeatures: async (projectId: string) => {
      set({ isLoading: true });
      try {
        const { data } = await getProjectFeatures(projectId);

        set({ features: data });
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
      } finally {
        set({ isLoading: false });
      }
    },
    addFeature: async (createFeatureData: CreateFeatureData) => {
      set({ isLoading: true });
      try {
        const { data } = await addFeature(createFeatureData);

        set((state) => ({
          features: [...state.features, data].sort((a, b) => numericCollationSort(a.title, b.title)),
        }));
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
      } finally {
        set({ isLoading: false });
      }
    },
    updateFeature: async (feature: IFeature) => {
      set({ isLoading: true });
      try {
        const { data } = await updateFeature(feature);

        set((state) => ({
          features: state.features
            .map((feature) => (feature.id === data.id ? data : feature))
            .sort((a, b) => numericCollationSort(a.title, b.title)),
        }));
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
      } finally {
        set({ isLoading: false });
      }
    },
    deleteFeature: async (featureId: string) => {
      set({ isLoading: true });
      try {
        await deleteFeature(featureId);

        set((state) => ({ features: state.features.filter((feature) => feature.id !== featureId) }));
      } catch (e) {
        toast.error(d?.server[(e as AxiosResponse).request.statusText as keyof typeof d.server] || '');
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useFeatureStore;
