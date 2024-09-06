import express from 'express';
import {
  comment_list,
  comment_detail,
  comment_create,
  comment_update,
  comment_delete,
} from '../controllers/commentController';
export const router = express.Router({ mergeParams: true });

router.get('/', comment_list);
router
  .route('/:commentId')
  .get(comment_detail)
  .post(comment_create)
  .put(comment_update)
  .delete(comment_delete);
