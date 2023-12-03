'use client';
import { FC, Fragment, useMemo, useState } from 'react';

import { TaskItem } from '@/components/ui';
import { ITask } from '@/models/task';
import useFeatureStore from '@/services/feature';
import { ProjectWithEmployees } from '@/services/project/types';
import useTaskStore from '@/services/task';
import useTimeRecordStore from '@/services/time-record';

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectTimelinePage: FC<Props> = ({ params }) => {
  const [featureId, setFeatureId] = useState('');
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();
  const features = useFeatureStore((state) => state.features);
  const tasks = useTaskStore((state) => state.tasks);
  const timeRecords = useTimeRecordStore((state) => state.timeRecords);
  const data = useMemo(
    () =>
      features.map((feature) => ({
        ...feature,
        tasks: tasks
          .filter(({ featureId }) => featureId === feature.id)
          .map((task) => ({ ...task, timeRecords: timeRecords.filter(({ taskId }) => taskId === task.id) })),
      })),
    [features, tasks, timeRecords],
  );

  const openTaskDetails = (featureId: string, task?: ITask) => {
    setFeatureId(featureId);
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setFeatureId('');
    setSelectedTask(undefined);
  };

  return (
    <main className="flex w-full h-full">
      <div className="flex flex-col p-6 gap-5 w-full overflow-y-auto">
        <div className="flex flex-col pl-2">
          {timeRecords.map((timeRecord) => (
            <div key={timeRecord.id}>
              {timeRecord.date} {timeRecord.time} {timeRecord.hoursSpent}
            </div>
          ))}
        </div>

        {data.map((feature) => (
          <div key={feature.id} className="flex flex-col">
            <p className="font-bold text-xl cursor-pointer hover:underline" onClick={() => openTaskDetails(feature.id)}>
              {feature.title}
            </p>
            {!!feature.tasks.length && (
              <div key={feature.id} className="flex flex-col pl-3">
                {feature.tasks.map((task) => (
                  <div key={task.id} className="flex flex-col">
                    <p
                      className="font-bold text-lg cursor-pointer hover:underline"
                      onClick={() => openTaskDetails(feature.id, task)}>
                      {task.title}
                    </p>
                    {!!task.timeRecords.length && (
                      <div className="flex flex-col pl-2">
                        {task.timeRecords.map((timeRecord) => (
                          <div key={timeRecord.id}>
                            {timeRecord.date} {timeRecord.time} {timeRecord.hoursSpent}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
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
