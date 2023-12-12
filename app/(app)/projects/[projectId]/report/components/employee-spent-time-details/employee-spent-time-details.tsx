'use client';
import { FC, useMemo } from 'react';

import { Button } from '@nextui-org/react';
import { ChevronUpIcon } from '@nextui-org/shared-icons';

import { LineOverflowChart } from '@/components/charts';
import { ITimeRecord } from '@/models/time-record';
import useTaskStore from '@/services/task';
import { dateToString } from '@/utils/date-to-string';
import { getTimeThroughHours } from '@/utils/get-time-through-hours';

type Props = {
  employeeFullName: string;
  spentHours: number;
  totalWorkingHours: number;
  timeRecords: ITimeRecord[];
  isDetailsOpen: boolean;
  toggleDetails: () => void;
};

export const EmployeeSpentTimeDetails: FC<Props> = ({
  employeeFullName,
  spentHours,
  totalWorkingHours,
  timeRecords,
  isDetailsOpen,
  toggleDetails,
}) => {
  const tasks = useTaskStore((state) => state.tasks);
  const timeRecordsByDate = useMemo(
    () =>
      timeRecords.reduce(
        (res, timeRecord) => ({ ...res, [timeRecord.date]: [...(res[timeRecord.date] || []), timeRecord] }),
        {} as { [key: string]: ITimeRecord[] },
      ),
    [timeRecords],
  );

  return (
    <div className="flex flex-col">
      <p className="font-bold text-md">{employeeFullName}</p>
      <div className="flex gap-3 w-full">
        <LineOverflowChart spentTime={spentHours} estimationTime={totalWorkingHours} />
        <Button isIconOnly color="secondary" variant="flat" onClick={toggleDetails}>
          <ChevronUpIcon fontSize={24} style={{ rotate: isDetailsOpen ? '0deg' : '180deg' }} />
        </Button>
      </div>
      {isDetailsOpen && (
        <div className="flex flex-col gap-2">
          {Object.entries(timeRecordsByDate).map(([date, timeRecords]) => (
            <div key={date} className="flex flex-col">
              <p className="font-bold text-md">{dateToString(date)}</p>
              {timeRecords.map((timeRecord) => (
                <div key={timeRecord.id}>
                  {timeRecord.time}-{getTimeThroughHours(timeRecord.time, +timeRecord.hoursSpent)}{' '}
                  <b>
                    ({timeRecord.hoursSpent}) – {tasks.find(({ id }) => id === timeRecord.taskId)?.title}
                  </b>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
