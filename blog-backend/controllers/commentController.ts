import asyncHandler from 'express-async-handler';
import { ICommentUpsertRequest } from '../types/types';
import { CommentSchema } from '../utils/zodSchema';
import { fromZodError } from 'zod-validation-error';
import { prisma } from '../prisma/client';

export const comment_create = asyncHandler(async (req, res, next) => {
  const { body }: ICommentUpsertRequest = req;
  const results = await CommentSchema.safeParseAsync(body);
  if (!results.success) {
    const errors = fromZodError(results.error).details;
    res.json({ errors });
  } else {
    const parsedData = results.data;
    const comment = await prisma.comment.create({
      data: { ...parsedData, postId: req.params.postId },
    });
    res.json({ comment, message: 'Comment created successfully' });
  }
});

export const comment_update = asyncHandler(async (req, res, next) => {
  const { body }: ICommentUpsertRequest = req;
  const results = await CommentSchema.safeParseAsync(body);
  if (!results.success) {
    const errors = fromZodError(results.error).details;
    res.json({ errors });
  } else {
    const parsedData = results.data;
    await prisma.comment.update({
      where: { id: req.params.commentId },
      data: parsedData,
    });
  }
  res.json({ message: 'Comment updated successfully' });
});

export const comment_delete = asyncHandler(async (req, res, next) => {
  await prisma.comment.delete({ where: { id: req.params.commentId } });
  res.json({ message: 'Comment deleted successfully' });
});
