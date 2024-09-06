import express from 'express';
import { user_sign_up, user_log_in } from '../controllers/userController';
export const router = express.Router({ mergeParams: true });

router.post('/signup', user_sign_up);
router.post('/login', user_log_in);
