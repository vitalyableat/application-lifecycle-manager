'use client';
import { FC } from 'react';

import { Accordion, AccordionItem, Listbox, ListboxItem } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

import { Search } from '@/components/search';
import { APP_ROUTES } from '@/constants/app-routes';

import { MOCKED_PROJECTS, PROJECT_LISTBOX } from './project-tabs.constants';
import { AccordionItemClasses } from './project-tabs.styles';

export const ProjectTabs: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-w-[200px] w-80 border-r-1">
      <div className="p-2">
        <Search />
      </div>
      <Accordion
        itemClasses={AccordionItemClasses}
        showDivider={false}
        className="p-0 overflow-auto h-[calc(100vh-168px)] max-h-[calc(100vh-160px)]">
        {MOCKED_PROJECTS.map(({ name, id }) => (
          <AccordionItem key={name} title={name}>
            <Listbox
              onAction={(key) => router.push((key as APP_ROUTES).replace(':projectId', id))}
              variant="flat"
              className="px-0 py-2"
              aria-label="Project Listbox">
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