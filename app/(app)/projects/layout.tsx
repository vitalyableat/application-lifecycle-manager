import { FC, PropsWithChildren } from 'react';

import { ProjectHeader, ProjectTabs } from './components';

const ProjectsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <ProjectTabs />
      <div className="flex-col w-full">
        <ProjectHeader />
        <div className="relative bg-white min-w-full h-full max-h-[calc(100vh-184px)] overflow-auto flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectsLayout;
