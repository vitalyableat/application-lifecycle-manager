import toast from 'react-hot-toast';

import { type AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { ITimeRecord } from '@/models/time-record';

import { addTimeRecord, deleteTimeRecord, getProjectTimeRecords, updateTimeRecord } from './api';
import { CreateTimeRecordData } from './types';

interface TimeRecordState {
  timeRecords: ITimeRecord[];
  isLoading: boolean;
  getProjectTimeRecords: (projectId: string) => Promise<void>;
  addTimeRecord: (createTimeRecordData: CreateTimeRecordData) => Promise<void>;
  updateTimeRecord: (timeRecord: ITimeRecord) => Promise<void>;
  deleteTimeRecord: (timeRecordId: string) => Promise<void>;
}

const useTimeRecordStore = createWithEqualityFn<TimeRecordState>()(
  (set) => ({
    timeRecords: [],
    isLoading: false,
    getProjectTimeRecords: async (projectId: string) => {
      set({ isLoading: true });
      try {
        const { data } = await getProjectTimeRecords(projectId);

        set({ timeRecords: data });
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    addTimeRecord: async (createTimeRecordData: CreateTimeRecordData) => {
      set({ isLoading: true });
      try {
        const { data } = await addTimeRecord(createTimeRecordData);

        set((state) => ({
          timeRecords: [...state.timeRecords, data].sort((a, b) =>
            a.date === b.date ? (a.time > b.time ? -1 : 1) : a.date > b.date ? -1 : 1,
          ),
        }));
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    updateTimeRecord: async (timeRecord: ITimeRecord) => {
      set({ isLoading: true });
      try {
        const { data } = await updateTimeRecord(timeRecord);

        set((state) => ({
          timeRecords: state.timeRecords.map((timeRecord) => (timeRecord.id === data.id ? data : timeRecord)),
        }));
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
    deleteTimeRecord: async (timeRecordId: string) => {
      set({ isLoading: true });
      try {
        await deleteTimeRecord(timeRecordId);

        set((state) => ({ timeRecords: state.timeRecords.filter((timeRecord) => timeRecord.id !== timeRecordId) }));
      } catch (e) {
        toast.error((e as AxiosResponse).request.statusText);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  shallow,
);

export default useTimeRecordStore;
