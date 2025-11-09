require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve all static files from root directory

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edtech', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const mentorRoutes = require('./routes/mentors');
const enrollmentRoutes = require('./routes/enrollment');
const dashboardRoutes = require('./routes/dashboard');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/enroll', enrollmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'courses.html'));
});

app.get('/mentors', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'mentors.html'));
});

app.get('/testimonials', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'testimonials.html'));
});

// Serve new courses page
app.get('/courses-new', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'courses-new.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'contact.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

app.get('/sign', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'sign.html'));
});

app.get('/join', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'join.html'));
});

app.get('/enroll', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'enroll.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});