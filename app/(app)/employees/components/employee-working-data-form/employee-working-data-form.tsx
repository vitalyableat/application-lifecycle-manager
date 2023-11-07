'use client';
import { FC } from 'react';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { Loader } from '@/components/ui/loader';
import { EMPLOYEE_LEVEL } from '@/constants/employee-level';
import useEmployeeStore from '@/services/employee';
import { EmployeeWorkingData } from '@/services/employee/types';

import 'yup-phone-lite';

const EmployeeWorkingDataValidationSchema: ObjectSchema<EmployeeWorkingData> = object({
  position: string().required(),
  level: string().oneOf(Object.values(EMPLOYEE_LEVEL)).required(),
  active: string().required(),
});

export const EmployeeWorkingDataForm: FC = () => {
  const router = useRouter();
  const [isLoading, addEmployee] = useEmployeeStore((state) => [state.isLoading, state.addEmployee]);
  const { handleSubmit, values, errors, handleChange } = useFormik<EmployeeWorkingData>({
    initialValues: {
      position: '',
      level: EMPLOYEE_LEVEL.JUNIOR,
      active: 'true',
    },
    validationSchema: EmployeeWorkingDataValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // await addEmployee(values);
      // router.push(APP_ROUTE.EMPLOYEES);
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col w-full h-full items-center justify-center gap-5">
      <p className="text-xl font-bold">Working Information</p>
      <div className="form-fields">
        <Input
          label="Position"
          name="position"
          onChange={handleChange}
          value={values.position}
          errorMessage={errors.position}
          variant="bordered"
          className="max-w-xs"
        />
        <Select
          label="Level"
          name="level"
          onChange={handleChange}
          value={values.level}
          errorMessage={errors.level}
          variant="bordered"
          className="max-w-xs">
          {Object.values(EMPLOYEE_LEVEL).map((level) => (
            <SelectItem key={level} value={level} color="secondary">
              {level}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Status"
          name="active"
          onChange={handleChange}
          value={values.active}
          errorMessage={errors.active}
          variant="bordered"
          className="max-w-xs">
          <SelectItem key="true" value="true" color="secondary">
            Active
          </SelectItem>
          <SelectItem key="false" value="false" color="secondary">
            Inactive
          </SelectItem>
        </Select>
      </div>

      <Button color="secondary" className="font-bold" type="submit">
        Save
      </Button>
      {isLoading && <Loader />}
    </form>
  );
};
