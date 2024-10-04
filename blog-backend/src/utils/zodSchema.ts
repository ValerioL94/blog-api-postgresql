import { z } from 'zod';
import { prisma } from '../prisma/client';

const author_key = process.env.AUTHOR_KEY;
export const UserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'Username must contain at least 3 characters'),
    email: z
      .string()
      .trim()
      .email()
      .refine(
        async (value) =>
          (await prisma.user.findUnique({ where: { email: value } })) === null,
        { message: 'Email already in use' }
      ),
    password: z
      .string()
      .trim()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
      ),
    confirm: z.string().trim(),
    authorKey: z
      .string()
      .trim()
      .refine((value) => value === author_key, 'Invalid author key'),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export const PostSchemaPost = z.object({
  title: z.string().trim().min(3, 'Title must contain at least 3 characters'),
  content: z
    .string()
    .trim()
    .min(100, 'Content must contain at least 50 characters')
    .max(10000, 'Content must contain no more than 10000 characters'),
  published: z
    .string()
    .refine((value) => value === 'true' || value === 'false', {
      message: 'Value must be a boolean',
    })
    .transform((value) => value === 'true'),
  authorId: z.string(),
});
export const PostSchemaUpdate = PostSchemaPost.omit({ authorId: true });

export const CommentSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must contain at least 3 characters'),
  content: z
    .string()
    .trim()
    .min(10, 'Content must contain at least 10 characters'),
});
