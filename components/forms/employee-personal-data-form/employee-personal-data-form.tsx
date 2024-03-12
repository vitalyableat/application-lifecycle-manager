'use client';
import { FC } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { APP_ROUTE } from '@/constants/app-route';
import { getClientLocale, getDictionary } from '@/dictionaries';
import { IEmployee } from '@/models/employee';
import useAuthStore from '@/services/auth';
import useEmployeeStore from '@/services/employee';
import { EmployeePersonalData } from '@/services/employee/types';
import { dateToIsoString } from '@/utils/date-to-iso-string';
import { formatPhone } from '@/utils/format-phone';

import 'yup-phone-lite';

type Props = {
  employee?: IEmployee;
  isProfile?: boolean;
};

export const EmployeePersonalDataForm: FC<Props> = ({ employee, isProfile }) => {
  const d = getDictionary(getClientLocale());
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);
  const [addEmployee, updateEmployee] = useEmployeeStore((state) => [state.addEmployee, state.updateEmployee]);
  const EmployeePersonalDataValidationSchema: ObjectSchema<EmployeePersonalData> = object({
    name: string().required(d.forms.required),
    surname: string().required(d.forms.required),
    phone: string().phone('BY', d.forms.phone).required(d.forms.required),
    email: string().email(d.forms.email).required(d.forms.required),
    birthDate: string(),
  });
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

        errorMessage.includes('PhoneExists') && setFieldValue('phone', '');
        errorMessage.includes('EmailExists') && setFieldValue('email', '');
      }
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <p className="text-xl font-bold">{d.pages.employees.personalInformation}</p>
      <div className="form-fields">
        <Input
          label={d.labels.name}
          name="name"
          onChange={handleChange}
          value={values.name}
          errorMessage={errors.name}
          isInvalid={!!errors.name}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label={d.labels.surname}
          name="surname"
          onChange={handleChange}
          value={values.surname}
          errorMessage={errors.surname}
          isInvalid={!!errors.surname}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label={d.labels.phone}
          name="phone"
          onChange={handleChange}
          value={values.phone}
          errorMessage={errors.phone}
          isInvalid={!!errors.phone}
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          label={d.labels.email}
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
          label={d.labels.birthday}
          name="birthDate"
          onChange={handleChange}
          value={values.birthDate}
          errorMessage={errors.birthDate}
          isInvalid={!!errors.birthDate}
          variant="bordered"
          className="max-w-xs"
          max={dateToIsoString(new Date())}
        />
      </div>

      <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
        {d.save}
      </Button>
    </form>
  );
};
