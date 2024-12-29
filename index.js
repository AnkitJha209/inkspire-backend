import express from "express";
import dotenv from 'dotenv'
import {authRouter} from "./routes/auth.route.js";
import {profileRouter} from "./routes/profile.route.js";
import { commentRouter } from "./routes/comment.route.js";
import { likeRouter } from "./routes/like.route.js";
import { blogRouter } from "./routes/blog.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import fileUpload from "express-fileupload";
import { connectDB } from "./configs/database.js";
import { cloudinaryConnect } from "./configs/cloudinary.js";
dotenv.config({
    path: './env'
})


const app = express()
const PORT = process.env.PORT || 4000;


// Connecting to database
connectDB();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", commentRouter);
app.use("/api/v1", likeRouter);
app.use("/api/v1", blogRouter);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

