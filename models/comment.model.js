import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        maxLength: 400,
    },
    likes: [{
        type: Number,
        default: 0,
    }]
},{timestamps: true})  

export const Comment = mongoose.model('Comment', commentSchema)