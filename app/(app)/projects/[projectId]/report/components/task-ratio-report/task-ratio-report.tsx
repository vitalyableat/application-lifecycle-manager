'use client';
import { FC, useMemo } from 'react';

import { TaskRatioCircleChart, TaskRatioCircleChartData } from '@/components/charts';
import { TASK_STATUS } from '@/constants/task-status';
import useFeatureStore from '@/services/feature';
import useTaskStore from '@/services/task';

const initialTaskAmount: { [key in TASK_STATUS]: number } = {
  [TASK_STATUS.TO_DO]: 0,
  [TASK_STATUS.ON_HOLD]: 0,
  [TASK_STATUS.DEVELOPMENT]: 0,
  [TASK_STATUS.CODE_REVIEW]: 0,
  [TASK_STATUS.TESTING]: 0,
  [TASK_STATUS.DONE]: 0,
};

export const TaskRatioReport: FC = () => {
  const features = useFeatureStore((state) => state.features);
  const tasks = useTaskStore((state) => state.tasks);
  const initialReportValue: { [key: string]: TaskRatioCircleChartData } = useMemo(
    () =>
      features.reduce((res, f) => ({ ...res, [f.id]: { feature: f.title, ...initialTaskAmount } }), {
        project: {
          feature: 'All Project Tasks',
          ...initialTaskAmount,
        },
      }),
    [features],
  );
  const { project, ...report }: { [key: string]: TaskRatioCircleChartData } = useMemo(
    () =>
      tasks.reduce(
        (res, t) => ({
          ...res,
          [t.featureId]: { ...res[t.featureId], [t.status]: res[t.featureId]?.[t.status] + 1 },
          project: { ...res['project'], [t.status]: res['project'][t.status] + 1 },
        }),
        initialReportValue,
      ),
    [initialReportValue, tasks],
  );

  return (
    <div className="flex flex-col p-6 gap-5">
      <TaskRatioCircleChart data={project} isProject />
      <div className="flex flex-wrap gap-5 justify-center">
        {Object.values(report).map((data, index) => (
          <TaskRatioCircleChart key={index} data={data} />
        ))}
      </div>
    </div>
  );
};
