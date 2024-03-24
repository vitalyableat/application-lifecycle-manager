import { FC, useMemo } from 'react';

import { Avatar } from '@nextui-org/react';

import { TASK_STATUS } from '@/constants/task-status';
import { ITask } from '@/models/task';
import { ProjectWithEmployees } from '@/services/project/types';
import useTimeRecordStore from '@/services/time-record';

type Props = {
  task: ITask;
  openTaskDetails: (defaultStatus?: TASK_STATUS, task?: ITask) => void;
  project: ProjectWithEmployees;
};

export const TaskCard: FC<Props> = ({ task, openTaskDetails, project }) => {
  const timeRecords = useTimeRecordStore((state) => state.timeRecords);
  const spentHours = useMemo(
    () => timeRecords.reduce((res, record) => (record.taskId === task.id ? res + +record.hoursSpent : res), 0),
    [task, timeRecords],
  );
  const assignee = useMemo(
    () => project.employees.find((employee) => employee.id === task.employeeId),
    [project, task],
  );

  return (
    <div
      key={task.id}
      className="flex flex-col rounded-md p-3 gap-1 bg-default-100 hover:shadow cursor-pointer"
      onClick={() => openTaskDetails(undefined, task)}>
      <p className="font-bold txt-overflow">{task.title}</p>
      <p className="txt-overflow-3">{task.description}</p>
      <div className="flex justify-between w-full items-end">
        <p>
          {spentHours} / {Number(task.hoursEstimation)}{' '}
        </p>
        <Avatar src={assignee?.avatar} size="sm" />
      </div>
    </div>
  );
};
