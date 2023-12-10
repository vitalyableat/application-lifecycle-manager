'use client';
import { FC, ReactNode, useState } from 'react';

import { Select, SelectItem } from '@nextui-org/react';

import { ProjectWithEmployees } from '@/services/project/types';

import { EmployeeTimeReport, TaskRatioReport, TaskTimeReport } from './components';

enum REPORT_TYPE {
  TASK_RATIO = 'Task Ratio Report',
  EMPLOYEE_TIME = 'Employee Time Report',
  TASK_TIME = 'Task Time Report',
}

const GRAPHS: { [key in REPORT_TYPE]: ReactNode } = {
  [REPORT_TYPE.TASK_RATIO]: <TaskRatioReport />,
  [REPORT_TYPE.EMPLOYEE_TIME]: <EmployeeTimeReport />,
  [REPORT_TYPE.TASK_TIME]: <TaskTimeReport />,
};

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectReportPage: FC<Props> = ({ params }) => {
  const [reportType, setReportType] = useState<REPORT_TYPE>(REPORT_TYPE.TASK_RATIO);

  return (
    <main className="flex flex-col w-full min-h-[calc(100vh-184px)] h-full overflow-x-auto">
      <div className="w-full p-3 border-b-1 h-fit">
        <Select
          label="Report Type"
          selectedKeys={[reportType]}
          onChange={(e) => setReportType(e.target.value as REPORT_TYPE)}
          variant="bordered"
          size="sm"
          className="max-w-xs">
          {Object.values(REPORT_TYPE).map((type) => (
            <SelectItem key={type} value={type} color="secondary" textValue={type}>
              {type}
            </SelectItem>
          ))}
        </Select>
      </div>
      {GRAPHS[reportType]}
    </main>
  );
};

export default ProjectReportPage;
