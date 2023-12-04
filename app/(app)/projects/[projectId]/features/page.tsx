'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { FeatureForm } from '@/components/forms';
import { WithRoleAccess } from '@/components/templates';
import { ActionButton, Loader } from '@/components/ui';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { IFeature } from '@/models/feature';
import useFeatureStore from '@/services/feature';

const ProjectFeaturesPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<IFeature | undefined>();
  const [isLoading, features, getProjectFeatures] = useFeatureStore((state) => [
    state.isLoading,
    state.features,
    state.getProjectFeatures,
  ]);

  useEffect(() => {
    getProjectFeatures(projectId);
  }, []);

  const openFormForCreate = () => setIsFormOpen(true);

  const openFormForUpdate = (feature: IFeature) => {
    setSelectedFeature(feature);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedFeature(undefined);
  };

  return (
    <main className="flex w-full h-full">
      {isLoading && <Loader />}
      <div className="w-full flex flex-col">
        <div className={`${!isFormOpen && 'relative'} py-6 border-b-1`}>
          <p className="text-xl font-bold text-center">Features</p>
          <WithRoleAccess rolesWithAccess={[EMPLOYEE_ROLE.PROJECT_MANAGER]}>
            {isFormOpen ? (
              <ActionButton icon="back" onClick={closeForm} />
            ) : (
              <ActionButton icon="create" onClick={openFormForCreate} />
            )}
          </WithRoleAccess>
        </div>
        <div className="w-full flex flex-col p-6 gap-5 overflow-y-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col gap-3 p-3 w-full rounded-md outline outline-default-200 relative">
              <WithRoleAccess rolesWithAccess={[EMPLOYEE_ROLE.PROJECT_MANAGER]}>
                <ActionButton icon="edit" onClick={() => openFormForUpdate(feature)} className="top-2 right-2" />
              </WithRoleAccess>
              <p className="text-lg font-bold max-w-[calc(100%-48px)]">{feature.title}</p>
              <p className="text-md whitespace-pre-wrap">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {isFormOpen && (
        <div className="h-full w-1/3 min-w-[300px] border-l-1 p-6">
          <FeatureForm feature={selectedFeature} closeForm={closeForm} />
        </div>
      )}
    </main>
  );
};

export default ProjectFeaturesPage;
