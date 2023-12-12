'use client';
import { ChangeEvent, FC, ReactNode, useState } from 'react';

import { Input, Select, SelectItem } from '@nextui-org/react';

import { ProjectWithEmployees } from '@/services/project/types';
import { dateToIsoString } from '@/utils/date-to-iso-string';

import { EmployeeTimeReport, TaskRatioReport, TaskTimeReport } from './components';

enum REPORT_TYPE {
  TASK_RATIO = 'Task Ratio Report',
  EMPLOYEE_TIME = 'Employee Time Report',
  TASK_TIME = 'Task Time Report',
}

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectReportPage: FC<Props> = ({ params: { project } }) => {
  const [reportType, setReportType] = useState<REPORT_TYPE>(REPORT_TYPE.TASK_RATIO);
  const [startDate, setStartDate] = useState(dateToIsoString(new Date(project.startDate)));
  const [endDate, setEndDate] = useState(dateToIsoString(new Date()));
  const GRAPHS: { [key in REPORT_TYPE]: ReactNode } = {
    [REPORT_TYPE.TASK_RATIO]: <TaskRatioReport />,
    [REPORT_TYPE.EMPLOYEE_TIME]: (
      <EmployeeTimeReport startDate={startDate} endDate={endDate} employees={project.employees} />
    ),
    [REPORT_TYPE.TASK_TIME]: <TaskTimeReport startDate={startDate} endDate={endDate} employees={project.employees} />,
  };

  const onReportTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStartDate(dateToIsoString(new Date(project.startDate)));
    setEndDate(dateToIsoString(new Date()));
    setReportType(e.target.value as REPORT_TYPE);
  };

  return (
    <main className="flex flex-col w-full min-h-[calc(100vh-184px)] h-full overflow-x-auto">
      <div className="flex gap-5 w-full p-3 border-b-1 h-fit">
        <Select
          label="Report Type"
          selectedKeys={[reportType]}
          onChange={onReportTypeChange}
          variant="bordered"
          size="sm"
          className="max-w-xs">
          {Object.values(REPORT_TYPE).map((type) => (
            <SelectItem key={type} value={type} color="secondary" textValue={type}>
              {type}
            </SelectItem>
          ))}
        </Select>
        {reportType !== REPORT_TYPE.TASK_RATIO && (
          <>
            <Input
              classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
              type="date"
              label="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              variant="bordered"
              size="sm"
              max={endDate}
              min={dateToIsoString(new Date(project.startDate))}
            />
            <Input
              classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
              type="date"
              label="End Date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              variant="bordered"
              size="sm"
              max={dateToIsoString(new Date())}
              min={startDate}
            />
          </>
        )}
      </div>
      <div className="overflow-y-auto">{GRAPHS[reportType]}</div>
    </main>
  );
};

export default ProjectReportPage;
