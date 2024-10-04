import express from 'express';
import {
  comment_create,
  comment_update,
  comment_delete,
  comment_detail,
} from '../controllers/commentController';
import passport from 'passport';
export const router = express.Router({ mergeParams: true });

router.route('/').post(comment_create);
router
  .route('/:commentId')
  .get(comment_detail)
  .put(passport.authenticate('jwt', { session: false }), comment_update)
  .delete(passport.authenticate('jwt', { session: false }), comment_delete);
