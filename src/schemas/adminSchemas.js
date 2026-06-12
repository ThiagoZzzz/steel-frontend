import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    price: z.coerce.number().min(0, 'Price must be 0 or greater'),
    stock: z.preprocess(
        (val) => (val === '' || val === null || val === undefined ? undefined : val),
        z.coerce.number().min(0, 'Stock must be 0 or greater').optional(),
    ),
    description: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val),
        z.string().min(10, 'Description must be at least 10 characters').nullish(),
    ),
    category: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val),
        z.string().min(3, 'Category must be at least 3 characters').nullish(),
    ),
    image: z.any().optional(),
});

// todos los campos son opcionales
export const updateProductSchema = productSchema.partial();

export const updateOrderSchema = z.object({
    state: z.enum(['pending', 'ready', 'cancel'], {
        errorMap: () => ({ message: "Status must be 'pending', 'ready' or 'cancel'" })
    }),
    billing_details: z.object({
        name: z.string().min(1, 'Name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.email('Invalid email address'),
        phone: z.string().min(1, 'Phone is required'),
        address: z.string().min(1, 'Address is required'),
        city: z.string().min(1, 'City is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
    })
});
