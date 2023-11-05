'use client';
import { FC, useState } from 'react';

import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { Loader } from '@/components/ui/loader';
import { APP_ROUTE } from '@/constants/app-route';
import useAuthStore from '@/services/auth';
import { LoginData } from '@/services/auth/types';

const LoginValidationSchema: ObjectSchema<LoginData> = object({
  email: string().email().required(),
  password: string().min(4).required(),
});

export const LoginForm: FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [login, isLoading] = useAuthStore((state) => [state.login, state.isLoading]);
  const { handleSubmit, values, errors, handleChange } = useFormik<LoginData>({
    initialValues: { email: '', password: '' },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      await login(values);
      router.push(APP_ROUTE.HOME);
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit} className="relative w-3/5 h-full flex flex-col items-center justify-center gap-5">
      <p className="text-2xl font-bold mb-5">Welcome to ALM</p>
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
        type={visible ? 'text' : 'password'}
        label="Password"
        name="password"
        onChange={handleChange}
        value={values.password}
        errorMessage={errors.password}
        variant="bordered"
        className="max-w-xs"
        endContent={
          <button className="focus:outline-none" type="button" onClick={() => setVisible((v) => !v)}>
            {visible ? (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Button color="secondary" className="font-bold" type="submit">
        Login
      </Button>
      {isLoading && <Loader />}
    </form>
  );
};
