import { model, models, ObjectId, Schema, SchemaTypes } from 'mongoose';

import { TASK_STATUS } from '@/constants/task-status';

export interface ITask {
  id: string;
  featureId: ObjectId;
  employeeId?: ObjectId;
  title: string;
  description?: string;
  status: TASK_STATUS;
  estimation?: number;
  startDateTime?: Date;
  spentHours?: number;
}

const taskSchema = new Schema<ITask>({
  featureId: { type: SchemaTypes.ObjectId, required: true, ref: 'Feature' },
  employeeId: { type: SchemaTypes.ObjectId, ref: 'Employee' },
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: TASK_STATUS.TO_DO, enum: TASK_STATUS },
  estimation: Number,
  startDateTime: Date,
  spentHours: Number,
});

taskSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const TaskModel = models?.Task || model<ITask>('Task', taskSchema);
