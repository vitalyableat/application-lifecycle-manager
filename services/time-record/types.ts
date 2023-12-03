import { ITimeRecord } from '@/models/time-record';

export type CreateTimeRecordData = Omit<ITimeRecord, 'id'>;
