import { fromZodError } from 'zod-validation-error';
import asyncHandler from 'express-async-handler';
import { UserSchema } from '../utils/zodSchema';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma/client';
import jwt from 'jsonwebtoken';

export const user_sign_up = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const results = await UserSchema.safeParseAsync(body);
  if (!results.success) {
    const errors = fromZodError(results.error).details;
    res.json({ errors: errors });
  } else {
    const data = results.data;
    bcrypt.hash(data.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        await prisma.user.create({
          data: {
            username: data.username,
            email: data.email,
            password: hashedPassword,
          },
        });
        return res.json({ message: 'Sign-up successful' });
      }
    });
  }
});

export const user_log_in = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    res.json({ errors: 'Email not found' });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({ errors: 'Wrong password' });
    } else {
      const JWT_SECRET = process.env.SECRET!;
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: 600 });
      res.json({
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    }
  }
});
