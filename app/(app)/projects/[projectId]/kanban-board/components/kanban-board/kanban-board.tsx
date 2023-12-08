import { FC, useMemo } from 'react';

import { CloseIcon } from '@nextui-org/shared-icons';

import { TASK_STATUS } from '@/constants/task-status';
import { ITask } from '@/models/task';
import { ProjectWithEmployees } from '@/services/project/types';
import useTaskStore from '@/services/task';

import { TaskCard } from '../task-card';

type Props = {
  featureId: string;
  openTaskDetails: (defaultStatus?: TASK_STATUS, task?: ITask) => void;
  project: ProjectWithEmployees;
};

export const KanbanBoard: FC<Props> = ({ featureId, openTaskDetails, project }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const filteredTasks = useMemo(
    () =>
      (featureId ? tasks.filter((task) => task.featureId === featureId) : tasks).reduce(
        (res, task) => ({ ...res, [task.status]: [...res[task.status], task] }),
        {
          [TASK_STATUS.TO_DO]: [],
          [TASK_STATUS.ON_HOLD]: [],
          [TASK_STATUS.DEVELOPMENT]: [],
          [TASK_STATUS.CODE_REVIEW]: [],
          [TASK_STATUS.TESTING]: [],
          [TASK_STATUS.DONE]: [],
        } as { [key in TASK_STATUS]: ITask[] },
      ),
    [tasks, featureId],
  );

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      <div className="flex sticky top-0">
        {Object.keys(filteredTasks).map((status) => (
          <div
            key={status}
            className="h-12 w-1/6 min-w-[240px] border-1 font-bold text-medium py-3 px-2
                     text-center border-b-1 bg-white relative">
            {status}
            {featureId && (
              <p
                className="absolute top-2 right-2 bg-secondary-200 p-1
                           rounded-md hover:bg-secondary-100 cursor-pointer"
                onClick={() => openTaskDetails(status as TASK_STATUS)}>
                <CloseIcon fontSize={24} className="rotate-45" />
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full h-fit">
        {Object.entries(filteredTasks).map(([status, tasksByStatus]) => (
          <div key={status} className="flex h-full flex-col gap-3 p-3 w-1/6 min-w-[240px] border-1">
            {tasksByStatus.map((task) => (
              <TaskCard key={task.id} task={task} openTaskDetails={openTaskDetails} project={project} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
