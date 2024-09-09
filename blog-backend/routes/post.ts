import express from 'express';
import { router as commentRouter } from './comment';
import {
  post_list,
  post_detail,
  post_create,
  post_update,
  post_delete,
} from '../controllers/postController';
// import passport from 'passport';

export const router = express.Router({ mergeParams: true });

router.route('/').get(post_list).post(post_create);
router.route('/:postId').get(post_detail).put(post_update).delete(post_delete);

router.use('/comments', commentRouter);

// router.get(
//   '/authOnly',
//   passport.authenticate('jwt', { session: false }),
//   function (req, res) {
//     res.json({ message: 'You are correctly logged in.' });
//   }
// );
