'use client';

import { Button, Form, Input } from '@heroui/react';
import { FormEvent, useState } from 'react';

interface IProps {
    onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        onClose();
    };

    return (
        <Form className='w-full' onSubmit={onSubmit}>
            <Input
                isRequired
                name='email'
                placeholder='Введите email'
                type='email'
                value={formData.email}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                }}
                validate={(value) => {
                    if (!value) return 'Почта обязательна';
                    return null;
                }}
            />
            <Input
                isRequired
                name='password'
                placeholder='Введите пароль'
                type='password'
                value={formData.password}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                }}
                validate={(value) => {
                    if (!value) return 'Пароль обязателен';
                    return null;
                }}
            />
            <div className='mt-6'>
                <Button variant='light' onPress={onClose}>
                    Отмена
                </Button>
                <Button color='primary' type='submit'>
                    Войти
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
