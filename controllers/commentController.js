import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";

export const createComment = async (req, res) => {
    try {
        const { blogId, userId, comment} = req.body
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.status(404).json({
                success: false,
                msg: 'Blog not found'
            })
        }
        const newComment = await Comment.create({
            blogId,
            userId,
            comment
        })
        blog.comments.push(newComment._id)
        await blog.save()
        return res.status(200).json({
            success: true,
            msg: 'Comment Created'
        })    
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({
            success: false,
            msg: "Could not Create the comment",
        });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const {blogId} = req.body
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.status(404).json({
                success: false,
                msg: 'Blog not found'
            })
        }
        const comments = await Comment.find({blogId}).populate('userId').exec()
        if(!comments){
            return res.status(404).json({
                success: false,
                msg: 'Comments not found'
            })
        }
        return res.status(200).json({
            success: true,
            comments
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({
            success: false,
            msg: "Could not get the comments",
        })
    }
}

export const deleteComment = async (req, res) => {
    try{
        const { commentId, userId } = req.body
        const comment = await Comment.findById(commentId)
        if(!comment){
            return res.status(404).json({
                success: false,
                msg: 'Comment not found'
            })
        }
        if(comment.userId !== userId){
            return res.status(400).json({
                success: false,
                msg: 'Unauthorized'
            })
        }
        await Comment.findByIdAndDelete(commentId)
        return res.status(200).json({
            success: true,
            msg: 'Comment deleted'
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            success: false,
            msg: 'Failed to delete comment'
        })
    }
}

export const updateComment = async (req, res) => {
    try {
        const {commentId, userId, newComment} = req.body
        const comment = await Comment.findById(commentId)
        if(!comment){
            return res.status(404).json({
                success: false,
                msg: 'Comment not found'
            })
        }
        if(comment.userId !== userId){
            return res.status(400).json({
                success: false,
                msg: 'Unauthorized'
            })
        }

        await Comment.findByIdAndUpdate(commentId, {comment: newComment} , {new: true})
        return res.status(200).json({
            success: true,
            msg: 'Comment updated'
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({
            success: false,
            msg: "Could not update the comment",
        });
    }
}