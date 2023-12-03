'use client';
import { FC, useMemo } from 'react';

import { ITimeRecord } from '@/models/time-record';

type Props = {
  taskTimeRecords: ITimeRecord[];
  estimation: number;
};

export const TimeRecordsLine: FC<Props> = ({ taskTimeRecords, estimation }) => {
  const timeSpent = useMemo(
    () => +taskTimeRecords.reduce((res, v) => res + Number(v.hoursSpent), 0).toFixed(2),
    [taskTimeRecords],
  );
  const estimationPercent = timeSpent > estimation ? (estimation * 100) / timeSpent : 100;
  const overflowPercent = timeSpent > estimation ? 100 - estimationPercent : 0;
  const taskCompletionPercent = overflowPercent ? 100 : (timeSpent * 100) / estimation;

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        {!!estimationPercent && (
          <div
            className={`h-8 w-[${estimationPercent}%] rounded-md border-2 border-secondary-200 overflow-hidden`}
            style={{ width: estimationPercent + '%' }}>
            {!!taskCompletionPercent && (
              <div className={`h-8 bg-secondary-100`} style={{ width: taskCompletionPercent + '%' }} />
            )}
          </div>
        )}
        {!!overflowPercent && (
          <div
            className={`h-8 rounded-md border-2 border-danger-200 bg-danger-100`}
            style={{ width: overflowPercent + '%' }}
          />
        )}
      </div>
      <label className="self-end text-sm text-left">
        {timeSpent} / {estimation}
      </label>
    </div>
  );
};
