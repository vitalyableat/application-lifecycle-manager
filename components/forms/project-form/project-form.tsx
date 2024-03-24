'use client';
import { FC } from 'react';

import { Button, Input, Select, SelectItem, Textarea, useDisclosure } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { array, object, ObjectSchema, string } from 'yup';

import { ConfirmationModal } from '@/components/ui';
import { APP_ROUTE } from '@/constants/app-route';
import { PROJECT_LIFECYCLE_STEP } from '@/constants/project-lifecycle-step';
import { PROJECT_STATUS } from '@/constants/project-status';
import { getClientLocale, getDictionary } from '@/dictionaries';
import { IProject } from '@/models/project';
import useProjectStore from '@/services/project';
import { CreateProjectData } from '@/services/project/types';

import { EmployeeSelect } from './components';

type Props = {
  project?: IProject;
};

export const ProjectForm: FC<Props> = ({ project }) => {
  const d = getDictionary(getClientLocale());
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addProject, updateProject, deleteProject, isLoading] = useProjectStore((state) => [
    state.addProject,
    state.updateProject,
    state.deleteProject,
    state.isLoading,
  ]);
  const ProjectValidationSchema: ObjectSchema<CreateProjectData> = object({
    name: string().required(d.forms.required),
    description: string(),
    status: string().oneOf(Object.values(PROJECT_STATUS)).required(d.forms.required),
    lifecycleStep: string().oneOf(Object.values(PROJECT_LIFECYCLE_STEP)).required(d.forms.required),
    employeeIds: array().of(string().required()).required(d.forms.required),
  });
  const { handleSubmit, values, errors, handleChange, dirty, setFieldValue } = useFormik<CreateProjectData>({
    initialValues: {
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || PROJECT_STATUS.ACTIVE,
      lifecycleStep: project?.lifecycleStep || PROJECT_LIFECYCLE_STEP.TECHNICAL_SPECIFICATION,
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
      onClose();

      router.push(APP_ROUTE.PROJECTS);
      router.refresh();
    }
  };
  const setEmployeeIds = (employeeIds: string[]) => setFieldValue('employeeIds', employeeIds);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <ConfirmationModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onProjectDelete}
        bodyText={d.modals.confirmation.deleteProject}
      />
      <p className="text-xl font-bold">{d.pages.projects.projectDetails}</p>
      <div className="flex flex-col w-full items-center gap-5">
        <Input
          label={d.labels.title}
          name="name"
          onChange={handleChange}
          value={values.name}
          errorMessage={errors.name}
          isInvalid={!!errors.name}
          variant="bordered"
          className="max-w-xs"
        />
        <Textarea
          label={d.labels.description}
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
          label={d.labels.status}
          name="status"
          defaultSelectedKeys={[values.status]}
          onChange={handleChange}
          value={values.status}
          errorMessage={errors.status}
          variant="bordered"
          className="max-w-xs">
          {Object.values(PROJECT_STATUS).map((status) => (
            <SelectItem key={status} value={status} color="secondary">
              {d.pages.projects[status]}
            </SelectItem>
          ))}
        </Select>
        <Select
          label={d.labels.lifecycleStep}
          name="lifecycleStep"
          defaultSelectedKeys={[values.lifecycleStep]}
          onChange={handleChange}
          value={values.lifecycleStep}
          errorMessage={errors.lifecycleStep}
          variant="bordered"
          className="max-w-xs">
          {Object.values(PROJECT_LIFECYCLE_STEP).map((step) => (
            <SelectItem key={step} value={step} color="secondary">
              {d.pages.projects[step]}
            </SelectItem>
          ))}
        </Select>
      </div>
      <EmployeeSelect employeeIds={values.employeeIds} setEmployeeIds={setEmployeeIds} project={project} />

      <div className={`flex w-full ${project ? 'justify-end' : 'justify-center'} gap-5`}>
        <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
          {d.save}
        </Button>
        {project && (
          <Button type="button" color="danger" className="font-bold" onClick={onOpen}>
            {d.delete}
          </Button>
        )}
      </div>
    </form>
  );
};
