import { ProjectForm } from '@/components/forms';
import { RoleCheck } from '@/components/wrappers';
import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { getProjectByIdHandler } from '@/services/project/handlers';

import { ShowLoader } from '../../../components';

const ProjectDetailsEditPage = async ({ params }: { params: { projectId: string } }) => {
  const project = await getProjectByIdHandler(params.projectId);

  return (
    <RoleCheck
      role={EMPLOYEE_ROLE.PROJECT_MANAGER}
      redirect={APP_ROUTE.PROJECT_DETAILS.replace(':projectId', params.projectId) as APP_ROUTE}>
      <main className="flex flex-col p-6 overflow-y-auto">
        <ShowLoader />
        <ProjectForm project={project} />
      </main>
    </RoleCheck>
  );
};

export default ProjectDetailsEditPage;
