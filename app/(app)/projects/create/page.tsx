import { ProjectForm } from '@/components/forms';

import { ShowLoader } from '../components';

const ProjectCreatePage = () => {
  return (
    <main className="p-6">
      <ShowLoader />
      <ProjectForm />
    </main>
  );
};

export default ProjectCreatePage;
