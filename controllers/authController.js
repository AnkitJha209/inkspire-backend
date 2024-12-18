import jwt from "jsonwebtoken";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        success: false,
        message: "No email found",
      });
    }
    let otp = Math.floor(Math.floor() * 1000000 + 99999);

    let data = await Otp.create({
      email,
      otp,
    });
    return res.status(200).json({
      success: true,
      message: "Otp Sent Successfully",
      data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(402).json({
      success: false,
      message: "Error while sending otp",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      otp,
      role,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !otp ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.status(403).json({
        success: false,
        message: "Please Fill All the Details",
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match Confirm Password",
      });
    }
    const dbOtp = Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (dbOtp.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "OTP Not Found",
      });
    } else if (otp !== dbOtp[0].otp) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Otp",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashPass,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({
      success: false,
      message: "Error while Signing up",
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Details are neccessary",
      });
    }
    let user = User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expires: Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User Signed In successfully",
        data: user,
      });
    } else {
      return res.status(402).json({
        success: false,
        msg: "Password Does not match",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({
      success: false,
      message: "Failed to Login",
    });
  }
};
