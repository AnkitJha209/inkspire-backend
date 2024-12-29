import express from "express";
import { authorization, isUser } from "../middlewares/authMiddleware.js";
import { dislikeBlog, getAllLikes, likeBlog } from "../controllers/likeController.js";

export const likeRouter = express.Router();

likeRouter.get('/like/getAllLikes', getAllLikes);
likeRouter.post('/like/createLike', authorization, isUser, likeBlog)
likeRouter.delete('/like/deleteLike', authorization, isUser, dislikeBlog)