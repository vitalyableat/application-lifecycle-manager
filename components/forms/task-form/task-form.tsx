'use client';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { Textarea } from '@nextui-org/input';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useFormik } from 'formik';
import { object, ObjectSchema, string } from 'yup';

import { NumberInput } from '@/components/ui';
import { TASK_STATUS } from '@/constants/task-status';
import { ITask } from '@/models/task';
import { ProjectWithEmployees } from '@/services/project/types';
import useTaskStore from '@/services/task';
import { CreateTaskData } from '@/services/task/types';

const TaskValidationSchema: ObjectSchema<CreateTaskData> = object({
  featureId: string().required(),
  projectId: string().required(),
  employeeId: string(),
  title: string().required(),
  description: string(),
  status: string().oneOf(Object.values(TASK_STATUS)).required(),
  hoursEstimation: string(),
});

type Props = {
  task?: ITask;
  defaultStatus?: TASK_STATUS;
  closeForm: () => void;
  project: ProjectWithEmployees;
  featureId: string;
  setSelectedTask: Dispatch<SetStateAction<ITask | undefined>>;
  closeTaskDetails: () => void;
};

export const TaskForm: FC<Props> = ({
  task,
  defaultStatus,
  closeForm,
  project,
  featureId,
  setSelectedTask,
  closeTaskDetails,
}) => {
  const [addTask, updateTask, deleteTask] = useTaskStore((state) => [
    state.addTask,
    state.updateTask,
    state.deleteTask,
  ]);
  const { handleSubmit, values, errors, handleChange, dirty, resetForm } = useFormik<CreateTaskData>({
    initialValues: {
      featureId: task?.featureId || featureId,
      projectId: project.id,
      employeeId: task?.employeeId || '',
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || defaultStatus || TASK_STATUS.TO_DO,
      hoursEstimation: task?.hoursEstimation || '',
    },
    validationSchema: TaskValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = task ? await updateTask({ ...values, id: task.id }) : await addTask(values);

        setSelectedTask(data);
        closeForm();
      } catch (e) {
        console.log(e);
      } finally {
        resetForm();
      }
    },
    validateOnChange: false,
  });

  useEffect(() => {
    resetForm({
      values: {
        featureId: task?.featureId || featureId,
        projectId: project.id,
        employeeId: task?.employeeId || '',
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || defaultStatus || TASK_STATUS.TO_DO,
        hoursEstimation: task?.hoursEstimation || '',
      },
    });
  }, [task, defaultStatus, featureId]);

  const onTaskDelete = async () => {
    if (task) {
      await deleteTask(task.id);
      setSelectedTask(undefined);
      closeTaskDetails();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <p className="text-xl font-bold text-center">Task Details</p>
      <Input
        label="Title"
        name="title"
        onChange={handleChange}
        value={values.title}
        errorMessage={errors.title}
        isInvalid={!!errors.title}
        variant="bordered"
      />
      <Textarea
        label="Description"
        name="description"
        onChange={handleChange}
        value={values.description}
        errorMessage={errors.description}
        isInvalid={!!errors.description}
        variant="bordered"
        maxRows={3}
      />
      <NumberInput
        label="Estimation (hours)"
        name="hoursEstimation"
        onChange={handleChange}
        value={values.hoursEstimation}
        errorMessage={errors.hoursEstimation}
        isInvalid={!!errors.hoursEstimation}
      />
      <Select
        label="Status"
        name="status"
        selectedKeys={[values.status]}
        onChange={handleChange}
        errorMessage={errors.status}
        variant="bordered">
        {Object.values(TASK_STATUS).map((status) => (
          <SelectItem key={status} value={status} color="secondary">
            {status}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Employee"
        name="employeeId"
        defaultSelectedKeys={values?.employeeId && [values.employeeId]}
        onChange={handleChange}
        errorMessage={errors.employeeId}
        variant="bordered">
        {project.employees.map(({ id, name, surname, position, level }) => (
          <SelectItem
            key={id}
            value={id}
            color="secondary"
            textValue={`${name} ${surname} (${level}${position && ` ${position}`})`}>
            {name} {surname} ({level}
            {position && ` ${position}`})
          </SelectItem>
        ))}
      </Select>

      <div className={`flex w-full ${task ? 'justify-end' : 'justify-center'} gap-5`}>
        <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
          Save
        </Button>
        {task && (
          <Button type="button" color="danger" className="font-bold" onClick={onTaskDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};
