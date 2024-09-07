import express from 'express';
import { router as commentRouter } from './comment.ts';
import {
  post_list,
  post_detail,
  post_create,
  post_update,
  post_delete,
} from '../controllers/postController.ts';

export const router = express.Router({ mergeParams: true });

router.get('/', post_list);
router
  .route('/:postId')
  .get(post_detail)
  .post(post_create)
  .put(post_update)
  .delete(post_delete);

router.use('/comments', commentRouter);
