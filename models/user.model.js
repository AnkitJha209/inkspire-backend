import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    firstName : {
        type: String,
        required: true,
        maxLength: 16,
        minLength: 5
    },
    lastName : {
        type: String,
        required: true,
        maxLength: 16,
        minLength: 5
    },
    userName: {
        type: String,
        required: true,
        unique : true,
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    blogs : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    additionalDetails: {
        type : Schema.Types.ObjectId,
        ref : "Profile"
    },
    image : {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
},{timestamps: true})

export const User = mongoose.model('User', userSchema)