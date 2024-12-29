import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({
    path: './env'
})

export const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.transporter({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        let info = await transporter.sendMail({
            from: 'InkSpire - Ankit Jha',
            to: email,
            subject: title,
            html: body
        })

        console.log("Email Info : ", info)
        return info
    }catch(err){
        console.log('Error While Sending Mail ', err.message)
    }
}