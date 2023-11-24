'use client';
import { FC } from 'react';

import { Avatar } from '@nextui-org/react';

type Props = {
  avatar?: string;
};

export const AvatarPreview: FC<Props> = ({ avatar }) => {
  return (
    <Avatar radius="sm" src={avatar} color="secondary" className="w-60 h-60 cursor-pointer m-auto bg-secondary-100" />
  );
};
