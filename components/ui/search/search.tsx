import { FC, forwardRef } from 'react';

import { Input, InputProps } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

import { InputClassNames } from './search.styles';

export const Search: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Input
      classNames={InputClassNames}
      isClearable
      placeholder="Type to search..."
      startContent={<SearchIcon />}
      type="search"
      {...props}
      ref={ref}
    />
  );
});

Search.displayName = 'Search';
