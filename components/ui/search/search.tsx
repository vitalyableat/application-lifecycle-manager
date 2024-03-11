'use client';
import { ChangeEventHandler, FC, forwardRef, useCallback, useState } from 'react';

import { Input } from '@nextui-org/input';
import { InputProps } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import debounce from 'lodash.debounce';

import { getClientLocale, getDictionary } from '@/dictionaries';

import { InputClassNames } from './search.styles';

type Props = Omit<InputProps, 'onChange' | 'value'> & {
  value?: string;
  onChange?: (value: string) => void;
};

export const Search: FC<Props> = forwardRef<HTMLInputElement, Props>(({ value, onChange, ...props }, ref) => {
  const d = getDictionary(getClientLocale());
  const [search, setSearch] = useState<string>(value || '');
  const debounceSearch = useCallback(
    debounce((value: string) => {
      onChange?.(value);
    }, 1000),
    [],
  );

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    setSearch(value);
    onChange && debounceSearch(value);
  };

  const onClear = () => {
    setSearch('');
    onChange && debounceSearch('');
  };

  return (
    <Input
      classNames={InputClassNames}
      isClearable
      placeholder={d.labels.search}
      startContent={<SearchIcon />}
      type="search"
      value={search}
      onChange={onSearchChange}
      onClear={onClear}
      {...props}
      ref={ref}
    />
  );
});

Search.displayName = 'Search';
