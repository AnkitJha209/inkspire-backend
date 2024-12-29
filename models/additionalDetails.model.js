import mongoose, {Schema} from "mongoose";

const additionalDetailsSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    profilePic : {
        type: String,
    },
    bio : {
        type: String,
    },
    gender:{
        type: String,
        enum: ['male','femaile','other']
    },
    socialMedia : {
        facebook : {
            type: String,
        },
        twitter : {
            type: String,
        },
        linkedIn : {
            type: String,
        },
        instagram : {
            type: String,
        },
    }
},{timestamps: true});