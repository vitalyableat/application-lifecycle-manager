import { FC, PropsWithChildren } from 'react';

import { getProjectByIdHandler } from '@/services/project/handlers';
import { ProjectWithEmployees } from '@/services/project/types';

type Props = {
  params: { projectId: string; project: ProjectWithEmployees };
};

const ProjectFeaturesLayout: FC<PropsWithChildren<Props>> = async ({ children, params }) => {
  params.project = await getProjectByIdHandler(params.projectId);

  return <>{children}</>;
};

export default ProjectFeaturesLayout;
