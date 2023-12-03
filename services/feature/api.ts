import { IFeature } from '@/models/feature';
import { api } from '@/services';

import { CreateFeatureData } from './types';

export const getProjectFeatures = (projectId: string) => api.get<IFeature[]>(`/features/${projectId}`);

export const addFeature = (createFeatureData: CreateFeatureData) => api.post<IFeature>('/features', createFeatureData);

export const updateFeature = (feature: IFeature) => api.put<IFeature>('/features', feature);

export const deleteFeature = (featureId: string) => api.delete(`/features/${featureId}`);
