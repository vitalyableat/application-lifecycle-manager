'use client';

import { ChangePasswordForm, EmployeePersonalDataForm } from '@/components/forms';
import { ActionButton, Loader } from '@/components/ui';
import useAuthStore from '@/services/auth';

import { AvatarInput } from './components/avatar-input';

const ProfileEditPage = () => {
  const [user, isLoading] = useAuthStore((state) => [state.user, state.isLoading]);

  return (
    <div className="flex flex-col gap-5">
      {isLoading && <Loader />}
      <AvatarInput />
      {user && <EmployeePersonalDataForm employee={user} isProfile />}
      <ChangePasswordForm />
      <ActionButton icon="back" routerBack />
    </div>
  );
};

export default ProfileEditPage;
