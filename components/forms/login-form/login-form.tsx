'use client';
import { FC } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { PasswordInput } from '@/components/ui';
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
  const [login, isLoading] = useAuthStore((state) => [state.login, state.isLoading]);
  const { handleSubmit, values, errors, handleChange, dirty } = useFormik<LoginData>({
    initialValues: { email: '', password: '' },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await login(values);
        router.push(APP_ROUTE.HOME);
      } catch (e) {
        resetForm();
      }
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
      <PasswordInput
        label="Password"
        name="password"
        onChange={handleChange}
        value={values.password}
        errorMessage={errors.password}
      />
      <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
        Login
      </Button>
      {isLoading && <Loader />}
    </form>
  );
};
