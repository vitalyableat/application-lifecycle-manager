import { FC } from 'react';

type Props = {
  spentTime: number;
  estimationTime: number;
};

export const LineOverflowChart: FC<Props> = ({ spentTime, estimationTime }) => {
  const height = 40;
  const estimationPercent = spentTime > estimationTime ? (estimationTime * 100) / spentTime : 100;
  const overflowPercent = spentTime > estimationTime ? 100 - estimationPercent : 0;
  const taskCompletionPercent = overflowPercent ? 100 : (spentTime * 100) / estimationTime;

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        {!!estimationPercent && (
          <div
            className={`w-[${estimationPercent}%] rounded-md border-2 border-secondary-200 overflow-hidden`}
            style={{ height, width: estimationPercent + '%' }}>
            {!!taskCompletionPercent && (
              <div className="bg-secondary-100" style={{ height, width: taskCompletionPercent + '%' }} />
            )}
          </div>
        )}
        {!!overflowPercent && (
          <div
            className="rounded-md border-2 border-danger-200 bg-danger-100"
            style={{ height, width: overflowPercent + '%' }}
          />
        )}
      </div>
      <label className="self-end text-sm text-left">
        {spentTime} / {estimationTime}
      </label>
    </div>
  );
};
