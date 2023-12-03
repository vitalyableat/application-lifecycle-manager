import { EmployeePersonalDataForm } from '@/components/forms';

import { ShowLoader } from '../components/';

const UserCreatePage = () => {
  return (
    <>
      <ShowLoader />
      <EmployeePersonalDataForm />
    </>
  );
};

export default UserCreatePage;
