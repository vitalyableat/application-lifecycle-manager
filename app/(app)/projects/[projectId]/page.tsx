import { FC } from 'react';

import { redirect } from 'next/navigation';

import { APP_ROUTE } from '@/constants/app-route';

const ProjectPage: FC<{ params: { projectId: string } }> = ({ params }) => {
  redirect(APP_ROUTE.PROJECT_DETAILS.replace(':projectId', params.projectId));

  return null;
};

export default ProjectPage;
