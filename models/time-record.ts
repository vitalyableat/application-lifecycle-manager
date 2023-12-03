import { model, models, Schema } from 'mongoose';

export interface ITimeRecord {
  id: string;
  hoursSpent: string;
  date: string;
  time: string;
  taskId: string;
  featureId: string;
  projectId: string;
  employeeId: string;
}

const timeRecordSchema = new Schema<ITimeRecord>({
  hoursSpent: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  taskId: { type: String, required: true },
  featureId: { type: String, required: true },
  projectId: { type: String, required: true },
  employeeId: { type: String, required: true },
});

timeRecordSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const TimeRecordModel = models?.TimeRecord || model<ITimeRecord>('TimeRecord', timeRecordSchema);
