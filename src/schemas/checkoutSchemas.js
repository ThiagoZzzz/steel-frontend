import { z } from 'zod';

export const billingDetailsSchema = z.object({
    name: z.string({ required_error: 'Name is required' })
        .min(3, 'Name must be at least 3 characters'),
    lastName: z.string({ required_error: 'Last name is required' })
        .min(3, 'Last name must be at least 3 characters'),
    email: z.email({ required_error: 'Email is required' }),
    phone: z.string({ required_error: 'Phone is required' })
        .regex(/^[0-9]{10}$/, 'Phone must be at least 10 numbers, including area code'),
    address: z.string({ required_error: 'Address is required' })
        .min(3, 'Address must be at least 3 characters'),
    city: z.string({ required_error: 'City is required' })
        .min(3, 'City must be at least 3 characters'),
    postalCode: z.string({ required_error: 'Postal code is required' })
        .min(3, 'Postal code must be at least 3 characters'),
    paymentMethod: z.enum(['cash', 'card', 'virtual_wallet'], {
        errorMap: () => ({ message: "Please select a payment method" })
    })
});