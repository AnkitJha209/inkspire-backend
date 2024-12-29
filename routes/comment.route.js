import express from "express";
import { createComment, deleteComment, getAllComments, updateComment } from "../controllers/commentController.js";
import { authorization, isUser } from "../middlewares/authMiddleware.js";

export const commentRouter = express.Router();

commentRouter.post('/comment/createComment', authorization, isUser, createComment)
commentRouter.put('/comment/updateComment', authorization, isUser, updateComment)
commentRouter.delete('/comment/deleteComment', authorization, isUser, deleteComment)
commentRouter.get('/comment/getAllComments', getAllComments)

