import { FC, PropsWithChildren } from 'react';

import { ProjectDataPreloader } from '@/components/wrappers';
import { getProjectByIdHandler } from '@/services/project/handlers';
import { ProjectWithEmployees } from '@/services/project/types';

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectWithDataLayout: FC<PropsWithChildren<Props>> = async ({ children, params }) => {
  params.project = await getProjectByIdHandler(params.projectId);

  return <ProjectDataPreloader>{children}</ProjectDataPreloader>;
};

export default ProjectWithDataLayout;
