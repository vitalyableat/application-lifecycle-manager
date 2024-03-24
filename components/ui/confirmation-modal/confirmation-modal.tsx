'use client';
import { FC } from 'react';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

import { Loader } from '@/components/ui';
import { getClientLocale, getDictionary } from '@/dictionaries';

type Props = {
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bodyText: string;
};

export const ConfirmationModal: FC<Props> = ({ isLoading, isOpen, onClose, onConfirm, bodyText }) => {
  const d = getDictionary(getClientLocale());

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={!isLoading}>
      <ModalContent>
        {isLoading && <Loader />}
        <ModalHeader className="flex flex-col gap-1 text-center">{d.modals.confirmation.title}</ModalHeader>
        <ModalBody className="whitespace-pre-wrap text-center">{bodyText}</ModalBody>
        <ModalFooter className="justify-center">
          <Button color="secondary" className="font-bold disabled:bg-secondary-200" onClick={onConfirm}>
            {d.modals.confirmation.buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
