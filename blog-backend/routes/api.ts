import express from 'express';
import { router as usersRouter } from './users';
import { router as postsRouter } from './posts';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    navigation: 'From /api you can get to the following paths',
    paths: ['/users', '/posts', 'posts/comments'],
  });
});
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
