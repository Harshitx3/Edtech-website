const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'India' }
    }
  },
  courseInfo: {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    coursePrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  paymentInfo: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'net_banking'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentDate: Date
  },
  enrollmentStatus: {
    type: String,
    enum: ['active', 'completed', 'cancelled', 'refunded'],
    default: 'active'
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  completionDate: Date,
  certificateIssued: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Index for faster queries
enrollmentSchema.index({ 'studentInfo.email': 1, 'courseInfo.courseId': 1 });
enrollmentSchema.index({ 'paymentInfo.paymentStatus': 1 });
enrollmentSchema.index({ 'enrollmentStatus': 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);