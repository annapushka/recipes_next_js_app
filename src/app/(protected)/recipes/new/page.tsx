'use client';

import RecipeForm from '@/forms/recipe.form';

const NewRecipePage = () => {
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Создание нового рецепта</h1>
            <RecipeForm />
        </div>
    );
};

export default NewRecipePage;
