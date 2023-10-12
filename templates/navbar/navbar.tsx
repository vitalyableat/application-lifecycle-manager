'use client';
import { Accordion, AccordionItem, Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

export const Navbar = () => {
  return (
    <div className="min-w-[200px] w-80 p-2 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-auto border-1">
      <Input
        classNames={{
          base: 'w-full h-10',
          inputWrapper: 'h-full text-default-500 bg-default-400/20',
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon />}
        type="search"
      />
      <Accordion isCompact className="p-0">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          1
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          2
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          3
        </AccordionItem>
      </Accordion>
    </div>
  );
};
