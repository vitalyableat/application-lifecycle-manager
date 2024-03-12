import { FC } from 'react';

import { NotFound } from '@/components/ui';
import { getDictionary, getServerLocale } from '@/dictionaries';

const NotFoundPage: FC = async () => {
  const d = getDictionary(await getServerLocale());

  return <NotFound>{d.pages.employees.notFound}</NotFound>;
};

export default NotFoundPage;
