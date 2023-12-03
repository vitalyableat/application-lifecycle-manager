'use client';
import { FC } from 'react';

import { Button, type ButtonProps } from '@nextui-org/react';
import { AddNoteBulkIcon, CloseIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';
import { useRouter } from 'next/navigation';

type Props = ButtonProps & {
  icon: 'create' | 'edit' | 'back';
  routerBack?: boolean;
};

const Icons = {
  create: <AddNoteBulkIcon fontSize={24} />,
  edit: <EditDocumentBulkIcon fontSize={24} />,
  back: <CloseIcon fontSize={24} />,
};

export const ActionButton: FC<Props> = ({ icon, routerBack, onClick, className, ...props }) => {
  const router = useRouter();

  return (
    <Button
      className={`absolute right-4 top-4 ${className}`}
      isIconOnly
      color="secondary"
      variant="flat"
      onClick={routerBack ? router.back : onClick}
      {...props}>
      {Icons[icon]}
    </Button>
  );
};
