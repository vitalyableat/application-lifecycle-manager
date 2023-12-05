'use client';
import { FC, useMemo, useState } from 'react';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { CloseIcon } from '@nextui-org/shared-icons';

import { WithRoleAccess } from '@/components/templates';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { ITask } from '@/models/task';
import useFeatureStore from '@/services/feature';
import useTaskStore from '@/services/task';
import useTimeRecordStore from '@/services/time-record';
import { getDateArray } from '@/utils/get-date-array';

import { AccordionItemClasses } from './styles';

type Props = {
  projectStartDate: Date;
  selectedTask?: ITask;
  openTaskDetails: (featureId: string, task?: ITask) => void;
};

export const Timeline: FC<Props> = ({ projectStartDate, selectedTask, openTaskDetails }) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState('');
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
  // const dateArray = getDateArray(new Date(projectStartDate));
  const dateArray = ['2023-11-29', '2023-11-30', '2023-12-01', '2023-12-02', '2023-12-03', '2023-12-04'];
  const lines: { height: string }[] = useMemo(
    () =>
      data.reduce(
        (res, f) =>
          f.id === selectedFeatureId
            ? [...res, { height: 'h-12' }, { height: 'h-9' }, ...f.tasks.map(() => ({ height: 'h-9' }))]
            : [...res, { height: 'h-12' }],
        [] as { height: string }[],
      ),
    [data, selectedFeatureId],
  );

  return (
    <div className="flex w-full overflow-y-auto">
      <div className="h-fit min-h-full w-1/4 min-w-[240px] border-r-1">
        <p className="font-bold text-medium py-3 px-2 border-b-1">Features</p>
        <Accordion itemClasses={AccordionItemClasses} showDivider={false} className="px-0 flex flex-col w-full">
          {data.map((feature) => (
            <AccordionItem
              key={feature.id}
              textValue={feature.title}
              title={<p className="txt-overflow">{feature.title}</p>}
              onClick={() => setSelectedFeatureId((c) => (c === feature.id ? '' : feature.id))}>
              <div className="flex flex-col">
                <WithRoleAccess rolesWithAccess={[EMPLOYEE_ROLE.DEVELOPER, EMPLOYEE_ROLE.PROJECT_MANAGER]}>
                  <div
                    className="flex hover:bg-secondary-100 py-2 pl-4 pr-2 cursor-pointer justify-end"
                    onClick={() => openTaskDetails(feature.id)}>
                    <CloseIcon fontSize={20} className="rotate-45" />
                  </div>
                </WithRoleAccess>
                {feature.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`${
                      selectedTask?.id === task.id && 'bg-secondary-200'
                    } hover:bg-secondary-100 p-2 txt-overflow cursor-pointer`}
                    onClick={() => openTaskDetails(feature.id, task)}>
                    {task.title}
                  </div>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="h-fit min-h-full flex w-full overflow-x-auto">
        {dateArray.map((date) => (
          <div key={date} className="h-fit min-w-[180px] border-r-1">
            <p className="font-bold text-medium py-3 px-2 text-center border-b-1">{date}</p>
            {lines.map((line, index) => (
              <div key={index} className={`${line.height} border-b-1`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
