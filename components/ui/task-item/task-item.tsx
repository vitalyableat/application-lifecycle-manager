'use client';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';

import { TaskForm } from '@/components/forms';
import { WithRoleAccess } from '@/components/templates';
import { ActionButton } from '@/components/ui';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { TASK_STATUS } from '@/constants/task-status';
import { ITask } from '@/models/task';
import { ProjectWithEmployees } from '@/services/project/types';

import { TaskPreview, TimeRecords } from './components';

type Props = {
  task?: ITask;
  defaultStatus?: TASK_STATUS;
  closeTaskDetails: () => void;
  project: ProjectWithEmployees;
  featureId: string;
  setSelectedTask: Dispatch<SetStateAction<ITask | undefined>>;
};

export const TaskItem: FC<Props> = ({ task, defaultStatus, project, closeTaskDetails, featureId, setSelectedTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(!task);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  const assignee = useMemo(() => project.employees.find(({ id }) => id === task?.employeeId), [task, project]);

  return (
    <div className="h-full w-1/3 min-w-[320px] max-w-[560px] border-l-1 flex flex-col">
      <div className="border-b-1 p-6 relative">
        <p className="font-bold h-6 max-w-[calc(100%-88px)] txt-overflow">{task?.title}</p>
        <ActionButton icon="back" onClick={task && isFormOpen ? closeForm : closeTaskDetails} />
        {!isFormOpen && (
          <WithRoleAccess rolesWithAccess={[EMPLOYEE_ROLE.PROJECT_MANAGER, EMPLOYEE_ROLE.DEVELOPER]}>
            <ActionButton icon="edit" onClick={openForm} className="right-16" />
          </WithRoleAccess>
        )}
      </div>
      <div className="h-full w-full p-6 overflow-y-auto">
        {task && !isFormOpen ? (
          <>
            <TaskPreview task={task} assignee={assignee} />
            <TimeRecords task={task} project={project} featureId={featureId} />
          </>
        ) : (
          <TaskForm
            task={task}
            defaultStatus={defaultStatus}
            closeForm={closeForm}
            project={project}
            featureId={featureId}
            setSelectedTask={setSelectedTask}
            closeTaskDetails={closeTaskDetails}
          />
        )}
      </div>
    </div>
  );
};
