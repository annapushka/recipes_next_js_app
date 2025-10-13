import { prisma } from './prisma';

export const getUserFromDb = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });
    return user;
};
