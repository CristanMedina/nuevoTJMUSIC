import express from "express";
import { logIn, logOut, signUp, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET
    router.get('/check-auth', verifyToken, checkAuth);

//  POST
    router.post('/signup', signUp);
    router.post('/login',logIn);
    router.post('/logout',logOut);

    router.post('/verify-email', verifyEmail);

    router.post('/forgot-password', forgotPassword);
    router.post('/reset-password/:token', resetPassword);

export default router;