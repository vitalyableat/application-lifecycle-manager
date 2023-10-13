'use client';
import { Accordion, AccordionItem, Input, Listbox, ListboxItem } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

import { MOCKED_PROJECTS, PROJECT_LISTBOX } from './navbar.constants';
import { AccordionItemClasses, InputClassNames } from './navbar.styles';

export const Navbar = () => {
  return (
    <div className="min-w-[200px] w-80 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-auto border-1">
      <div className="p-2 top-0 sticky bg-white z-10">
        <Input
          classNames={InputClassNames}
          isClearable
          placeholder="Type to search..."
          startContent={<SearchIcon />}
          type="search"
        />
      </div>
      <Accordion itemClasses={AccordionItemClasses} showDivider={false} className="p-0">
        {MOCKED_PROJECTS.map(({ name }) => (
          <AccordionItem key={name} title={name}>
            <Listbox
              items={PROJECT_LISTBOX}
              onAction={(key) => alert(key)}
              variant="flat"
              className="p-0"
              aria-label="Project Listbox">
              {({ key, title, Icon }) => (
                <ListboxItem
                  key={key}
                  startContent={Icon}
                  className={title === 'Report' ? 'bg-secondary-100 data-[hover=true]:bg-secondary-200' : ''}>
                  {title}
                </ListboxItem>
              )}
            </Listbox>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
