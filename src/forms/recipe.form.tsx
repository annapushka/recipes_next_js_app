import { useIngredientStore } from '@/store/ingredient.store';
import { useRecipeStore } from '@/store/recipe.store';
import { IRecipe } from '@/types/recipe';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/react';
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

    return (
        <Form className='w-[450px]' action={handleSubmit}>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <Input
                isRequired
                name='name'
                placeholder='Введите название рецепта'
                type='text'
                value={formData.name}
                classNames={{
                    innerWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                validate={(value) => (!value ? 'Название обязательно' : null)}
            />
            <Input
                name='description'
                placeholder='Описание рецепта (необязательное)'
                type='text'
                value={formData.description}
                classNames={{
                    innerWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
            />
            <Input
                name='imageUrl'
                placeholder='URL изображения (необязательное)'
                type='text'
                value={formData.imageUrl}
                classNames={{
                    innerWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                }
            />
            <div className='space-y-2 w-full'>
                {ingredientFields.map((field, index) => (
                    <div key={field.id} className='flex gap-2 items-center'>
                        <Select
                            isRequired
                            name={`ingredient_${index}`}
                            placeholder='Выберите ингредиент'
                            selectedKeys={
                                field.ingredientId ? [field.ingredientId] : []
                            }
                            classNames={{
                                trigger: 'bg-default-100 w-full',
                                innerWrapper: 'text-sm',
                                value: 'truncate',
                                selectorIcon: 'text-black',
                            }}
                            onChange={(e) =>
                                handleIngredientChange(
                                    field.id,
                                    'ingredientId',
                                    e.target.value,
                                )
                            }
                        >
                            {ingredients.map((ingredient) => (
                                <SelectItem
                                    key={ingredient.id}
                                    className='text-black'
                                >
                                    {ingredient.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                ))}
            </div>
        </Form>
    );
};
