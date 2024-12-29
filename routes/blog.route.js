import express from "express";
import { createBlog, deleteBlog, getABlog, getAllBlogs, getBlogsByUser, updateBlog } from "../controllers/blogController.js";
import { authorization, isUser } from "../middlewares/authMiddleware.js";

export const blogRouter = express.Router();

blogRouter.get('/blog/getAllBlogs', getAllBlogs);
blogRouter.get('/blog/getBlogsByUser/:userId', getBlogsByUser);
blogRouter.post('/blog/createBlog', authorization, isUser, createBlog)
blogRouter.put('/blog/updateBlog', authorization, isUser, updateBlog)
blogRouter.delete('/blog/deleteBlog', authorization, isUser, deleteBlog)
blogRouter.get('/blog/getABlog/:blogId', getABlog)