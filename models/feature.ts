import { model, models, ObjectId, Schema, SchemaTypes } from 'mongoose';

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

featureSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const FeatureModel = models?.Feature || model<IFeature>('Feature', featureSchema);
