import { FC } from 'react';

import { getClientLocale, getDictionary, getServerLocale } from '@/dictionaries';
import { IEmployee } from '@/models/employee';
import { ITask } from '@/models/task';

type Props = {
  task?: ITask;
  assignee?: IEmployee;
};

export const TaskPreview: FC<Props> = ({ task, assignee }) => {
  const d = getDictionary(getClientLocale());

  return (
    <>
      <p className="text-md">
        <b>{d.pages.projects.status}</b>
        {task?.status}
      </p>
      {task?.description && (
        <p className="text-md whitespace-pre-wrap">
          <b>{d.pages.projects.description}</b>
          {task.description}
        </p>
      )}
      {task?.hoursEstimation && (
        <p className="text-md">
          <b>{d.pages.projects.estimation}</b>
          {task.hoursEstimation}h
        </p>
      )}
      {assignee && (
        <p className="text-md">
          <b>{d.pages.projects.assignee}</b>
          {assignee.name} {assignee.surname}
        </p>
      )}
    </>
  );
};
