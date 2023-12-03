import { model, models, Schema } from 'mongoose';

export interface IFeature {
  id: string;
  projectId: string;
  title: string;
  description?: string;
}

const featureSchema = new Schema<IFeature>({
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
});

featureSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const FeatureModel = models?.Feature || model<IFeature>('Feature', featureSchema);
