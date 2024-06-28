import { model, Schema } from 'mongoose';

const lectureSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Lecture title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Lecture description is required'],
        maxLength: [1000, 'Description should not exceed 1000 characters'],
        trim: true
    },
    resource: {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true }
    }
}, { _id: false });

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        minLength: [10, 'Course title must be at least 10 characters'],
        maxLength: [100, 'Course title should not exceed 100 characters'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        minLength: [50, 'Course description must be at least 50 characters'],
        maxLength: [500, 'Course description should not exceed 500 characters'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: ['Technology', 'Business', 'Art', 'Science'], // Enum to ensure the category is one of the predefined options
        trim: true
    },
    thumbnail: {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true }
    },
    lectures: [lectureSchema],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator of the course is required']
    }
}, { timestamps: true });

const Course = model('Course', courseSchema);

export default Course;
