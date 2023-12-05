import { ProjectForm } from '@/components/forms';
import { RoleCheck } from '@/components/wrappers';
import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';

import { ShowLoader } from '../components';

const ProjectCreatePage = () => {
  return (
    <RoleCheck role={EMPLOYEE_ROLE.PROJECT_MANAGER} redirect={APP_ROUTE.PROJECTS}>
      <main className="p-6 overflow-y-auto">
        <ShowLoader />
        <ProjectForm />
      </main>
    </RoleCheck>
  );
};

export default ProjectCreatePage;
