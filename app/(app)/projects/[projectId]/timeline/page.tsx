'use client';
import { FC, useState } from 'react';

import { Timeline } from '@/app/(app)/projects/[projectId]/timeline/components';
import { TaskItem } from '@/components/ui';
import { ITask } from '@/models/task';
import { ProjectWithEmployees } from '@/services/project/types';

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectTimelinePage: FC<Props> = ({ params }) => {
  const [featureId, setFeatureId] = useState('');
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();

  const openTaskDetails = (featureId: string, task?: ITask) => {
    setFeatureId(featureId);
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setFeatureId('');
    setSelectedTask(undefined);
  };

  return (
    <main className="flex w-full overflow-y-auto min-h-[calc(100vh-184px)]">
      <Timeline
        projectStartDate={params.project.startDate}
        selectedTask={selectedTask}
        openTaskDetails={openTaskDetails}
      />
      {(featureId || selectedTask) && (
        <TaskItem
          task={selectedTask}
          closeTaskDetails={closeTaskDetails}
          project={params.project}
          featureId={featureId}
          setSelectedTask={setSelectedTask}
        />
      )}
    </main>
  );
};

export default ProjectTimelinePage;
