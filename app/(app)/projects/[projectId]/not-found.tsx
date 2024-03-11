import { FC } from 'react';

import { NotFound } from '@/components/ui';
import { getClientLocale, getDictionary } from '@/dictionaries';

const NotFoundPage: FC = () => {
  const d = getDictionary(getClientLocale());

  return <NotFound>{d.pages.projects.notFound}</NotFound>;
};

export default NotFoundPage;
