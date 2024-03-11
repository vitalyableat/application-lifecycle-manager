import { getDictionary, getServerLocale } from '@/dictionaries';

const ProjectsPage = async () => {
  const d = getDictionary(await getServerLocale());

  return <main className="flex h-full justify-center items-center">{d.pages.projects.selectProject}</main>;
};

export default ProjectsPage;
