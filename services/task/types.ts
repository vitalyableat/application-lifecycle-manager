import { ITask } from '@/models/task';

export type CreateTaskData = Omit<ITask, 'id'>;
