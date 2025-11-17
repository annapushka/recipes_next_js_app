'use server';

import { signIn } from '@/auth/auth';

export const signInWithCredentials = async (
    email: string,
    password: string
) => {
    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        return;
    } catch (error) {
        console.error('Ошибка авторизации:', error);
    }
};
