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
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active',
  },
  // pushSubscription: {
  //   endpoint: {
  //     type: String,
  //     required: true,
  //   },
  //   keys: {
  //     p256dh: {
  //       type: String,
  //       required: true,
  //     },
  //     auth: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // },
  fcmToken: { type: String, default: '' },
});

// Create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
