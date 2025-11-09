const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Web Development', 'Data Science', 'Mobile Development', 'Design', 'Business', 'Marketing', 'AI/ML', 'Cybersecurity']
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: {
        type: String,
        default: ''
    },
    modules: [{
        title: String,
        description: String,
        lessons: [{
            title: String,
            content: String,
            videoUrl: String,
            duration: String,
            resources: [String]
        }],
        quiz: {
            questions: [{
                question: String,
                options: [String],
                correctAnswer: Number,
                explanation: String
            }],
            passingScore: { type: Number, default: 70 }
        }
    }],
    tags: [String],
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }],
    enrolledStudents: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        enrolledAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 }
    }],
    isPublished: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);