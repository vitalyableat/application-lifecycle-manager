'use client';
import { FC, useMemo, useState } from 'react';

import { IEmployee } from '@/models/employee';
import { ITimeRecord } from '@/models/time-record';
import useTimeRecordStore from '@/services/time-record';
import { getBusinessDayCount } from '@/utils/get-business-day-count';

import { EmployeeSpentTimeDetails } from '../employee-spent-time-details';

type Props = {
  startDate: string;
  endDate: string;
  employees: IEmployee[];
};

type SpentHoursByEmployee = {
  [key: string]: {
    spentHours: number;
    employeeFullName: string;
    timeRecords: ITimeRecord[];
  };
};

export const EmployeeTimeReport: FC<Props> = ({ startDate, endDate, employees }) => {
  const timeRecords = useTimeRecordStore((state) => state.timeRecords);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const businessDayCount = getBusinessDayCount(new Date(startDate), new Date(endDate));
  const totalWorkingHours = businessDayCount * 8;
  const filteredTimeRecords = useMemo(
    () => timeRecords.filter(({ date }) => date >= startDate && date <= endDate),
    [timeRecords, startDate, endDate],
  );
  const spentHoursByEmployeesInitialValue: SpentHoursByEmployee = useMemo(
    () =>
      employees.reduce(
        (res, employee) => ({
          ...res,
          [employee.id]: {
            spentHours: 0,
            employeeFullName: employee.name + ' ' + employee.surname,
            timeRecords: [] as ITimeRecord[],
          },
        }),
        {} as SpentHoursByEmployee,
      ),
    [employees],
  );
  const spentHoursByEmployees: SpentHoursByEmployee = useMemo(
    () =>
      filteredTimeRecords.reduce(
        (res, timeRecord) => ({
          ...res,
          [timeRecord.employeeId]: {
            ...res[timeRecord.employeeId],
            spentHours: (res[timeRecord.employeeId].spentHours || 0) + Number(timeRecord.hoursSpent),
            timeRecords: [...res[timeRecord.employeeId].timeRecords, timeRecord],
          },
        }),
        spentHoursByEmployeesInitialValue,
      ),
    [filteredTimeRecords, employees],
  );

  return (
    <div className="flex flex-col p-6 gap-3">
      <p className="font-bold text-lg text-center">Employee Working Hours Report</p>
      {Object.entries(spentHoursByEmployees).map(([employeeId, { spentHours, employeeFullName, timeRecords }]) => (
        <EmployeeSpentTimeDetails
          key={employeeId}
          employeeFullName={employeeFullName}
          spentHours={spentHours}
          totalWorkingHours={totalWorkingHours}
          timeRecords={timeRecords}
          isDetailsOpen={selectedEmployeeId === employeeId}
          toggleDetails={() => setSelectedEmployeeId((id) => (id === employeeId ? '' : employeeId))}
        />
      ))}
    </div>
  );
};
