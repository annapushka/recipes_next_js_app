'use client';

import { UNIT_ABBREVIATIONS } from '@/constants/select-options';
import { useRecipeStore } from '@/store/recipe.store';
import { IRecipe } from '@/types/recipe';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useTransition } from 'react';

interface RecipeCardProps {
    recipe: IRecipe;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
    const { removeRecipe } = useRecipeStore();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await removeRecipe(recipe.id);
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        });
    };

    const getUnitLabel = (unit: string) => {
        const unitOption = UNIT_ABBREVIATIONS.find((u) => u.value === unit);
        return unitOption ? unitOption.label : unit.toLocaleLowerCase();
    };
    return (
        <Card className='w-full max-w-md h-[480px] flex flex-col'>
            <div className='h-48 overflow-hidden'>
                {recipe?.imageUrl ? (
                    <Image
                        src={recipe.imageUrl}
                        alt='image for recipe'
                        fill
                        className='object-cover transition-transform duration-300'
                    />
                ) : (
                    <div className='bg-gray-200 border-2 w-full h-full flex items-center justify-center'>
                        <span className='text-gray-500'>Нет изобравжения</span>
                    </div>
                )}
            </div>
            <CardHeader className='flex jusify-between items-center text-black'>
                <h2 className='text-xl font-bold'>{recipe.name}</h2>
            </CardHeader>
            <CardBody className='flex-1 text-black'>
                <p className='text-gray-600 line-clamp-6'>
                    {recipe.description || 'без описания'}
                </p>
                <h3 className='mt-4 font-semibol'>Ингредиенты: </h3>
                <ul className='list-disc pl-5 overflow-y-auto max-h-24'>
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.ingredient.name}: {ingredient.quantity}{' '}
                            {getUnitLabel(ingredient.ingredient.unit)}
                        </li>
                    ))}
                </ul>
            </CardBody>
            <div className='flex justify-end gap-2 p-4'>
                <Link href={`/recipes/${recipe.id}`}>
                    <Button color='primary' variant='light'>
                        Редактировать
                    </Button>
                </Link>
                <Button
                    color='danger'
                    variant='light'
                    onPress={handleDelete}
                    isLoading={isPending}
                >
                    Удалить
                </Button>
            </div>
        </Card>
    );
};

export default RecipeCard;
