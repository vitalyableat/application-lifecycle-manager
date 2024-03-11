'use client';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { PasswordInput } from '@/components/ui';
import { Loader } from '@/components/ui/loader';
import { APP_ROUTE } from '@/constants/app-route';
import { getClientLocale, getDictionary } from '@/dictionaries';
import useAuthStore from '@/services/auth';
import { ChangePasswordData } from '@/services/auth/types';

export const ChangePasswordForm: FC = () => {
  const d = getDictionary(getClientLocale());
  const router = useRouter();
  const [changePassword, isLoading, user] = useAuthStore((state) => [
    state.changePassword,
    state.isLoading,
    state.user,
  ]);
  const ChangePasswordValidationSchema: ObjectSchema<ChangePasswordData> = object({
    oldPassword: string().min(4, d.forms.passwordMinLength).required(d.forms.required),
    newPassword: string().min(4, d.forms.passwordMinLength).required(d.forms.required),
  });
  const { handleSubmit, values, errors, handleChange, dirty } = useFormik<ChangePasswordData>({
    initialValues: { oldPassword: '', newPassword: '' },
    validationSchema: ChangePasswordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await changePassword({ ...values, id: user?.id as string });
        toast.success(d.toasts.passwordUpdated);
        router.push(APP_ROUTE.PROFILE);
      } catch (e) {
        resetForm();
      }
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <p className="text-xl font-bold">{d.pages.profile.changePassword}</p>
      <div className="form-fields">
        <PasswordInput
          label={d.labels.oldPassword}
          name="oldPassword"
          onChange={handleChange}
          value={values.oldPassword}
          errorMessage={errors.oldPassword}
        />
        <PasswordInput
          label={d.labels.newPassword}
          name="newPassword"
          onChange={handleChange}
          value={values.newPassword}
          errorMessage={errors.newPassword}
        />
      </div>
      <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
        {d.save}
      </Button>
      {isLoading && <Loader />}
    </form>
  );
};
