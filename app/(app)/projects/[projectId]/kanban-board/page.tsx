'use client';
import { FC, useState } from 'react';

import { Select, SelectItem } from '@nextui-org/react';

import { TaskItem } from '@/components/ui';
import { TASK_STATUS } from '@/constants/task-status';
import { getClientLocale, getDictionary } from '@/dictionaries';
import { ITask } from '@/models/task';
import useFeatureStore from '@/services/feature';
import { ProjectWithEmployees } from '@/services/project/types';

import { KanbanBoard } from './components';

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectKanbanBoardPage: FC<Props> = ({ params }) => {
  const d = getDictionary(getClientLocale());
  const features = useFeatureStore((state) => state.features);
  const [featureId, setFeatureId] = useState('');
  const [defaultStatus, setDefaultStatus] = useState<TASK_STATUS | undefined>();
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();

  const openTaskDetails = (defaultStatus?: TASK_STATUS, task?: ITask) => {
    setDefaultStatus(defaultStatus);
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setDefaultStatus(undefined);
    setSelectedTask(undefined);
  };

  return (
    <main className="flex w-full min-h-[calc(100vh-184px)] h-full">
      <div className="flex flex-col min-h-full overflow-x-auto">
        <div className="w-full p-3 border-b-1 h-fit">
          <Select
            label={d.labels.feature}
            selectedKeys={featureId ? [featureId] : []}
            onChange={(e) => setFeatureId(e.target.value)}
            variant="bordered"
            size="sm"
            className="max-w-xs">
            {features.map(({ id, title }) => (
              <SelectItem key={id} value={id} color="secondary" textValue={title}>
                {title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <KanbanBoard featureId={featureId} openTaskDetails={openTaskDetails} project={params.project} />
      </div>

      {(defaultStatus || selectedTask) && (
        <TaskItem
          task={selectedTask}
          defaultStatus={defaultStatus}
          closeTaskDetails={closeTaskDetails}
          project={params.project}
          featureId={featureId}
          setSelectedTask={setSelectedTask}
        />
      )}
    </main>
  );
};

export default ProjectKanbanBoardPage;
