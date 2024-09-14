import { fromZodError } from 'zod-validation-error';
import asyncHandler from 'express-async-handler';
import { UserSchema } from '../utils/zodSchema';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma/client';
import jwt from 'jsonwebtoken';
import { ISignupRequest, TLoginBody } from '../types/types';

export const user_sign_up = asyncHandler(async (req, res, next) => {
  const { body }: ISignupRequest = req;
  const results = await UserSchema.safeParseAsync(body);
  if (!results.success) {
    const errors = fromZodError(results.error).details;
    res.json({ errors });
  } else {
    const parsedData = results.data;
    bcrypt.hash(parsedData.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        await prisma.user.create({
          data: {
            username: parsedData.username,
            email: parsedData.email,
            password: hashedPassword,
          },
        });
        return res.json({ message: 'Sign-up successful' });
      }
    });
  }
});

export const user_log_in = asyncHandler(async (req, res, next) => {
  const { email, password }: TLoginBody = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    res.json({ errors: [{ message: 'Email not found' }] });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({ errors: [{ message: 'Wrong password' }] });
    } else {
      const JWT_SECRET = process.env.SECRET || 'randomSecret';
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 600 });
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    }
  }
});
