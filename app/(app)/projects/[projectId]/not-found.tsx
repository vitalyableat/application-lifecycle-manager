import { NotFound } from '@/components/ui';
import { getDictionary, getServerLocale } from '@/dictionaries';

const NotFoundPage = async () => {
  const d = getDictionary(await getServerLocale());

  return <NotFound>{d.pages.projects.notFound}</NotFound>;
};

export default NotFoundPage;
