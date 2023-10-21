import { model, ObjectId, Schema, SchemaTypes } from 'mongoose';

export interface IFeature {
  id: string;
  projectId: ObjectId;
  title: string;
  description: string;
}

const featureSchema = new Schema<IFeature>({
  projectId: { type: SchemaTypes.ObjectId, required: true, ref: 'Project' },
  title: { type: String, required: true },
  description: String,
});

export const FeatureModel = model<IFeature>('Feature', featureSchema);
