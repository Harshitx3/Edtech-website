const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const auth = require('../middleware/auth');

// @route   POST api/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/', auth, async (req, res) => {
    const {
        studentInfo,
        courseInfo,
        paymentInfo
    } = req.body;

    try {
        const newEnrollment = new Enrollment({
            user: req.user.id,
            studentInfo,
            courseInfo,
            paymentInfo
        });

        const enrollment = await newEnrollment.save();
        res.json({
            success: true,
            enrollmentId: enrollment.enrollmentId
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;