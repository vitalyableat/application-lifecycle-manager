import { FC, PropsWithChildren } from 'react';

import { ProjectHeader, ProjectTabs } from './components';

const ProjectsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full">
      <ProjectTabs />
      <div className="flex flex-col w-full" style={{ maxWidth: 'calc(100% - 200px)' }}>
        <ProjectHeader />
        <div className="relative bg-white w-full h-full max-h-[calc(100vh-184px)] flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default ProjectsLayout;
