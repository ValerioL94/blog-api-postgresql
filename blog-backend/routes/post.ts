import express from 'express';
import { router as commentRouter } from './comment';
import {
  post_list,
  post_detail,
  post_create,
  post_update,
  post_delete,
} from '../controllers/postController';
import passport from 'passport';

export const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(post_list)
  .post(passport.authenticate('jwt', { session: false }), post_create);
router
  .route('/:postId')
  .get(post_detail)
  .put(passport.authenticate('jwt', { session: false }), post_update)
  .delete(passport.authenticate('jwt', { session: false }), post_delete);

router.use('/:postId/comments', commentRouter);
