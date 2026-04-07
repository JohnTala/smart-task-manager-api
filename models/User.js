
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },

  googleId: {
    type: String,
    required: [true, 'Google ID is required'],
    unique: true
  },

  photoUrl: {
    type: String,
    default: '',
    trim: true
  },

  serviceProvider: {
    type: String,
    default: 'google',
    trim: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);
