'use client';
import { FC, useMemo, useState } from 'react';

import { IEmployee } from '@/models/employee';
import { ITimeRecord } from '@/models/time-record';
import useTaskStore from '@/services/task';
import useTimeRecordStore from '@/services/time-record';

import { TaskSpentTimeDetails } from '../task-spent-time-details';

type Props = {
  startDate: string;
  endDate: string;
  employees: IEmployee[];
};

type SpentHoursForTask = {
  [key: string]: {
    spentHours: number;
    taskTitle: string;
    timeRecords: ITimeRecord[];
  };
};

export const TaskTimeReport: FC<Props> = ({ startDate, endDate, employees }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const timeRecords = useTimeRecordStore((state) => state.timeRecords);
  const filteredTimeRecords = useMemo(
    () => timeRecords.filter(({ date }) => date >= startDate && date <= endDate),
    [timeRecords, startDate, endDate],
  );
  const spentHoursForTasksInitialValue: SpentHoursForTask = useMemo(
    () =>
      tasks.reduce(
        (res, task) => ({
          ...res,
          [task.id]: {
            spentHours: 0,
            taskTitle: task.title,
            timeRecords: [] as ITimeRecord[],
          },
        }),
        {} as SpentHoursForTask,
      ),
    [tasks],
  );
  const spentHoursForTasks: SpentHoursForTask = useMemo(
    () =>
      filteredTimeRecords.reduce(
        (res, timeRecord) => ({
          ...res,
          [timeRecord.taskId]: {
            ...res[timeRecord.taskId],
            spentHours: (res[timeRecord.taskId].spentHours || 0) + Number(timeRecord.hoursSpent),
            timeRecords: [...res[timeRecord.taskId].timeRecords, timeRecord],
          },
        }),
        spentHoursForTasksInitialValue,
      ),
    [filteredTimeRecords, employees],
  );
  const sortedBySpentHoursTasks = useMemo(
    () =>
      Object.entries(spentHoursForTasks)
        .map(([taskId, restDetails]) => ({ taskId, ...restDetails }))
        .sort((a, b) => b.spentHours - a.spentHours),
    [spentHoursForTasks],
  );
  const maxSpentHours = useMemo(() => sortedBySpentHoursTasks[0].spentHours, [sortedBySpentHoursTasks]);

  return (
    <div className="flex flex-col p-6 gap-3">
      <p className="font-bold text-lg text-center">Employee Working Hours Report</p>
      {sortedBySpentHoursTasks.map(({ taskId, spentHours, taskTitle, timeRecords }) => (
        <TaskSpentTimeDetails
          key={taskId}
          taskTitle={taskTitle}
          spentHours={spentHours}
          maxSpentHours={maxSpentHours}
          timeRecords={timeRecords}
          employees={employees}
          isDetailsOpen={selectedTaskId === taskId}
          toggleDetails={() => setSelectedTaskId((id) => (id === taskId ? '' : taskId))}
        />
      ))}
    </div>
  );
};
