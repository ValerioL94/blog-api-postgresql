import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';

export const comment_list = asyncHandler(async (req, res, next) => {
  res.json({ message: 'all comments' });
});

export const comment_create = [
  body(),
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'create comment' });
  }),
];

export const comment_detail = asyncHandler(async (req, res, next) => {
  res.json({ message: 'single comment' });
});

export const comment_update = [
  body(),
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'update comment' });
  }),
];

export const comment_delete = asyncHandler(async (req, res, next) => {
  res.json({ message: 'delete comment' });
});
