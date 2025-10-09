'use client';

import CustomModal from '@/components/common/modal';
import RegistrationForm from '@/forms/registration.form';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: IProps) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title='Авторизация'>
            <RegistrationForm onClose={onClose} />
        </CustomModal>
    );
};

export default LoginModal;
