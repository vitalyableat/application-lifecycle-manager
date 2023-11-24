import { FC, PropsWithChildren } from 'react';

import { EmployeeHeader } from './components/employee-header';
import { EmployeeTabs } from './components/employee-tabs';

const EmployeesLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <EmployeeTabs />
      <div className="flex-col w-full">
        <EmployeeHeader />
        <div className="relative bg-white min-w-full h-full max-h-[calc(100vh-184px)] overflow-auto p-6 flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EmployeesLayout;
