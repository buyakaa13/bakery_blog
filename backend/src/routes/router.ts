import { Router } from "express";
import { delete_comment, delete_post, export_post, get_comments, get_posts, post_comment, post_post, search_post, update_post } from "../controller/post_controller";

const router = Router();

router.get('/', get_posts);
router.post('/', post_post);
router.patch('/:id', update_post);
router.delete('/:id', delete_post);

router.get('/:id/comments', get_comments);
router.post('/:id/comments', post_comment);
router.delete('/:id/comments/:id', delete_comment);

router.get('/search', search_post);
router.get('/export', export_post);

export default router;