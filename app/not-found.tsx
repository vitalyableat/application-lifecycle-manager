import { FC } from 'react';

import { NotFound } from 'components/ui/not-found';

import { getDictionary, getServerLocale } from '@/dictionaries';

const NotFoundPage: FC = async () => {
  const d = getDictionary(await getServerLocale());

  return <NotFound>{d.pages.home.notFound}</NotFound>;
};

export default NotFoundPage;
