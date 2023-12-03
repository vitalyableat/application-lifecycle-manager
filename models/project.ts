import { model, models, Schema, SchemaTypes } from 'mongoose';

import { PROJECT_STATUS } from '@/constants/project-status';

export interface IProject {
  id: string;
  name: string;
  description?: string;
  status: PROJECT_STATUS;
  employeeIds: string[];
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, unique: true },
  description: String,
  status: { type: String, required: true, enum: PROJECT_STATUS },
  employeeIds: [{ type: SchemaTypes.ObjectId, ref: 'Employee' }],
});

projectSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const ProjectModel = models?.Project || model<IProject>('Project', projectSchema);
