'use client';
import { FC } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { Loader } from '@/components/ui/loader';
import { APP_ROUTE } from '@/constants/app-route';
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

export const EmployeePersonalDataForm: FC = () => {
  const router = useRouter();
  const [isLoading, addEmployee] = useEmployeeStore((state) => [state.isLoading, state.addEmployee]);
  const { handleSubmit, values, errors, handleChange } = useFormik<EmployeePersonalData>({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      birthDate: '',
    },
    validationSchema: EmployeePersonalDataValidationSchema,
    onSubmit: async (values) => {
      try {
        await addEmployee({ ...values, phone: formatPhone(values.phone) });
        // router.push(APP_ROUTE.EMPLOYEES);
      } catch (e) {
        console.log(e);
      }
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col w-full h-full items-center justify-center gap-5">
      <p className="text-xl font-bold">Personal Information</p>
      <div className="flex flex-wrap justify-center gap-5">
        <Input
          label="Name"
          name="name"
          onChange={handleChange}
          value={values.name}
          errorMessage={errors.name}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label="Surname"
          name="surname"
          onChange={handleChange}
          value={values.surname}
          errorMessage={errors.surname}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label="Phone"
          name="phone"
          onChange={handleChange}
          value={values.phone}
          errorMessage={errors.phone}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label="Email"
          name="email"
          onChange={handleChange}
          value={values.email}
          errorMessage={errors.email}
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
          variant="bordered"
          className="max-w-xs"
        />
      </div>

      <Button color="secondary" className="font-bold" type="submit">
        Save
      </Button>
      {isLoading && <Loader />}
    </form>
  );
};
