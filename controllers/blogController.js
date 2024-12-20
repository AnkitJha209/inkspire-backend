import { Blog } from "../models/blog.model";
import { User } from "../models/user.model";

export const createBlog = async (req, res) => {
  try {
    const { blogTitle, blogImg, blogContent, user } = req.body;
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

    const blog = await Blog.create({
      blogTitle,
      blogContent,
      blogImg,
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
