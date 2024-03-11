'use client';
import { ChangeEvent, FC, ReactNode, useState } from 'react';

import { Input, Select, SelectItem } from '@nextui-org/react';

import { getClientLocale, getDictionary } from '@/dictionaries';
import { ProjectWithEmployees } from '@/services/project/types';
import { dateToIsoString } from '@/utils/date-to-iso-string';

import { EmployeeTimeReport, TaskRatioReport, TaskTimeReport } from './components';

enum REPORT_TYPE {
  TASK_RATIO = 'taskRatioReport',
  EMPLOYEE_TIME = 'employeeTimeReport',
  TASK_TIME = 'taskTimeReport',
}

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectReportPage: FC<Props> = ({ params: { project } }) => {
  const d = getDictionary(getClientLocale());
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
            <SelectItem key={type} value={type} color="secondary" textValue={d.pages.projects[type]}>
              {d.pages.projects[type]}
            </SelectItem>
          ))}
        </Select>
        {reportType !== REPORT_TYPE.TASK_RATIO && (
          <>
            <Input
              classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
              type="date"
              label={d.labels.startDate}
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
              label={d.labels.endDate}
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
