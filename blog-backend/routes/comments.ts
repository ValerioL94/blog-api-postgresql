import express from 'express';

export const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.json({ Comments: 'Comments go here' });
});
