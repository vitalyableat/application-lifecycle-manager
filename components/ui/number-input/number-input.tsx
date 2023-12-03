'use client';
import { ClipboardEvent, FC, forwardRef, KeyboardEvent } from 'react';

import { Input } from '@nextui-org/input';
import { InputProps } from '@nextui-org/react';

export const NumberInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const insert = (str: string, start: number, end: number, value: string) =>
    str.substring(0, start) + value + str.substring(end);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    const start = e.currentTarget.selectionStart || 0;
    const end = e.currentTarget.selectionEnd || 0;
    const finalValue = insert(currentValue, start, end, e.key);
    const isAllowedKey = e.ctrlKey || ['Backspace', 'Delete', 'ArrowRight', 'ArrowLeft'].includes(e.key);

    if (!/^\d*(\.\d?)?$/.test(finalValue) && !isAllowedKey) {
      e.preventDefault();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return <Input variant="bordered" {...props} ref={ref} onKeyDown={onKeyDown} onPaste={onPaste} />;
});

NumberInput.displayName = 'NumberInput';
