import { FC, PropsWithChildren } from 'react';

import { ProjectTabs } from './components/project-tabs';

const ProjectsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <ProjectTabs />
      <div className="bg-white min-w-full min-h-full p-6 flex-col">{children}</div>
    </div>
  );
};

export default ProjectsLayout;
