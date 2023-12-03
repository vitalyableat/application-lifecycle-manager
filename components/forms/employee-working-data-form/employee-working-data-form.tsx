'use client';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { APP_ROUTE } from '@/constants/app-route';
import { EMPLOYEE_LEVEL } from '@/constants/employee-level';
import { IEmployee } from '@/models/employee';
import useEmployeeStore from '@/services/employee';
import { EmployeeWorkingData } from '@/services/employee/types';

const EmployeeWorkingDataValidationSchema: ObjectSchema<EmployeeWorkingData> = object({
  position: string().required(),
  level: string().oneOf(Object.values(EMPLOYEE_LEVEL)).required(),
  active: string().required(),
});

type Props = {
  employee: IEmployee;
};

export const EmployeeWorkingDataForm: FC<Props> = ({ employee }) => {
  const router = useRouter();
  const [updateEmployee] = useEmployeeStore((state) => [state.updateEmployee]);
  const { handleSubmit, values, errors, handleChange, dirty } = useFormik<EmployeeWorkingData>({
    initialValues: {
      position: employee?.position || '',
      level: employee?.level || EMPLOYEE_LEVEL.JUNIOR,
      active: String(employee?.active) || 'true',
    },
    validationSchema: EmployeeWorkingDataValidationSchema,
    onSubmit: async (values) => {
      try {
        const { id } = await updateEmployee({ ...values, active: values.active === 'true', id: employee.id });

        router.push(APP_ROUTE.EMPLOYEE_DETAILS.replace(':employeeId', id));
        router.refresh();
      } catch (e) {
        toast.error((e as Error).message);
      }
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col w-full items-center justify-center gap-5">
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
          defaultSelectedKeys={[values.level]}
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
          defaultSelectedKeys={[String(values.active)]}
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

      <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
        Save
      </Button>
    </form>
  );
};
