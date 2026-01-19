import { useIngredientStore } from '@/store/ingredient.store';
import { useRecipeStore } from '@/store/recipe.store';
import { IRecipe } from '@/types/recipe';
import { useRouter } from 'next/router';
import { useState, useTransition } from 'react';

interface RecipeFormProps {
    initialRecipe?: IRecipe;
}

interface IIngredientField {
    id: number;
    ingredientId: string;
    quantity: number | null;
}
const initialState = {
    name: '',
    description: '',
    imageUrl: '',
};

const RecipeForm = ({ initialRecipe }: RecipeFormProps) => {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: initialRecipe?.name || initialState.name,
        description: initialRecipe?.description || initialState.description,
        imageUrl: initialRecipe?.imageUrl || initialState.imageUrl,
    });
    const [ingredientFields, setIngredientFields] = useState<
        IIngredientField[]
    >(
        initialRecipe?.ingredients.map((ing, index) => ({
            id: index,
            ingredientId: ing.ingredientId,
            quantity: ing.quantity,
        })) || [
            {
                id: 0,
                ingredientId: '',
                quantity: null,
            },
        ],
    );

    const { ingredients } = useIngredientStore();
    const { addRecipe, updateRecipe } = useRecipeStore();
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleAddIngredientField = () => {
        if (ingredientFields.length >= 10) return;

        setIngredientFields([
            ...ingredientFields,
            {
                id: ingredientFields.length,
                ingredientId: '',
                quantity: null,
            },
        ]);
    };

    const handleRemoveIngredientField = (id: number) => {
        if (ingredientFields.length > 1) {
            setIngredientFields(
                ingredientFields.filter((field) => field.id !== id),
            );
        }
    };

    const handleIngredientChange = (
        id: number,
        field: keyof IIngredientField,
        value: string | number | null,
    ) => {
        setIngredientFields(
            ingredientFields.map((fieldItem) =>
                fieldItem.id === id
                    ? { ...fieldItem, [field]: value }
                    : fieldItem,
            ),
        );
    };

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            setError(null);
            const result = initialRecipe
                ? await updateRecipe(initialRecipe.id, formData)
                : await addRecipe(formData);

            if (result.success) {
                setIngredientFields([
                    {
                        id: 0,
                        ingredientId: '',
                        quantity: null,
                    },
                ]);
                router.push('/');
                setFormData(initialState);
            } else {
                setError(result.error || 'Ошибка при сохранении рецепта');
            }
        });
    };
};
