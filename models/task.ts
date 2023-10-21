import { model, ObjectId, Schema, SchemaTypes } from 'mongoose';

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

export enum TASK_STATUS {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  TESTING = 'Testing',
  DONE = 'Done',
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

export const TaskModel = model<ITask>('Task', taskSchema);
