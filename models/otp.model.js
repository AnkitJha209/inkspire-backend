import mongoose, {Schema} from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import { verificationTemplate } from "../mailTemplate/verficationTemplate.js";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp : {
        type: String,
        required: true,
    },
    createdAt : {
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
})

async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = await mailSender(email, 'Verfication Email', verificationTemplate(otp))
        console.log(mailResponse) 
    } catch (error) {
        console.log("Error while sending verification email")
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp)
    next();
})

export const Otp = mongoose.model('Otp', otpSchema)