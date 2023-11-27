'use client';
import { FC, forwardRef, useState } from 'react';

import { Input } from '@nextui-org/input';
import { InputProps } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

export const PasswordInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      type={visible ? 'text' : 'password'}
      variant="bordered"
      className="max-w-xs"
      endContent={
        <button className="focus:outline-none" type="button" onClick={() => setVisible((v) => !v)}>
          {visible ? (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      {...props}
      ref={ref}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
