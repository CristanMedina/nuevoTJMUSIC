import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { checkAuthMiddleware } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/createPost', verifyToken, checkAuthMiddleware, createPost);

export default router;
