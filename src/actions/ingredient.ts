'use server';

import { ingredientSchema } from '@/schema/zod';
import { prisma } from '@/utils/prisma';

export const createIngredient = async (formData: FormData) => {
    try {
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            unit: formData.get('unit') as string,
            pricePerUnit: formData.get('pricePerUnit')
                ? parseFloat(formData.get('pricePerUnit') as string)
                : null,
            description: formData.get('description') as string,
        };
        const validateData = ingredientSchema.parse(data);

        const ingredient = await prisma.ingredient.create({
            data: {
                name: validateData.name,
                category: validateData.category,
                unit: validateData.unit,
                pricePerUnit: validateData.pricePerUnit,
                description: validateData.description,
            },
        });
        return { success: true, ingredient };
    } catch (error) {
        console.error(error);
        return { error: 'Ошибка создания ингредиента' };
    }
};

export const getIngredients = async () => {
    try {
        const ingredients = await prisma.ingredient.findMany();
        return { success: true, ingredients };
    } catch (error) {
        console.error(error);
        return { error: 'Ошибка получения ингредиентов' };
    }
};

export const deleteIngredient = async (id: string) => {
    try {
        const ingredient = await prisma.ingredient.delete({
            where: { id },
        });
        return { success: true, ingredient };
    } catch (error) {
        console.error(error);
        return { error: 'Ошибка удаления ингредиента' };
    }
};
