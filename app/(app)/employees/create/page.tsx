import { EmployeePersonalDataForm } from '@/components/forms';
import { RoleCheck } from '@/components/wrappers';
import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';

import { ShowLoader } from '../components/';

const UserCreatePage = () => {
  return (
    <RoleCheck role={EMPLOYEE_ROLE.RESOURCE_MANAGER} redirect={APP_ROUTE.EMPLOYEES}>
      <ShowLoader />
      <EmployeePersonalDataForm />
    </RoleCheck>
  );
};

export default UserCreatePage;
