import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';

export const log_in = asyncHandler(async (req, res, next) => {
  res.json({ message: 'wip' });
});
export const sign_up = [
  body(),
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'wip' });
  }),
];
