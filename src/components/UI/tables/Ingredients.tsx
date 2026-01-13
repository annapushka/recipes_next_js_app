'use client';

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';
import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';

const IngredientsTable = () => {
    const { ingredients, removeIngredient, isLoading } = useIngredientStore();
    const { isAuth } = useAuthStore();

    const handleDelete = async (id: string) => {
        await removeIngredient(id);
    };
    const getCategoryLabel = (category: string) => {
        const option = CATEGORY_OPTIONS.find((opt) => opt.value === category);
        return option ? option.label : category;
    };

    const getUnitLabel = (unit: string) => {
        const option = UNIT_OPTIONS.find((opt) => opt.value === unit);
        return option ? option.label : unit;
    };

    if (!isAuth) {
        return <p className='mt-4'>Авторизуйтесь, чтобы увидеть ингредиенты</p>;
    }

    return !isLoading ? (
        <Table
            aria-label='Список ингридиентов'
            classNames={{
                wrapper: 'mt-4',
                table: 'w-full',
                th: 'text-black',
                td: 'text-black',
            }}
        >
            <TableHeader>
                <TableColumn>Название</TableColumn>
                <TableColumn>Категория</TableColumn>
                <TableColumn>Ед. изм.</TableColumn>
                <TableColumn>Цена за единицу</TableColumn>
                <TableColumn>Описание</TableColumn>
                <TableColumn>Действия</TableColumn>
            </TableHeader>
            <TableBody>
                {ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>
                            {getCategoryLabel(ingredient.category)}
                        </TableCell>
                        <TableCell>{getUnitLabel(ingredient.unit)}</TableCell>
                        <TableCell>
                            {ingredient.pricePerUnit !== null
                                ? `${ingredient.pricePerUnit} ₽`
                                : '-'}
                        </TableCell>
                        <TableCell>{ingredient.description || '-'}</TableCell>
                        <TableCell>
                            {isAuth && (
                                <Button
                                    color='danger'
                                    size='sm'
                                    onPress={() => handleDelete(ingredient.id)}
                                >
                                    Удалить
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ) : (
        <p className='mt-4'>Загрузка...</p>
    );
};

export default IngredientsTable;
