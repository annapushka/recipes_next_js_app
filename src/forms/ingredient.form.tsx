'use client';

import { createIngredient } from '@/actions/ingredient';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button, Select, SelectItem } from '@heroui/react';

const IngredientForm = () => {
    const handleSubmit = async (values: FormData) => {
        await createIngredient(values);
    };

    return (
        <Form className='w-[400px]' action={handleSubmit}>
            <Input
                isRequired
                name='name'
                placeholder='Введите название ингредиента'
                type='text'
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                validate={(value) => {
                    if (!value) return 'Название обязательно';
                    return null;
                }}
            />
            <div className='flex gap-2 w-full'>
                <div className='w-1/3'>
                    <Select
                        isRequired
                        name='category'
                        placeholder='Категория'
                        classNames={{
                            trigger: 'bg-default-100 w-full',
                            innerWrapper: 'text-sm',
                            value: 'truncate',
                            selectorIcon: 'text-black',
                        }}
                        validate={(value) => {
                            if (!value) return 'Категория обязательна';
                            return null;
                        }}
                    >
                        {CATEGORY_OPTIONS.map((option) => (
                            <SelectItem
                                key={option.value}
                                className='text-black'
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='w-1/3'>
                    <Select
                        isRequired
                        name='unit'
                        placeholder='Ед. изм.'
                        classNames={{
                            trigger: 'bg-default-100 w-full',
                            innerWrapper: 'text-sm',
                            value: 'truncate',
                            selectorIcon: 'text-black',
                        }}
                        validate={(value) => {
                            if (!value) return 'Ед. изм. обязательна';
                            return null;
                        }}
                    >
                        {UNIT_OPTIONS.map((option) => (
                            <SelectItem
                                key={option.value}
                                className='text-black'
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='w-1/3'>
                    <Input
                        isRequired
                        name='pricePerUnit'
                        placeholder='Цена'
                        type='number'
                        classNames={{
                            inputWrapper: 'bg-default-100',
                            input: 'text-sm focus:outline-none',
                        }}
                        endContent={
                            <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500'>
                                ₽
                            </span>
                        }
                        validate={(value) => {
                            if (!value) return 'Цена обязательна';
                            const num = parseFloat(value);
                            if (isNaN(num) || num < 0)
                                return 'Цена должна быть положительной';
                            return null;
                        }}
                    />
                </div>
            </div>

            <Input
                name='description'
                placeholder='Введите описание (необязательно)'
                type='text'
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
            />
            <div className='flex w-full items-center justify-end'>
                <Button color='primary' type='submit'>
                    Добавить ингредиент
                </Button>
            </div>
        </Form>
    );
};

export default IngredientForm;
