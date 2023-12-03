import { IFeature } from '@/models/feature';

export type CreateFeatureData = Omit<IFeature, 'id'>;
