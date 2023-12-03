import { ProjectForm } from '@/components/forms';
import { getProjectByIdHandler } from '@/services/project/handlers';

import { ShowLoader } from '../../../components';

const ProjectDetailsEditPage = async ({ params }: { params: { projectId: string } }) => {
  const project = await getProjectByIdHandler(params.projectId);

  return (
    <main className="flex flex-col p-6">
      <ShowLoader />
      <ProjectForm project={project} />
    </main>
  );
};

export default ProjectDetailsEditPage;
