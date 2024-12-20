import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path: './env'
})
export const authorization = async (req, res) => {
    try{
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "")
        console.log(token)
        if(!token){
            return res.status(500).json({
                success: false,
                msg: "Token Missing"
            })
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload)
            req.user = payload;
        } catch (error) {
            console.log(error.message)
            return res.status(401).json({
                success: false,
                msg: "Token is Invalid"
            })
        }
        next();
     } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            msg: "Error while authorization"
        })
     }
}

export const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(500).json({
                success: false,
                msg: "This is a protected route for Admins only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "User Role cannot be verified"
        })
    }
}

 

export const isUser = async (req, res, next) => {
    try {
        if(req.user.role !== "user"){
            return res.status(500).json({
                success: false,
                msg: "This is a protected route for User only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "User Role cannot be verified"
        })
    }
}