'use client';
import { ChangeEventHandler, FC, useState } from 'react';

import { Skeleton } from '@nextui-org/react';
import { CloseIcon } from '@nextui-org/shared-icons';

import { AvatarPreview } from '@/components/ui';
import { blobToBase64String } from '@/utils/blob-to-base64-string';

export const AvatarInput: FC = () => {
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onAvatarChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files?.[0]) {
      setIsLoading(true);
      const base64 = await blobToBase64String(event.target.files[0]);

      setAvatar(base64);
      setIsLoading(false);
    }
  };
  const onAvatarDelete = () => setAvatar('');

  return (
    <Skeleton className="flex relative w-60 h-60 m-auto rounded-md" isLoaded={!isLoading}>
      {avatar && (
        <CloseIcon
          fontSize={20}
          className="absolute top-1 right-1 z-20 cursor-pointer text-red-700 hover:text-red-800"
          onClick={onAvatarDelete}
        />
      )}
      <label htmlFor="avatarInput" className="absolute top-0 left-0 w-full h-full">
        <AvatarPreview avatar={avatar} />
      </label>
      <input id="avatarInput" type="file" className="hidden" onChange={onAvatarChange} />
    </Skeleton>
  );
};
