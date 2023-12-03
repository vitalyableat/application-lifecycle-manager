'use client';
import { FC } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { APP_ROUTE } from '@/constants/app-route';
import { IEmployee } from '@/models/employee';
import useAuthStore from '@/services/auth';
import useEmployeeStore from '@/services/employee';
import { EmployeePersonalData } from '@/services/employee/types';
import { formatPhone } from '@/utils/format-phone';

import 'yup-phone-lite';

const EmployeePersonalDataValidationSchema: ObjectSchema<EmployeePersonalData> = object({
  name: string().required(),
  surname: string().required(),
  phone: string().phone('BY').required(),
  email: string().email().required(),
  birthDate: string(),
});

type Props = {
  employee?: IEmployee;
  isProfile?: boolean;
};

export const EmployeePersonalDataForm: FC<Props> = ({ employee, isProfile }) => {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);
  const [addEmployee, updateEmployee] = useEmployeeStore((state) => [state.addEmployee, state.updateEmployee]);
  const { handleSubmit, values, errors, handleChange, dirty } = useFormik<EmployeePersonalData>({
    initialValues: {
      name: employee?.name || '',
      surname: employee?.surname || '',
      phone: employee?.phone || '',
      email: employee?.email || '',
      birthDate: employee?.birthDate || '',
    },
    validationSchema: EmployeePersonalDataValidationSchema,
    onSubmit: async (values, { setFieldValue }) => {
      try {
        if (isProfile) {
          await updateUser({ ...values, phone: formatPhone(values.phone), id: employee?.id });
          router.push(APP_ROUTE.PROFILE);
        } else {
          const { id } = employee
            ? await updateEmployee({ ...values, phone: formatPhone(values.phone), id: employee.id })
            : await addEmployee({ ...values, phone: formatPhone(values.phone) });

          router.push(APP_ROUTE.EMPLOYEE_DETAILS.replace(':employeeId', id));
          router.refresh();
        }
      } catch (e) {
        const errorMessage = (e as Error).message;

        errorMessage.includes('phone') && setFieldValue('phone', '');
        errorMessage.includes('email') && setFieldValue('email', '');
      }
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <p className="text-xl font-bold">Personal Information</p>
      <div className="form-fields">
        <Input
          label="Name"
          name="name"
          onChange={handleChange}
          value={values.name}
          errorMessage={errors.name}
          isInvalid={!!errors.name}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label="Surname"
          name="surname"
          onChange={handleChange}
          value={values.surname}
          errorMessage={errors.surname}
          isInvalid={!!errors.surname}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label="Phone"
          name="phone"
          onChange={handleChange}
          value={values.phone}
          errorMessage={errors.phone}
          isInvalid={!!errors.phone}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label="Email"
          name="email"
          onChange={handleChange}
          value={values.email}
          errorMessage={errors.email}
          isInvalid={!!errors.email}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          classNames={{ label: 'font-medium pointer-events-auto text-tiny translate-y-[-11px]' }}
          type="date"
          label="Birthday"
          name="birthDate"
          onChange={handleChange}
          value={values.birthDate}
          errorMessage={errors.birthDate}
          isInvalid={!!errors.birthDate}
          variant="bordered"
          className="max-w-xs"
        />
      </div>

      <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
        Save
      </Button>
    </form>
  );
};
