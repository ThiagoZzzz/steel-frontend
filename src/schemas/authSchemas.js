import { z } from 'zod';

const nameValidator = z.string({
  required_error: 'Name is required'
})
  .min(1, { message: 'Name is required' })
  .regex(/^[a-zA-Z]+$/, {
    message: 'Name only can contain letters'
  });

const lastNameValidator = z.string({
  required_error: 'Last name is required'
})
  .min(1, { message: 'Last name is required' })
  .regex(/^[a-zA-Z]+$/, {
    message: 'Last name only can contain letters'
  });

const emailValidator = z.email({ error: 'Send a valid email' });

const passwordValidator = z.string({
  required_error: 'Password is required'
})
  .min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Password must contain at least one special character (ex. !@#$%^&*)'
  });

// esquema base, definiciones de tipos
const baseUserSchema = z.object({
  name: nameValidator,
  lastName: lastNameValidator,
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: z.string({ required_error: 'You must confirm your password' })
});

export const loginSchema = z.object({
  email: z.email({ required_error: 'Email is required' }).min(1, { message: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password is required' })
});

// aplicamos el refine, matchear contraseñas
export const registerSchema = baseUserSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

// profile update 
export const profileUpdateSchema = z.object({
  name: nameValidator,
  lastName: lastNameValidator
});

// profile->password update
export const passwordUpdateSchema = z.object({
  currentPassword: passwordValidator,
  newPassword: passwordValidator,
  confirmNewPassword: z.string({ required_error: 'You must confirm your password' })
}).refine(
  (data) => data.newPassword !== data.currentPassword,
  {
    message: "New password must be different from current password",
    path: ["newPassword"],
  }
).refine(
  (data) => data.newPassword === data.confirmNewPassword,
  {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  }
);