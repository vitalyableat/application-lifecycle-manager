'use client';
import { FC, useMemo, useState } from 'react';

import { TimeRecordForm } from '@/components/forms';
import { WithRoleAccess } from '@/components/templates';
import { ActionButton } from '@/components/ui';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { ITask } from '@/models/task';
import { ITimeRecord } from '@/models/time-record';
import useAuthStore from '@/services/auth';
import { ProjectWithEmployees } from '@/services/project/types';
import useTimeRecordStore from '@/services/time-record';
import { dateToString } from '@/utils/date-to-string';

import { TimeRecordsLine } from '../time-records-line';

type Props = {
  task: ITask;
  project: ProjectWithEmployees;
  featureId: string;
};

export const TimeRecords: FC<Props> = ({ task, project, featureId }) => {
  const user = useAuthStore((state) => state.user);
  const timeRecords = useTimeRecordStore((state) => state.timeRecords);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedTimeRecord, setSelectedTimeRecord] = useState<ITimeRecord | undefined>();
  const openForm = () => setFormOpen(true);

  const closeForm = () => {
    setFormOpen(false);
    setSelectedTimeRecord(undefined);
  };
  const taskTimeRecords = useMemo(
    () => timeRecords.filter((timeRecord) => timeRecord.taskId === task.id),
    [timeRecords, task],
  );

  const getEmployeeFullName = (employeeId: string) => {
    const employee = project.employees.find((employee) => employee.id === employeeId);

    return employee?.name + ' ' + employee?.surname;
  };

  return (
    <>
      <div className="py-6 relative">
        <p className="font-bold text-center">Time Records</p>
        <WithRoleAccess rolesWithAccess={[EMPLOYEE_ROLE.DEVELOPER]}>
          {isFormOpen || selectedTimeRecord ? (
            <ActionButton icon="back" onClick={closeForm} className="-right-2" />
          ) : (
            <ActionButton icon="create" onClick={openForm} className="-right-2" />
          )}
        </WithRoleAccess>
      </div>
      {isFormOpen || selectedTimeRecord ? (
        <TimeRecordForm
          taskId={task.id}
          timeRecord={selectedTimeRecord}
          featureId={featureId}
          project={project}
          closeForm={closeForm}
        />
      ) : (
        <>
          <TimeRecordsLine taskTimeRecords={taskTimeRecords} estimation={Number(task.hoursEstimation)} />
          <div className="flex flex-col mt-5">
            {taskTimeRecords.map((timeRecord) => (
              <div key={timeRecord.id} className="flex flex-col border p-2 relative">
                {user?.id === timeRecord.employeeId && (
                  <ActionButton
                    icon="edit"
                    onClick={() => setSelectedTimeRecord(timeRecord)}
                    className="top-2 right-2"
                  />
                )}
                <span className="text-sm">
                  {dateToString(timeRecord.date)} {timeRecord.time}
                </span>
                <div className={`txt-overflow w-[${user?.id === timeRecord.employeeId ? 'calc(100%-48px)' : '100%'}]`}>
                  <b>{timeRecord.hoursSpent}h</b> {getEmployeeFullName(timeRecord.employeeId)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
