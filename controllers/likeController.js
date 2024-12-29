import { Blog } from '../models/blog.model.js';
import {Like} from '../models/like.model.js';

export const likeBlog = async (req, res) => {
    try{
        const {blogId, userId} = req.body
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.status(404).json({
                success: false,
                msg: 'Blog not found'
            })
        }
        const like = await Like.findOne({blog: blogId, user: userId})
        if(like){
            return res.status(400).json({
                success: false,
                msg: 'Blog already liked'
            })
        }
        const newLike = await Like.create({
            blog: blogId,
            user: userId
        })
        blog.like.push(newLike._id)
        await blog.save()
        return res.status(200).json({
            success: true,
            msg: 'Blog liked'
        })

    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            success: false,
            msg: 'Failed to like blog'
        })
    }
}

export const dislikeBlog = async (req, res) => {
    try {
        const { blogId, userId} = req.body
        const blog = await Blog.findById(blogId)
        if(blog){
            return res.status(404).json({
                success: false,
                msg: 'Blog not found'
            })
        }
        const like  =await Like.findOne({blog: blogId, user: userId})
        if(!like){
            return res.status(400).json({
                success: false,
                msg: 'Blog not liked'
            })
        }
        await Like.findByIdAndDelete(like._id)
        blog.like = blog.like.filter(l => l._id !== like._id)
        await blog.save()
        return res.status(200).json({
            success: true,
            msg: 'Blog disliked'
        })
    } catch (error) {
        console.error(error.message)
        return res.status(400).json({
            success: false,
            msg: 'Failed to dislike blog'
        })
    }
}

export const getAllLikes = async (req, res) => {
    try {
        const {blogId} = req.body
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.status(404).json({
                success: false,
                msg: 'Blog not found'
            })
        }
        const likes = await Like.find({blog: blogId}).populate('user').exec()
        if(!likes){
            return res.status(404).json({
                success: false,
                msg: 'Likes not found'
            })
        }
        return res.status(200).json({
            success: true,
            likes
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({
            success: false,
            msg: "Could not get the likes",
        })
    }
}