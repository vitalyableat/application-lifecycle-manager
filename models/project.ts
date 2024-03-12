import { model, models, Schema, SchemaTypes } from 'mongoose';

import { PROJECT_LIFECYCLE_STEP } from '@/constants/project-lifecycle-step';
import { PROJECT_STATUS } from '@/constants/project-status';

export interface IProject {
  id: string;
  name: string;
  description?: string;
  status: PROJECT_STATUS;
  lifecycleStep: PROJECT_LIFECYCLE_STEP;
  employeeIds: string[];
  startDate: Date;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, unique: true },
  description: String,
  status: { type: String, required: true, enum: PROJECT_STATUS },
  lifecycleStep: { type: String, required: true, enum: PROJECT_LIFECYCLE_STEP },
  employeeIds: [{ type: SchemaTypes.ObjectId, ref: 'Employee' }],
  startDate: { type: Date, default: () => new Date() },
});

projectSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const ProjectModel = models?.Project || model<IProject>('Project', projectSchema);
