import Course from '../models/courseModel.js';
import createError from '../utils/error.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import { myCache } from '../app.js';

// Helper function to handle empty fields
const checkRequiredFields = (fields, required) => {
    return required.every(field => fields[field]);
}

// Get all courses from cache or database
export const getAllCourses = async (req, res, next) => {
    try {
        let courses = myCache.get("courses");
        if (!courses) {
            courses = await Course.find({}).select('-lectures');
            if (!courses.length) return next(createError(404, "No courses found"));
            myCache.set("courses", JSON.stringify(courses));
        } else {
            courses = JSON.parse(courses);
        }
        res.status(200).json({ success: true, message: "All courses fetched successfully", courses });
    } catch (error) {
        next(createError(500, error.message));
    }
}

// Create a new course
export const createCourse = async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!checkRequiredFields(req.body, ['title', 'description', 'category', 'createdBy'])) {
        return next(createError(400, "Please enter all required input fields"));
    }

    const newCourse = new Course({ title, description, category, createdBy });

    try {
        await newCourse.validate();
        const response = await handleImageUpload(req.file);
        Object.assign(newCourse.thumbnail, response);
        await newCourse.save();
        myCache.del("courses");
        res.status(201).json({ success: true, message: "Course created successfully", newCourse });
    } catch (error) {
        next(createError(500, error.message));
    }
}

// Utility function for handling image uploads
const handleImageUpload = async (file) => {
    if (!file) return {};
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'image',
            folder: 'lms'
        });
        await fs.rm(`uploads/${file.filename}`);
        return { public_id: result.public_id, secure_url: result.secure_url };
    } catch (error) {
        throw new Error(error.message || "File upload failed");
    }
}

// Further implementations for update, delete, and lecture management...

