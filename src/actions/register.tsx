'use server';

import { IFormData } from '@/types/form-data';
import { prisma } from '@/utils/prisma';

export const registerUser = async (formData: IFormData) => {
    const { email, password } = formData;

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        return { error: 'Ошибка регистрации' };
    }
};
