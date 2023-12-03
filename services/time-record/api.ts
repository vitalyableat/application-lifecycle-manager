import { ITimeRecord } from '@/models/time-record';
import { api } from '@/services';

import { CreateTimeRecordData } from './types';

export const getProjectTimeRecords = (projectId: string) => api.get<ITimeRecord[]>(`/time-records/${projectId}`);

export const addTimeRecord = (createTimeRecordData: CreateTimeRecordData) =>
  api.post<ITimeRecord>('/time-records', createTimeRecordData);

export const updateTimeRecord = (timeRecord: ITimeRecord) => api.put<ITimeRecord>('/time-records', timeRecord);

export const deleteTimeRecord = (timeRecordId: string) => api.delete(`/time-records/${timeRecordId}`);
