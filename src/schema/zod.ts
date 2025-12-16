import { object, string, number } from 'zod';
import { z } from 'zod';

export const signInSchema = object({
    email: string({ message: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: string({ message: 'Password is required' })
        .min(1, 'Password is required')
        .min(6, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

export const ingredientSchema = object({
    name: string().min(1, 'Name is required'),
    category: z.enum([
        'VEGETABLES',
        'FRUITS',
        'MEAT',
        'DAIRY',
        'SPICES',
        'OTHER',
    ]),
    unit: z.enum(['GRAMS', 'KILOGRAMS', 'LITERS', 'MILLILITERS', 'PIECES']),
    pricePerUnit: number({ message: 'Price must be a number' })
        .min(0, 'Price must be a positive number')
        .nullable(),
    description: z.string().optional(),
});
