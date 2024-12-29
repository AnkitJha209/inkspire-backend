import { Profile } from "../models/profile.model.js";

export const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOne({ user: userId }).populate("user");
        if (!profile) {
            return res.status(404).json({
                success: false,
                msg: "Profile not found",
            });
        }
        return res.status(200).json({
            success: true,
            profile,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({
            success: false,
            msg: "Failed to get profile",
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { userId, bio, gender, socialMedia} = req.body;
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({
                success: false,
                msg: "Profile not found",
            });
        }
        await Profile.findByIdAndUpdate(profile._id, {bio, gender, socialMedia}, {new: true});
        return res.status(200).json({
            success: true,
            msg: "Profile updated",
        });
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).json({
            success: false,
            msg: "Failed to update profile",
        });
    }
}