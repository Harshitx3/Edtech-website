const express = require('express');
const Mentor = require('../models/Mentor');
const User = require('../models/User');

const router = express.Router();

// Get all mentors
router.get('/', async (req, res) => {
    try {
        const { expertise, availability, page = 1, limit = 12 } = req.query;
        
        let query = { isActive: true };
        
        // Expertise filter
        if (expertise) {
            query.expertise = { $in: [expertise] };
        }
        
        // Availability filter
        if (availability) {
            query.availability = availability;
        }
        
        const mentors = await Mentor.find(query)
            .populate('user', 'username profile.firstName profile.lastName profile.avatar')
            .populate('courses', 'title category')
            .sort({ rating: -1, createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Mentor.countDocuments(query);
        
        res.json({
            mentors,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single mentor
router.get('/:id', async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id)
            .populate('user', 'username profile.firstName profile.lastName profile.avatar profile.bio')
            .populate('courses', 'title description category difficulty duration rating')
            .populate('reviews.student', 'username profile.firstName profile.lastName profile.avatar');
        
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        
        res.json(mentor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get mentor expertise areas
router.get('/expertise/list', async (req, res) => {
    try {
        const expertise = await Mentor.distinct('expertise');
        res.json(expertise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Connect with mentor
router.post('/:id/connect', async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        
        // Here you would implement the connection logic
        // This could involve creating a connection request, sending an email, etc.
        
        res.json({ message: 'Connection request sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;