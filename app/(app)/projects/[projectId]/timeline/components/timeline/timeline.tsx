'use client';
import { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState('');
  const features = useFeatureStore((state) => state.features);
  const tasks = useTaskStore((state) => state.tasks);
  const timeRecords = useTimeRecordStore((state) => state.timeRecords);
  const dateArray = getDateArray(new Date(projectStartDate));
  const projectStartTime = new Date(projectStartDate).setHours(0, 0, 0, 0);
  const currentTimeLineLeft = ((new Date().getTime() - projectStartTime) * 180) / 86400000;

  useLayoutEffect(() => {
    timelineRef.current?.scroll({ left: dateArray.length * 180 });
  }, []);

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
  const tracks: { left: number; width: number; height: number; top: number }[] = useMemo(
    () =>
      data
        .reduce(
          (res, f) => {
            const featureTaskTracks = f.tasks.map(({ timeRecords }) =>
              timeRecords.reduce(
                (res, c) => {
                  const date = new Date(c.date + 'T' + c.time);
                  const start = (date.getTime() - projectStartTime) / 1000;
                  const end =
                    (new Date(date.getTime() + +c.hoursSpent * 3600 * 1000).getTime() - projectStartTime) / 1000;

                  if (res.start === -1 || res.start > start) {
                    res.start = start;
                  }
                  if (res.end === -1 || res.end < end) {
                    res.end = end;
                  }

                  return res;
                },
                { start: -1, end: -1, height: 36 },
              ),
            );
            const featureTrack = featureTaskTracks.reduce(
              (res, c) => ({
                start: res.start === -1 || res.start > c.start ? c.start : res.start,
                end: res.end === -1 || res.end < c.end ? c.end : res.end,
                height: 48,
              }),
              { start: -1, end: -1, height: 48 },
            );

            return f.id === selectedFeatureId
              ? [...res, featureTrack, { start: -1, end: -1, height: 36 }, ...featureTaskTracks]
              : [...res, featureTrack];
          },
          [] as { start: number; end: number; height: number }[],
        )
        .reduce(
          (res, { start, end, height }) => [
            ...res,
            {
              left: start === -1 ? 0 : (start * 180) / 86400,
              width: start === -1 ? 0 : ((end - start) * 180) / 86400,
              height,
              top: (res[res.length - 1]?.top || 48) + (res[res.length - 1]?.height || 0),
            },
          ],
          [] as { left: number; width: number; height: number; top: number }[],
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
              onPress={() => setSelectedFeatureId((c) => (c === feature.id ? '' : feature.id))}>
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
      <div ref={timelineRef} className="h-fit min-h-full flex w-full overflow-x-auto relative">
        {dateArray.map((date) => (
          <div key={date} className="h-fit min-w-[180px] border-r-1">
            <p className="font-bold text-medium py-3 px-2 text-center border-b-1">{date}</p>
            {tracks.map(({ height }, index) => (
              <div key={index} className="border-b-1" style={{ height }} />
            ))}
          </div>
        ))}
        {tracks.map(({ left, width, height, top }, index) => (
          <div
            key={index}
            className={`absolute rounded-md ${width && 'border-2 border-secondary-200'} bg-secondary-100`}
            style={{ left, width, height, top }}
          />
        ))}
        <div
          className="h-[calc(100%-48px)] border-1 border-secondary-500 absolute top-12"
          style={{ left: currentTimeLineLeft }}
        />
      </div>
    </div>
  );
};
