import User from '../models/userModel.js';
import createError from '../utils/error.js';
import sendMail from '../utils/sendMail.js';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import crypto from 'crypto';

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(createError(400, "All input fields are required"));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: 'default_id', // default public ID
                secure_url: 'https://example.com/default-avatar.png' // default URL
            }
        });

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "user_avatars",
                width: 250,
                crop: "fill"
            });
            user.avatar = {
                public_id: uploadResult.public_id,
                secure_url: uploadResult.secure_url
            };
            await fs.rm(req.file.path);
        }

        await user.save();
        const token = user.generateAuthToken(); // Assume this method exists and is synchronous
        res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 1 day
        res.status(201).json({ success: true, message: "User registered successfully", user: { id: user._id, name, email } });
    } catch (error) {
        next(createError(500, "Registration failed: " + error.message));
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(createError(400, "Email and password are required"));
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(createError(404, "User not found"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createError(401, "Invalid credentials"));
        }

        const token = user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 1 day
        res.status(200).json({ success: true, message: "Logged in successfully", user: { id: user._id, name: user.name, email } });
    } catch (error) {
        next(createError(500, "Login error: " + error.message));
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ success: true, message: "Successfully logged out" });
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        res.status(200).json({ success: true, message: "User profile fetched", user });
    } catch (error) {
        next(createError(500, "Fetching profile failed: " + error.message));
    }
};

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(createError(400, "Email is required for password reset"));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(404, "User with this email does not exist"));
        }

        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/password-reset/${resetToken}`;
        const message = `To reset your password, click on this link: ${resetUrl}. If you did not request a reset, please ignore this email.`;

        await sendMail({ to: email, subject: "Password Reset Link", text: message });
        res.status(200).json({ success: true, message: "Password reset link sent to " + email });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: false });
        next(createError(500, "Password reset email could not be sent: " + error.message));
    }
};

// More functions for password reset, profile update, etc. can be added here with similar error handling and structured response logic.
