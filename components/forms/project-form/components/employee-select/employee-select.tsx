import { FC, useEffect, useMemo } from 'react';

import { Loader, Search } from '@/components/ui';
import { IEmployee } from '@/models/employee';
import { IProject } from '@/models/project';
import useEmployeeStore from '@/services/employee';

import { EmployeeList } from '../employee-list';

type Props = {
  employeeIds: string[];
  setEmployeeIds: (employeeIds: string[]) => void;
  project?: IProject;
};

export const EmployeeSelect: FC<Props> = ({ employeeIds, setEmployeeIds, project }) => {
  const [employees, getEmployees, isLoading] = useEmployeeStore((state) => [
    state.employees,
    state.getEmployees,
    state.isLoading,
  ]);

  useEffect(() => {
    getEmployees();
  }, []);

  const { selectedEmployees, restEmployees } = useMemo(
    () =>
      employees
        .filter(({ free, id }) => free || project?.employeeIds.includes(id))
        .reduce(
          (res, employee) =>
            employeeIds.includes(employee.id)
              ? { ...res, selectedEmployees: [...res.selectedEmployees, employee] }
              : { ...res, restEmployees: [...res.restEmployees, employee] },
          { selectedEmployees: [], restEmployees: [] } as { [key: string]: IEmployee[] },
        ),
    [employees, employeeIds],
  );
  const selectEmployee = (employeeId: string) => setEmployeeIds([...employeeIds, employeeId]);
  const removeEmployee = (employeeId: string) => setEmployeeIds(employeeIds.filter((id) => id !== employeeId));

  return (
    <div className="flex flex-col w-full gap-5">
      {isLoading && <Loader />}
      <p className="w-full text-center text-md font-bold">Chose a team</p>
      <div className="flex w-full justify-center gap-5 min-w-max">
        <div className="flex flex-col gap-5 items-start w-1/2 max-w-xs">
          <p className="flex items-end justify-center w-full font-bold h-10">Selected employees</p>
          <EmployeeList employees={selectedEmployees} onIconClick={removeEmployee} />
        </div>
        <div className="flex flex-col gap-5 items-start w-1/2 max-w-xs">
          <Search />
          <EmployeeList employees={restEmployees} rotateIcon onIconClick={selectEmployee} />
        </div>
      </div>
    </div>
  );
};
