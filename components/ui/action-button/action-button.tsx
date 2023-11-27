'use client';
import { FC } from 'react';

import { Button, type ButtonProps } from '@nextui-org/react';
import { AddNoteBulkIcon, CloseIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';
import { useRouter } from 'next/navigation';

type Props = ButtonProps & {
  icon: 'create' | 'edit' | 'back';
};

const Icons = {
  create: <AddNoteBulkIcon fontSize={24} />,
  edit: <EditDocumentBulkIcon fontSize={24} />,
  back: <CloseIcon fontSize={24} />,
};

export const ActionButton: FC<Props> = ({ icon, onClick, ...props }) => {
  const router = useRouter();

  return (
    <Button
      className="absolute right-4 top-4"
      isIconOnly
      color="secondary"
      variant="flat"
      onClick={icon === 'back' ? router.back : onClick}
      {...props}>
      {Icons[icon]}
    </Button>
  );
};
