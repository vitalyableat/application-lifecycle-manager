import { model, ObjectId, Schema, SchemaTypes } from 'mongoose';

export interface IProject {
  id: string;
  name: string;
  description?: string;
  status: PROJECT_STATUS;
  startDate: Date;
  endDate?: Date;
  employeeIds: ObjectId[];
}

export enum PROJECT_STATUS {
  ACTIVE = 'Active',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
  ABANDONED = 'Abandoned',
  REOPENED = 'Reopened',
  PENDING_APPROVAL = 'Pending Approval',
  CANCELLED = 'Cancelled',
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: String,
  status: { type: String, default: PROJECT_STATUS.PENDING_APPROVAL, enum: PROJECT_STATUS },
  startDate: { type: Date, default: () => new Date() },
  endDate: Date,
  employeeIds: [{ type: SchemaTypes.ObjectId, ref: 'Employee' }],
});

export const ProjectModel = model<IProject>('Project', projectSchema);
