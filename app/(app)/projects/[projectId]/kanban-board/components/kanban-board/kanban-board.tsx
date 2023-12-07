import { FC, useMemo } from 'react';

import { CloseIcon } from '@nextui-org/shared-icons';

import { TASK_STATUS } from '@/constants/task-status';
import { ITask } from '@/models/task';
import useTaskStore from '@/services/task';

type Props = {
  featureId: string;
  openTaskDetails: (defaultStatus?: TASK_STATUS, task?: ITask) => void;
};

export const KanbanBoard: FC<Props> = ({ featureId, openTaskDetails }) => {
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
    <div className="flex w-full h-fit max-w-full overflow-auto">
      {Object.entries(filteredTasks).map(([status, tasksByStatus]) => (
        <div key={status} className="h-full w-1/6 min-w-[240px] border-1 relative">
          <div className="font-bold text-medium py-3 px-2 text-center border-b-1 sticky top-0 bg-white">
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
          <div className="flex flex-col h-fit gap-3 p-3 ">
            {tasksByStatus.map((task) => (
              <div
                key={task.id}
                className="flex flex-col rounded-md p-3 gap-3 bg-default-100 hover:shadow cursor-pointer"
                onClick={() => openTaskDetails(undefined, task)}>
                <p className="font-bold txt-overflow">{task.title}</p>
                {task.description}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
