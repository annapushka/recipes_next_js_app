'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal';
import { ReactNode } from 'react';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    title: string;
    children: ReactNode;
}

const CustomModal = ({
    isOpen,
    onClose,
    size = 'xs',
    title,
    children,
}: IProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                <ModalHeader className='border-b'>
                    <h3 className='text-xl font-semibold'>{title}</h3>
                </ModalHeader>
                <ModalBody className='space-y-4 py-6'>{children}</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
