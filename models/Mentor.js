const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expertise: [{
        type: String,
        required: true
    }],
    experience: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    socialLinks: {
        linkedin: String,
        twitter: String,
        github: String,
        website: String
    },
    availability: {
        type: String,
        enum: ['Available', 'Busy', 'Unavailable'],
        default: 'Available'
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    reviews: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    hourlyRate: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);