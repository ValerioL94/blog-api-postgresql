import { z } from 'zod';
import { prisma } from '../prisma/client';

export const UserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'Username must contain at least 3 characters'),
    email: z
      .string()
      .email()
      .refine(
        async (value) =>
          (await prisma.user.findUnique({ where: { email: value } })) === null,
        { message: 'Email already in use' }
      ),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
      ),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });
