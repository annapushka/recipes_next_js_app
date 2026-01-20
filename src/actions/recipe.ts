'use server';

import { prisma } from '@/utils/prisma';

export const getRecipes = async () => {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        const transformedRecipes = recipes.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            imageUrl: recipe.imageUrl,
            ingredients: recipe.recipeIngredients.map((ri) => ({
                id: ri.id,
                ingredientId: ri.ingredientId,
                quantity: ri.quantity,
                ingredient: ri.ingredient,
            })),
        }));

        return { success: true, recipes: transformedRecipes };
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return { success: false, error: 'Failed to fetch recipes' };
    }
};

export const createRecipe = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imageUrl = formData.get('imageUrl') as string | null;
        const ingredients = Array.from(formData.entries())
            .filter(([key]) => key.startsWith('ingredient_'))
            .map(([key, value]) => ({
                ingredientId: value as string,
                quantity: parseFloat(
                    formData.get(`quantity_${key.split('_')[1]}`) as string,
                ),
            }));
        if (!name || !ingredients.length) {
            return { success: false, error: 'Missing required fields' };
        }
        const recipe = await prisma.recipe.create({
            data: {
                name,
                description,
                imageUrl,
                recipeIngredients: {
                    create: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.ingredientId,
                        quantity: ingredient.quantity,
                    })),
                },
            },
            include: {
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        const transformedRecipe = {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            imageUrl: recipe.imageUrl,
            ingredients: recipe.recipeIngredients.map((ri) => ({
                id: ri.id,
                ingredientId: ri.ingredientId,
                quantity: ri.quantity,
                ingredient: ri.ingredient,
            })),
        };

        return { success: true, recipe: transformedRecipe };
    } catch (error) {
        console.error('Error create recipe:', error);
        return { success: false, error: 'Error create recipe' };
    }
};

export const updateRecipe = async (id: string, formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imageUrl = formData.get('imageUrl') as string | null;
        const ingredients = Array.from(formData.entries())
            .filter(([key]) => key.startsWith('ingredient_'))
            .map(([key, value]) => ({
                ingredientId: value as string,
                quantity: parseFloat(
                    formData.get(`quantity_${key.split('_')[1]}`) as string,
                ),
            }));
        if (!name || !ingredients.length) {
            return { success: false, error: 'Missing required fields' };
        }
        const recipe = await prisma.recipe.update({
            where: { id },
            data: {
                name,
                description,
                imageUrl,
                recipeIngredients: {
                    deleteMany: {},
                    create: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.ingredientId,
                        quantity: ingredient.quantity,
                    })),
                },
            },
            include: {
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        const transformedRecipe = {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            imageUrl: recipe.imageUrl,
            ingredients: recipe.recipeIngredients.map((ri) => ({
                id: ri.id,
                ingredientId: ri.ingredientId,
                quantity: ri.quantity,
                ingredient: ri.ingredient,
            })),
        };

        return { success: true, recipe: transformedRecipe };
    } catch (error) {
        console.error('Error update recipe:', error);
        return { success: false, error: 'Error update recipe' };
    }
};

export const deleteRecipe = async (id: string) => {
    try {
        await prisma.recipeIngredient.deleteMany({
            where: { recipeId: id },
        });
        await prisma.recipe.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error('Error delete recipe:', error);
        return { success: false, error: 'Error delete recipe' };
    }
};
