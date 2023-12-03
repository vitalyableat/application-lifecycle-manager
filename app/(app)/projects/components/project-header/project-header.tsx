'use client';
import { FC, useEffect, useMemo } from 'react';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { WithRoleAccess } from '@/components/templates';
import { ActionButton } from '@/components/ui';
import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import useProjectStore from '@/services/project';

export const ProjectHeader: FC = () => {
  const { projectId } = useParams<{ projectId?: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const shouldShowBack = pathname.includes('/create') || pathname.includes('edit');
  const [isLoading, projects] = useProjectStore((state) => [state.isLoading, state.projects]);
  const project = useMemo(() => projects.find(({ id }) => id === projectId), [projects, projectId]);

  useEffect(() => {
    if (projects.length && !project) {
      router.push(APP_ROUTE.PROJECTS);
    }
  }, [projects]);

  return (
    <div className="w-full border-b-1 p-6 relative h-[72px]">
      {!isLoading && <p className="font-bold max-w-[calc(100%-40px)] txt-overflow">{project?.name}</p>}

      <WithRoleAccess rolesWithAccess={[EMPLOYEE_ROLE.PROJECT_MANAGER]}>
        <ActionButton
          icon={shouldShowBack ? 'back' : projectId ? 'edit' : 'create'}
          routerBack={shouldShowBack}
          onClick={() =>
            router.push(
              projectId ? APP_ROUTE.PROJECT_DETAILS_EDIT.replace(':projectId', projectId) : APP_ROUTE.PROJECT_CREATE,
            )
          }
        />
      </WithRoleAccess>
    </div>
  );
};
