'use client';
import { FC, useEffect } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { object, ObjectSchema, string } from 'yup';

import { NumberInput } from '@/components/ui';
import { ITimeRecord } from '@/models/time-record';
import useAuthStore from '@/services/auth';
import useTimeRecordStore from '@/services/time-record';
import { CreateTimeRecordData } from '@/services/time-record/types';

const TimeRecordValidationSchema: ObjectSchema<CreateTimeRecordData> = object({
  taskId: string().required(),
  featureId: string().required(),
  projectId: string().required(),
  employeeId: string().required(),
  hoursSpent: string().required(),
  date: string().required(),
  time: string().required(),
});

type Props = {
  taskId: string;
  featureId: string;
  projectId: string;
  timeRecord?: ITimeRecord;
  closeForm: () => void;
};

export const TimeRecordForm: FC<Props> = ({ taskId, featureId, projectId, timeRecord, closeForm }) => {
  const user = useAuthStore((state) => state.user);
  const [addTimeRecord, updateTimeRecord, deleteTimeRecord] = useTimeRecordStore((state) => [
    state.addTimeRecord,
    state.updateTimeRecord,
    state.deleteTimeRecord,
  ]);
  const { handleSubmit, values, errors, handleChange, dirty, resetForm } = useFormik<CreateTimeRecordData>({
    initialValues: {
      taskId: timeRecord?.taskId || taskId,
      featureId: timeRecord?.featureId || featureId,
      projectId: timeRecord?.projectId || projectId,
      employeeId: timeRecord?.employeeId || user?.id || '',
      hoursSpent: timeRecord?.hoursSpent || '',
      date: timeRecord?.date || new Date().toISOString().split('T')[0],
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
        label="Spent Time (hours)"
        name="hoursSpent"
        onChange={handleChange}
        value={values.hoursSpent}
        errorMessage={errors.hoursSpent}
        isInvalid={!!errors.hoursSpent}
      />
      <Input
        classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
        type="date"
        label="Date"
        name="date"
        onChange={handleChange}
        value={values.date}
        errorMessage={errors.date}
        isInvalid={!!errors.date}
        variant="bordered"
        max={new Date().toISOString().split('T')[0]}
      />
      <Input
        classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
        type="time"
        label="Start Time"
        name="time"
        onChange={handleChange}
        value={values.time}
        errorMessage={errors.time}
        isInvalid={!!errors.time}
        variant="bordered"
      />

      <div className={`flex w-full ${timeRecord ? 'justify-end' : 'justify-center'} gap-5`}>
        <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
          Save
        </Button>
        {timeRecord && (
          <Button type="button" color="danger" className="font-bold" onClick={onTimeRecordDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};