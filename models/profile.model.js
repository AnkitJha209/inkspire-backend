import mongoose, {Schema} from "mongoose";

const profileSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: "User"
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

export const Profile = mongoose.model('Profile', profileSchema)