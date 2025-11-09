const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['student', 'mentor', 'admin'],
        default: 'student'
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
        skills: [String],
        interests: [String]
    },
    enrolledCourses: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        progress: { type: Number, default: 0 },
        enrolledAt: { type: Date, default: Date.now }
    }],
    completedCourses: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        completedAt: { type: Date, default: Date.now }
    }],
    badges: [{
        name: String,
        description: String,
        earnedAt: { type: Date, default: Date.now }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);