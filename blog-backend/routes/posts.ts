import express from 'express';
import { router as commentsRouter } from './comments';
export const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.json({ Posts: 'Posts go here' });
});

router.use('/comments', commentsRouter);
