'use client';
import { FC, useMemo } from 'react';

import { Button } from '@nextui-org/react';
import { ChevronUpIcon } from '@nextui-org/shared-icons';

import { LineChart } from '@/components/charts';
import { IEmployee } from '@/models/employee';
import { ITimeRecord } from '@/models/time-record';
import { dateToString } from '@/utils/date-to-string';
import { getEmployeeFullName } from '@/utils/get-employee-full-name';
import { getTimeThroughHours } from '@/utils/get-time-through-hours';

type Props = {
  taskTitle: string;
  spentHours: number;
  maxSpentHours: number;
  timeRecords: ITimeRecord[];
  employees: IEmployee[];
  isDetailsOpen: boolean;
  toggleDetails: () => void;
};

export const TaskSpentTimeDetails: FC<Props> = ({
  taskTitle,
  spentHours,
  maxSpentHours,
  timeRecords,
  employees,
  isDetailsOpen,
  toggleDetails,
}) => {
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
      <p className="font-bold text-md">{taskTitle}</p>
      <div className="flex gap-3 w-full">
        <LineChart value={spentHours} maxValue={maxSpentHours} />
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
                    ({timeRecord.hoursSpent}) – {getEmployeeFullName(timeRecord.employeeId, employees)}
                  </b>
                </div>
              ))}
            </div>
          ))}
          <p className="font-bold text-md">Total hours spent: {spentHours}</p>
        </div>
      )}
    </div>
  );
};
