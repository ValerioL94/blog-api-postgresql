import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma/client';
import { IPostCreateRequest, IPostUpdateRequest } from '../types/types';
import { PostSchemaPost, PostSchemaUpdate } from '../utils/zodSchema';
import { fromZodError } from 'zod-validation-error';

export const post_list = asyncHandler(async (req, res, next) => {
  const posts = await prisma.post.findMany({
    include: { author: { select: { username: true, email: true } } },
    orderBy: { updatedAt: 'asc' },
  });
  res.json({ posts });
});

export const post_create = asyncHandler(async (req, res, next) => {
  const { body }: IPostCreateRequest = req;
  const results = await PostSchemaPost.safeParseAsync(body);
  if (!results.success) {
    const errors = fromZodError(results.error).details;
    res.json({ errors });
  } else {
    const parsedData = results.data;
    const post = await prisma.post.create({ data: parsedData });
    res.json({ post, message: 'Post created successfully' });
  }
});

export const post_detail = asyncHandler(async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.postId },
    include: {
      comments: { orderBy: { createdAt: 'desc' } },
      author: { select: { username: true, email: true } },
    },
  });
  res.json({ post });
});

export const post_update = asyncHandler(async (req, res, next) => {
  const { body }: IPostUpdateRequest = req;
  const results = await PostSchemaUpdate.safeParseAsync(body);
  if (!results.success) {
    const errors = fromZodError(results.error).details;
    res.json({ errors });
  } else {
    const parsedData = results.data;
    await prisma.post.update({
      where: { id: req.params.postId },
      data: parsedData,
    });
    res.json({ message: 'Post updated successfully' });
  }
});

export const post_delete = asyncHandler(async (req, res, next) => {
  await prisma.post.delete({ where: { id: req.params.postId } });
  res.json({ message: 'Post deleted successfully' });
});
