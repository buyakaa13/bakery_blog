import { Router } from "express";
import { delete_comment, delete_post, get_posts, post_comment, post_post, update_post } from "./controller/post_controller";
import { get_comments } from "./services/fileService";

const post_router = Router();

post_router.get('/', get_posts);
post_router.post('/', post_post);
post_router.patch('/:id', update_post);
post_router.delete('/:id', delete_post);

post_router.get('/:id/comments', get_comments);
post_router.post('/:id/comments', post_comment);
post_router.delete('/:id/comments', delete_comment);

post_router.get('/search', search_post);
post_router.get('/export', export_post);

export default post_router;