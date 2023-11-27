'use client';

import { useRouter } from 'next/navigation';

import { ActionButton, EmployeePreview } from '@/components/ui';
import { APP_ROUTE } from '@/constants/app-route';
import useAuthStore from '@/services/auth';

const ProfilePage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <h1 className="text-xl font-bold text-center mb-5">
        {user?.name} {user?.surname}
      </h1>
      {user && <EmployeePreview employee={user} />}
      <ActionButton icon="edit" onClick={() => router.push(APP_ROUTE.PROFILE_EDIT)} />
    </>
  );
};

export default ProfilePage;
