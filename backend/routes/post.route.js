import express from 'express';
import { createPost, getPostById, getPosts, getPostsByUser, deletePost, updatePost, commentPost, replyComment, likePost } from '../controllers/post.controller.js';
import { checkAuthMiddleware } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);

router.post('/', verifyToken, checkAuthMiddleware, createPost);
router.put('/:id', verifyToken, checkAuthMiddleware, updatePost);
router.delete('/:id', verifyToken, checkAuthMiddleware, deletePost);

router.post('/:id/comments', verifyToken, checkAuthMiddleware, commentPost);
router.post('/:id/comments/:commentId/replies', verifyToken, checkAuthMiddleware, replyComment);
router.post('/:id/like', verifyToken, checkAuthMiddleware, likePost);

router.get('/user/:userId', verifyToken, checkAuthMiddleware, getPostsByUser);

export default router;
