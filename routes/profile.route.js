import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { updateProfilePic } from "../controllers/authController.js";

export const profileRouter = express.Router();

profileRouter.get('/profile/getProfile', getProfile);
profileRouter.post('/profile/updateProfile', updateProfile);
profileRouter.put('/profile/updateProfilePic', updateProfilePic);