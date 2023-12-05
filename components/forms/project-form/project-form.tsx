'use client';
import { FC } from 'react';

import { Textarea } from '@nextui-org/input';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { array, object, ObjectSchema, string } from 'yup';

import { APP_ROUTE } from '@/constants/app-route';
import { PROJECT_STATUS } from '@/constants/project-status';
import { IProject } from '@/models/project';
import useProjectStore from '@/services/project';
import { CreateProjectData } from '@/services/project/types';

import { EmployeeSelect } from './components';

const ProjectValidationSchema: ObjectSchema<CreateProjectData> = object({
  name: string().required(),
  description: string(),
  status: string().oneOf(Object.values(PROJECT_STATUS)).required(),
  employeeIds: array().of(string().required()).required(),
});

type Props = {
  project?: IProject;
};

export const ProjectForm: FC<Props> = ({ project }) => {
  const router = useRouter();
  const [addProject, updateProject, deleteProject] = useProjectStore((state) => [
    state.addProject,
    state.updateProject,
    state.deleteProject,
  ]);
  const { handleSubmit, values, errors, handleChange, dirty, setFieldValue } = useFormik<CreateProjectData>({
    initialValues: {
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || PROJECT_STATUS.ACTIVE,
      employeeIds: project?.employeeIds || [],
    },
    validationSchema: ProjectValidationSchema,
    onSubmit: async (values, { setFieldValue }) => {
      try {
        const { id } = project
          ? await updateProject({ ...values, id: project.id, startDate: project.startDate })
          : await addProject(values);

        router.push(APP_ROUTE.PROJECT_DETAILS.replace(':projectId', id));
        router.refresh();
      } catch (e) {
        (e as Error).message.includes('name') && setFieldValue('name', '');
      }
    },
    validateOnChange: false,
  });

  const onProjectDelete = async () => {
    if (project) {
      await deleteProject(project.id);

      router.push(APP_ROUTE.PROJECTS);
      router.refresh();
    }
  };
  const setEmployeeIds = (employeeIds: string[]) => setFieldValue('employeeIds', employeeIds);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <p className="text-xl font-bold">Project Details</p>
      <div className="flex flex-col w-full items-center gap-5">
        <Input
          label="Name"
          name="name"
          onChange={handleChange}
          value={values.name}
          errorMessage={errors.name}
          isInvalid={!!errors.name}
          variant="bordered"
          className="max-w-xs"
        />
        <Textarea
          label="Description"
          name="description"
          onChange={handleChange}
          value={values.description}
          errorMessage={errors.description}
          isInvalid={!!errors.description}
          variant="bordered"
          className="max-w-xs"
          maxRows={3}
        />
        <Select
          label="Status"
          name="status"
          defaultSelectedKeys={[values.status]}
          onChange={handleChange}
          value={values.status}
          errorMessage={errors.status}
          variant="bordered"
          className="max-w-xs">
          {Object.values(PROJECT_STATUS).map((status) => (
            <SelectItem key={status} value={status} color="secondary">
              {status}
            </SelectItem>
          ))}
        </Select>
      </div>
      <EmployeeSelect employeeIds={values.employeeIds} setEmployeeIds={setEmployeeIds} project={project} />

      <div className={`flex w-full ${project ? 'justify-end' : 'justify-center'} gap-5`}>
        <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
          Save
        </Button>
        {project && (
          <Button type="button" color="danger" className="font-bold" onClick={onProjectDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};
