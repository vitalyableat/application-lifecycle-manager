'use client';
import { FC, useEffect } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { object, ObjectSchema, string } from 'yup';

import { NumberInput } from '@/components/ui';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { getClientLocale, getDictionary } from '@/dictionaries';
import { ITimeRecord } from '@/models/time-record';
import useAuthStore from '@/services/auth';
import { ProjectWithEmployees } from '@/services/project/types';
import useTimeRecordStore from '@/services/time-record';
import { CreateTimeRecordData } from '@/services/time-record/types';
import { dateToIsoString } from '@/utils/date-to-iso-string';

type Props = {
  taskId: string;
  featureId: string;
  project: ProjectWithEmployees;
  timeRecord?: ITimeRecord;
  closeForm: () => void;
};

export const TimeRecordForm: FC<Props> = ({ taskId, featureId, project, timeRecord, closeForm }) => {
  const d = getDictionary(getClientLocale());
  const user = useAuthStore((state) => state.user);
  const [addTimeRecord, updateTimeRecord, deleteTimeRecord] = useTimeRecordStore((state) => [
    state.addTimeRecord,
    state.updateTimeRecord,
    state.deleteTimeRecord,
  ]);
  const TimeRecordValidationSchema: ObjectSchema<CreateTimeRecordData> = object({
    taskId: string().required(d.forms.required),
    featureId: string().required(d.forms.required),
    projectId: string().required(d.forms.required),
    employeeId: string().required(d.forms.required),
    hoursSpent: string().required(d.forms.required),
    date: string().required(d.forms.required),
    time: string().required(d.forms.required),
  });
  const { handleSubmit, values, errors, handleChange, dirty, resetForm } = useFormik<CreateTimeRecordData>({
    initialValues: {
      taskId: timeRecord?.taskId || taskId,
      featureId: timeRecord?.featureId || featureId,
      projectId: timeRecord?.projectId || project.id,
      employeeId: timeRecord?.employeeId || user?.id || '',
      hoursSpent: timeRecord?.hoursSpent || '',
      date: timeRecord?.date || dateToIsoString(new Date()),
      time: timeRecord?.time || '',
    },
    validationSchema: TimeRecordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        timeRecord ? await updateTimeRecord({ ...values, id: timeRecord.id }) : await addTimeRecord(values);
        closeForm();
      } finally {
        resetForm();
      }
    },
    validateOnChange: false,
  });

  useEffect(() => {
    timeRecord &&
      resetForm({
        values: {
          taskId: timeRecord.taskId,
          featureId: timeRecord.featureId,
          projectId: timeRecord.projectId,
          employeeId: timeRecord.employeeId,
          hoursSpent: timeRecord.hoursSpent,
          date: timeRecord.date,
          time: timeRecord.time,
        },
      });
  }, [timeRecord]);

  const onTimeRecordDelete = async () => {
    if (timeRecord) {
      await deleteTimeRecord(timeRecord.id);
      closeForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <NumberInput
        label={d.labels.spentTime}
        name="hoursSpent"
        onChange={handleChange}
        value={values.hoursSpent}
        errorMessage={errors.hoursSpent}
        isInvalid={!!errors.hoursSpent}
        disabled={user?.role === EMPLOYEE_ROLE.PROJECT_MANAGER}
      />
      <Input
        classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
        type="date"
        label={d.labels.date}
        name="date"
        onChange={handleChange}
        value={values.date}
        errorMessage={errors.date}
        isInvalid={!!errors.date}
        variant="bordered"
        max={dateToIsoString(new Date())}
        min={dateToIsoString(new Date(project.startDate))}
        disabled={user?.role === EMPLOYEE_ROLE.PROJECT_MANAGER}
      />
      <Input
        classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
        type="time"
        label={d.labels.time}
        name="time"
        onChange={handleChange}
        value={values.time}
        errorMessage={errors.time}
        isInvalid={!!errors.time}
        variant="bordered"
        disabled={user?.role === EMPLOYEE_ROLE.PROJECT_MANAGER}
      />

      <div className={`flex w-full ${timeRecord ? 'justify-end' : 'justify-center'} gap-5`}>
        <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
          {d.save}
        </Button>
        {timeRecord && (
          <Button type="button" color="danger" className="font-bold" onClick={onTimeRecordDelete}>
            {d.delete}
          </Button>
        )}
      </div>
    </form>
  );
};
