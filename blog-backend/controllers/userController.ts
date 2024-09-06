import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';

export const user_log_in = asyncHandler(async (req, res, next) => {
  res.json({ message: 'wip' });
});
export const user_sign_up = [
  body(),
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'wip' });
  }),
];
