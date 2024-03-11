'use client';
import { FC, useEffect } from 'react';

import { Textarea } from '@nextui-org/input';
import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { object, ObjectSchema, string } from 'yup';

import { getClientLocale, getDictionary } from '@/dictionaries';
import { IFeature } from '@/models/feature';
import useFeatureStore from '@/services/feature';
import { CreateFeatureData } from '@/services/feature/types';

type Props = {
  feature?: IFeature;
  closeForm: () => void;
};

export const FeatureForm: FC<Props> = ({ feature, closeForm }) => {
  const d = getDictionary(getClientLocale());
  const { projectId } = useParams<{ projectId: string }>();
  const [addFeature, updateFeature, deleteFeature] = useFeatureStore((state) => [
    state.addFeature,
    state.updateFeature,
    state.deleteFeature,
  ]);
  const FeatureValidationSchema: ObjectSchema<CreateFeatureData> = object({
    title: string().required(d.forms.required),
    description: string(),
    projectId: string().required(d.forms.required),
  });
  const { handleSubmit, values, errors, handleChange, dirty, resetForm } = useFormik<CreateFeatureData>({
    initialValues: {
      title: feature?.title || '',
      description: feature?.description || '',
      projectId,
    },
    validationSchema: FeatureValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        feature ? await updateFeature({ ...values, id: feature.id }) : await addFeature(values);
        closeForm();
      } finally {
        resetForm();
      }
    },
    validateOnChange: false,
  });

  useEffect(() => {
    feature && resetForm({ values: { title: feature.title, description: feature.description, projectId } });
  }, [feature]);

  const onFeatureDelete = async () => {
    if (feature) {
      await deleteFeature(feature.id);
      closeForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center gap-5">
      <p className="text-xl font-bold">{d.pages.projects.featureDetails}</p>
      <div className="flex flex-col w-full items-center gap-5">
        <Input
          label={d.labels.title}
          name="title"
          onChange={handleChange}
          value={values.title}
          errorMessage={errors.title}
          isInvalid={!!errors.title}
          variant="bordered"
          className="max-w-xs"
        />
        <Textarea
          label={d.labels.description}
          name="description"
          onChange={handleChange}
          value={values.description}
          errorMessage={errors.description}
          isInvalid={!!errors.description}
          variant="bordered"
          className="max-w-xs"
          maxRows={3}
        />
      </div>
      <div className={`flex w-full ${feature ? 'justify-end' : 'justify-center'} gap-5`}>
        <Button disabled={!dirty} color="secondary" className="font-bold disabled:bg-secondary-200" type="submit">
          {d.save}
        </Button>
        {feature && (
          <Button type="button" color="danger" className="font-bold" onClick={onFeatureDelete}>
            {d.delete}
          </Button>
        )}
      </div>
    </form>
  );
};
