import { FC } from 'react';

import { IEmployee } from '@/models/employee';
import { ITask } from '@/models/task';

type Props = {
  task?: ITask;
  assignee?: IEmployee;
};

export const TaskPreview: FC<Props> = ({ task, assignee }) => {
  return (
    <>
      <p className="text-md">
        <b>Status: </b>
        {task?.status}
      </p>
      {task?.description && (
        <p className="text-md">
          <b>Description: </b>
          {task.description}
        </p>
      )}
      {task?.hoursEstimation && (
        <p className="text-md">
          <b>Estimation: </b>
          {task.hoursEstimation}h
        </p>
      )}
      {assignee && (
        <p className="text-md">
          <b>Assignee: </b>
          {assignee.name} {assignee.surname}
        </p>
      )}
    </>
  );
};
