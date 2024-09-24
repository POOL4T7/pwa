const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: '', // URL to the profile image
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'], // Different user roles
    default: 'user',
  },
  pushSubscription: {
    endpoint: {
      type: String,
      required: true,
    },
    keys: {
      p256dh: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        required: true,
      },
    },
  },
  notificationsEnabled: {
    type: Boolean,
    default: true, // User can enable or disable push notifications
  },
  devices: [
    {
      deviceId: { type: String, required: true }, // Unique device identifier
      deviceType: {
        type: String,
        enum: ['iOS', 'Android', 'Web'],
        required: true,
      },
      lastLogin: { type: Date, default: Date.now }, // Track the last login date for each device
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update 'updatedAt' on every document update
UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
