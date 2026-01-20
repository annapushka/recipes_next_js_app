'use client';

import RecipeForm from '@/forms/recipe.form';
import { useRecipeStore } from '@/store/recipe.store';
import { IRecipe } from '@/types/recipe';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditRecipePage = () => {
    const { id } = useParams();
    const { recipes, isLoading, error } = useRecipeStore();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [hasSearch, setHasSearched] = useState(false);

    useEffect(() => {
        if (recipes.length > 0 || error) {
            const foundRecipe = recipes.find((r) => r.id === id) || null;
            setRecipe(foundRecipe);
            setHasSearched(true);
        }
    }, [recipes, id, hasSearch, error]);

    if (isLoading) return <p className='text-center'>Загрузка...</p>;

    if (error) return <p className='text-red-500 text-center'>{error}</p>;

    if (hasSearch && !recipe)
        return <p className='text-red-500 text-center'>Рецепт не найден</p>;

    if (recipe)
        return (
            <div className='container mx-auto p-4'>
                <h1 className='text-2xl font-bold mb-4'>
                    Редактирование рецепта: {recipe.name}
                </h1>
                <RecipeForm initialRecipe={recipe} />
            </div>
        );

    return <p className='text-center'>Загрузка...</p>;
};

export default EditRecipePage;
