'use client';
import { FC, Key, useEffect, useMemo, useState } from 'react';

import { Accordion, AccordionItem, Listbox, ListboxItem } from '@nextui-org/react';
import { Search } from 'components/ui/search';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { Loader } from '@/components/ui';
import { APP_ROUTE } from '@/constants/app-route';
import { getClientLocale, getDictionary } from '@/dictionaries';
import useProjectStore from '@/services/project';

import { PROJECT_LISTBOX } from './project-tabs.constants';
import { AccordionItemClasses } from './project-tabs.styles';

export const ProjectTabs: FC = () => {
  const d = getDictionary(getClientLocale());
  const router = useRouter();
  const pathname = usePathname();
  const { projectId } = useParams<{ projectId?: string }>();
  const [search, setSearch] = useState('');
  const [projects, isLoading, getProjects] = useProjectStore((state) => [
    state.projects,
    state.isLoading,
    state.getProjects,
  ]);

  useEffect(() => {
    getProjects();
  }, []);

  const filteredProjects = useMemo(
    () => projects.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [search, projects],
  );

  return (
    <div className="relative min-w-[200px] w-[200px] border-r-1">
      {isLoading && <Loader />}
      <div className="px-2 py-4">
        <Search value={search} onChange={setSearch} />
      </div>
      <Accordion
        itemClasses={AccordionItemClasses}
        showDivider={false}
        className="p-0 overflow-auto h-[calc(100vh-184px)] max-h-[calc(100vh-184px)]"
        defaultSelectedKeys={[projectId] as Iterable<Key>}>
        {filteredProjects.map(({ name, id }) => (
          <AccordionItem key={id} title={name}>
            <Listbox
              onAction={(key) => router.push((key as APP_ROUTE).replace(':projectId', id))}
              variant="flat"
              className="px-0 py-2"
              aria-label="Project Listbox"
              itemClasses={{ base: 'data-[hover=true]:bg-secondary-100' }}>
              {PROJECT_LISTBOX.map(({ key, title, Icon }) => (
                <ListboxItem
                  key={key}
                  startContent={Icon}
                  className={`${pathname === key.replace(':projectId', id) && 'bg-secondary-200'}`}>
                  {d.templates.projectTabs[title]}
                </ListboxItem>
              ))}
            </Listbox>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
