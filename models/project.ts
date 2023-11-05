import { model, models, ObjectId, Schema, SchemaTypes } from 'mongoose';

import { PROJECT_STATUS } from '@/constants/project-status';

export interface IProject {
  id: string;
  name: string;
  description?: string;
  status: PROJECT_STATUS;
  startDate: Date;
  endDate?: Date;
  employeeIds: ObjectId[];
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: String,
  status: { type: String, default: PROJECT_STATUS.PENDING_APPROVAL, enum: PROJECT_STATUS },
  startDate: { type: Date, default: () => new Date() },
  endDate: Date,
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
