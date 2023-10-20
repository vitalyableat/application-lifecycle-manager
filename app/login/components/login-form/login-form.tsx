'use client';
import { FC, useState } from 'react';

import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { useFormik } from 'formik';
import { type InferType, object, string } from 'yup';

const LoginValidationSchema = object({
  email: string().email().required(),
  password: string().min(6).required(),
});

type LoginData = InferType<typeof LoginValidationSchema>;

export const LoginForm: FC = () => {
  const [visible, setVisible] = useState(false);
  const { handleSubmit, values, errors, handleChange } = useFormik<LoginData>({
    initialValues: { email: '', password: '' },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="w-3/5 h-full flex flex-col items-center justify-center gap-5">
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
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Button color="secondary" className="font-bold" type="submit">
        Login
      </Button>
    </form>
  );
};
