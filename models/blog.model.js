import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    blogTitle: {
        type: String,
        required: true
    },
    blogImg: {
        type: String,
    },
    blogContent: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: "Like"
        }
    ]
    
},{timestamps: true})

export const Blog = mongoose.model("Blog",blogSchema)