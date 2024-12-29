import express from 'express';
import { logIn, sendOtp, signUp } from '../controllers/authController.js';

export const authRouter = express.Router();

authRouter.post('/auth/signup', signUp);
authRouter.post('/auth/login', logIn);
authRouter.post('/auth/otp', sendOtp);