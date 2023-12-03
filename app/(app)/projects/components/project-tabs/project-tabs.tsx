'use client';
import { FC, Key, useEffect } from 'react';

import { Accordion, AccordionItem, Listbox, ListboxItem } from '@nextui-org/react';
import { Search } from 'components/ui/search';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { Loader } from '@/components/ui';
import { APP_ROUTE } from '@/constants/app-route';
import useProjectStore from '@/services/project';

import { PROJECT_LISTBOX } from './project-tabs.constants';
import { AccordionItemClasses } from './project-tabs.styles';

export const ProjectTabs: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { projectId } = useParams<{ projectId?: string }>();
  const [projects, isLoading, getProjects] = useProjectStore((state) => [
    state.projects,
    state.isLoading,
    state.getProjects,
  ]);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="relative min-w-[200px] w-80 border-r-1">
      {isLoading && <Loader />}
      <div className="px-2 py-4">
        <Search />
      </div>
      <Accordion
        itemClasses={AccordionItemClasses}
        showDivider={false}
        className="p-0 overflow-auto h-[calc(100vh-184px)] max-h-[calc(100vh-184px)]"
        defaultSelectedKeys={[projectId] as Iterable<Key>}>
        {projects.map(({ name, id }) => (
          <AccordionItem key={id} title={name}>
            <Listbox
              onAction={(key) => router.push((key as APP_ROUTE).replace(':projectId', id))}
              variant="flat"
              className="px-0 py-2"
              aria-label="Project Listbox"
              color="secondary">
              {PROJECT_LISTBOX.map(({ key, title, Icon }) => (
                <ListboxItem
                  key={key}
                  startContent={Icon}
                  className={`${
                    pathname === key.replace(':projectId', id) && 'bg-secondary-200 data-[hover=true]:bg-secondary-100'
                  }`}>
                  {title}
                </ListboxItem>
              ))}
            </Listbox>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
