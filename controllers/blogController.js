import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { uploadImgCloud } from "../utils/imageUploader.js";

export const createBlog = async (req, res) => {
  try {
    const { blogTitle, blogContent, user } = req.body;
    const blogImg = req.files.blogImg
    if (!blogTitle || !blogContent || user) {
      return res.status(402).json({
        success: false,
        msg: "Please fill all the details first",
      });
    }

    const userProfile = await User.findById(user);
    if (!userProfile) {
      console.log("No user found");
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }
    const blogImgUrl = await uploadImgCloud(blogImg, "InkSpire")

    const blog = await Blog.create({
      blogTitle,
      blogContent,
      blogImg:blogImgUrl.secure_url,
      user,
    }).populate("user");

    const updateProfile = await User.findByIdAndUpdate(user, {
      $push: { blogs: blog },
    });

    return res.status(200).json({
      success: true,
      msg: "Blog Created Successfully",
      blog,
      updateProfile,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({
      success: false,
      msg: "Could not Create the blog",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try{
    const blogs = await Blog.find({}).populate("user").populate('comments').populate("likes").exec()
    if(!blogs){
      return res.status(404).json({
        success:false,
        msg: 'Blogs not Found'
      })
    }
    return res.status(200).json({
      success: true,
      blogs
    })
  }
  catch(err){
    return res.status(500).json({
      success: false,
      msg: "Error while fetching blogs"
    })
  }
}

export const getBlogsByUser = async (req, res) => {
  try{
    const { userId } = req.params;
    const blogs = await Blog.find({user: userId}).populate("user").populate('comments').populate("likes").exec()
    if(!blogs){
      return res.status(404).json({
        success:false,
        msg: 'Blogs not Found'
      })
    }
    return res.status(200).json({
      success: true,
      blogs
    })
  }
  catch(err){
    return res.status(500).json({
      success: false,
      msg: "Error while fetching blogs"
    })
  }
}

export const getABlog = async (req, res) => {
  try{
    const {blogId} = req.params
    const blog = await Blog.findById({_id: blogId}).populate('comments').populate('likes').populate('user').exec()
    if(!blog){
      return res.status(404).json({
        success : false,
        msg: "Blog not found"
      })
    }
    return res.status(200).json({
      success: true,
      msg: "Blog fetched successfully",
      blog
    })
  }
  catch(err){
    console.log(err.message)
    return res.status(401).json({
      success: false,
      msg: "Error while getting blog"
    })
  }
}

export const updateBlog = async (req, res) => {
  try{
    const {blogId, userId, blogTitle, blogContent} = req.body;
    const blogImg = req.files.blogImg
    const blog = await Blog.findById(blogId);
    if(!blog){
      return res.status(404).json({
        success:false,
        msg: 'Blog not Found'
      })
    }
    if(blog.user !== userId){
      return res.status(401).json({
        success: false,
        msg: "You are not authorized to update this blog"
      })
    }
    const blogImgUrl = await uploadImgCloud(blogImg, "InkSpire")
    const updatedBlog = await Blog.findByIdAndUpdate({_id: blogId}, {blogTitle, blogContent, blogImg:blogImgUrl.secure_url}, {new: true})
    return res.status(200).json({
      success: true,
      msg: "Blog Updated Successfully",
      updatedBlog
    })
  }
  catch(err){
    return res.status(500).json({
      success: false,
      msg: "Error while updating blog"
    })
  }
}

export const deleteBlog = async (req, res) => {
  try{
    const {blogId, userId} = req.body
    const blog = await Blog.findById({_id: blogId})
    if(!blog){
      return res.status(404).json({
        success: false,
        msg: "Blog not found"
      })
    }
    if(blog.user !== userId){
      return res.status(401).json({
        success: false,
        msg: "You are not authorized to delete this blog"
      })
    }
    const deletedBlog = await Blog.findByIdAndDelete({_id: blogId})
    return res.status(200).json({
      success: true,
      msg: "Blog Deleted Successfully",
      deleteBlog
    })
  }
  catch(err){
    console.err(err.message)
    return res.status(400).json({
      success: false,
      msg: "Error while deleting blog"
    })
  }
}
