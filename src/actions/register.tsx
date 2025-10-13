'use server';

import { IFormData } from '@/types/form-data';
import { saltAndHashPassword } from '@/utils/password';
import { prisma } from '@/utils/prisma';

export const registerUser = async (formData: IFormData) => {
    const { email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
        return { error: 'Пароли не совпадают' };
    }
    if (password.length < 6) {
        return { error: 'Пароль должен быть не менее 6 символов' };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return { error: 'Пользователь с таким email уже существует' };
        }

        const pwHash = await saltAndHashPassword(password);
        const user = await prisma.user.create({
            data: {
                email: email,
                password: pwHash,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        return { error: 'Ошибка регистрации' };
    }
};
