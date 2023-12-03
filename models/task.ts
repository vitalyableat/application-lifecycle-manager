import { model, models, Schema } from 'mongoose';

import { TASK_STATUS } from '@/constants/task-status';

export interface ITask {
  id: string;
  featureId: string;
  projectId: string;
  employeeId?: string;
  title: string;
  description?: string;
  status: TASK_STATUS;
  hoursEstimation?: string;
}

const taskSchema = new Schema<ITask>({
  featureId: { type: String, required: true },
  projectId: { type: String, required: true },
  employeeId: String,
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: TASK_STATUS.TO_DO, enum: TASK_STATUS },
  hoursEstimation: String,
});

taskSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const TaskModel = models?.Task || model<ITask>('Task', taskSchema);
