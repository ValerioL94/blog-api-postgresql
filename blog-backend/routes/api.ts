import express from 'express';
import { router as userRouter } from './user';
import { router as postRouter } from './post';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    navigation: 'From /api you can get to the following paths',
    paths: ['/users', '/posts', '/posts/comments'],
  });
});
router.use('/users', userRouter);
router.use('/posts', postRouter);
