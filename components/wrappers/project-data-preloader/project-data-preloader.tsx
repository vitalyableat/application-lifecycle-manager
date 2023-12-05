'use client';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useParams } from 'next/navigation';

import { Loader } from '@/components/ui';
import useFeatureStore from '@/services/feature';
import useTaskStore from '@/services/task';
import useTimeRecordStore from '@/services/time-record';

export const ProjectDataPreloader: FC<PropsWithChildren> = ({ children }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isFeaturesLoading, getProjectFeatures] = useFeatureStore((state) => [
    state.isLoading,
    state.getProjectFeatures,
  ]);
  const [isTasksLoading, getProjectTasks] = useTaskStore((state) => [state.isLoading, state.getProjectTasks]);
  const [isTimeRecordsLoading, getProjectTimeRecords] = useTimeRecordStore((state) => [
    state.isLoading,
    state.getProjectTimeRecords,
  ]);

  useEffect(() => {
    getProjectFeatures(projectId);
    getProjectTasks(projectId);
    getProjectTimeRecords(projectId);
  }, []);

  const isLoading = isFeaturesLoading || isTasksLoading || isTimeRecordsLoading;

  return (
    <>
      {isLoading && <Loader />}
      {children}
    </>
  );
};
