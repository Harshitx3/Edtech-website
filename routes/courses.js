const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all courses with search and filters
router.get('/', async (req, res) => {
    try {
        const { search, category, difficulty, page = 1, limit = 12 } = req.query;
        
        let query = { isPublished: true };
        
        // Search functionality
        if (search) {
            query.$text = { $search: search };
        }
        
        // Category filter
        if (category) {
            query.category = category;
        }
        
        // Difficulty filter
        if (difficulty) {
            query.difficulty = difficulty;
        }
        
        const courses = await Course.find(query)
            .populate('instructor', 'username profile.firstName profile.lastName')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Course.countDocuments(query);
        
        res.json({
            courses,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single course
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'username profile.firstName profile.lastName profile.bio')
            .populate('reviews.user', 'username profile.firstName profile.lastName');
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        const user = await User.findById(req.user.userId);
        
        // Check if already enrolled
        const alreadyEnrolled = user.enrolledCourses.some(
            enrollment => enrollment.courseId.toString() === req.params.id
        );
        
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }
        
        // Add to enrolled courses
        user.enrolledCourses.push({
            courseId: course._id,
            progress: 0
        });
        
        // Add to course enrolled students
        course.enrolledStudents.push({
            user: user._id,
            enrolledAt: new Date()
        });
        
        await user.save();
        await course.save();
        
        res.json({ message: 'Successfully enrolled in course' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get course categories
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await Course.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;