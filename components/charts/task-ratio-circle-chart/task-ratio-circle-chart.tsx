'use client';
import { FC } from 'react';

import { TASK_STATUS } from '@/constants/task-status';

const PALETTE: { [key in TASK_STATUS]: string } = {
  [TASK_STATUS.TO_DO]: '#E4E4E7',
  [TASK_STATUS.ON_HOLD]: '#FFB8EB',
  [TASK_STATUS.DEVELOPMENT]: '#C9A9E9',
  [TASK_STATUS.CODE_REVIEW]: '#FBDBA7',
  [TASK_STATUS.TESTING]: '#C3F4FD',
  [TASK_STATUS.DONE]: '#A2E9C1',
};

export type TaskRatioCircleChartData = { [key in TASK_STATUS]: number } & { feature: string };

type Props = {
  data: TaskRatioCircleChartData;
  isProject?: boolean;
};

export const TaskRatioCircleChart: FC<Props> = ({ data: { feature, ...taskAmountByStatus }, isProject }) => {
  const taskTotal = Object.values(taskAmountByStatus).reduce((res, amount) => res + amount, 0);
  const { gradient } = taskTotal
    ? Object.entries(taskAmountByStatus).reduce(
        (res, [status, amount]) => ({
          gradient: [
            ...res.gradient,
            `${PALETTE[status as TASK_STATUS]} ${res.degree}deg ${res.degree + (amount * 360) / taskTotal || 0}deg`,
          ],
          degree: res.degree + (amount * 360) / taskTotal || 0,
        }),
        {
          gradient: [] as string[],
          degree: 0,
        },
      )
    : { gradient: ['white'] };
  const k = isProject ? 2 : 1;

  return (
    <div className={`flex flex-col gap-3 ${isProject ? 'w-full' : 'w-fit'} items-center`}>
      <p className={`font-bold ${isProject ? 'text-lg' : 'text-md'} text-center`}>{feature}</p>
      <div className="flex gap-5">
        <div
          className="flex items-center justify-center rounded-full border-3 border-default-300"
          style={{
            width: 200 * k,
            height: 200 * k,
            backgroundImage: `conic-gradient(${gradient.join(', ')})`,
          }}>
          <div
            className={`bg-white rounded-full border-3 border-default-300`}
            style={{ width: 96 * k, height: 96 * k }}></div>
        </div>
        <div className="flex flex-col my-auto">
          {Object.entries(taskAmountByStatus).map(([status, amount]) => (
            <div key={status} className="flex gap-3">
              <div
                className="h-5 w-10 border-1 border-default-300"
                style={{ backgroundColor: PALETTE[status as TASK_STATUS] }}
              />
              <span>
                <b>{status}</b> - {amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
