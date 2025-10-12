'use client';

import { registerUser } from '@/actions/register';
import { Button, Form, Input } from '@heroui/react';
import { FormEvent, useState } from 'react';

interface IProps {
    onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        const result = await registerUser(formData);

        console.log({ result });

        onClose();
    };
    const validateEmail = (email: string) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
                    if (!validateEmail(value)) return 'Некорректный email';
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
                    if (value.length < 6)
                        return 'Пароль должен быть не менее 6 символов';
                    return null;
                }}
            />
            <Input
                isRequired
                name='confirmPassword'
                placeholder='Подтвердите пароль'
                type='confirmPassword'
                value={formData.confirmPassword}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                    });
                }}
                validate={(value) => {
                    if (!value) return 'Пароль для подтверждения обязателен';
                    if (value !== formData.password)
                        return 'Пароли не совпадают';
                    return null;
                }}
            />
            <div className='mt-6'>
                <Button variant='light' onPress={onClose}>
                    Отмена
                </Button>
                <Button color='primary' type='submit'>
                    Зарегистрироваться
                </Button>
            </div>
        </Form>
    );
};

export default RegistrationForm;
