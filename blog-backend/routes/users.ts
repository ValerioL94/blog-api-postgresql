import express from 'express';
import { log_in, sign_up } from '../controllers/usersController';
export const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.json({ Users: 'Users go here' });
});

router.post('/login', log_in);
router.post('/signup', sign_up);
