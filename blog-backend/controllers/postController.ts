import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';

export const post_list = asyncHandler(async (req, res, next) => {
  res.json({ message: 'all posts' });
});

export const post_create = [
  body(),
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'create post' });
  }),
];

export const post_detail = asyncHandler(async (req, res, next) => {
  res.json({ message: 'single post' });
});

export const post_update = [
  body(),
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'update post' });
  }),
];

export const post_delete = asyncHandler(async (req, res, next) => {
  res.json({ message: 'delete post' });
});
