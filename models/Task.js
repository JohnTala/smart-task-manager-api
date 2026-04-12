const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,//this line establishes relationship with the User
    ref: 'User',
    required: [true, 'User ID is required']
  },

  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters']
  },

  description: {
    type: String,
    default: '',
    trim: true
  },

  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  dueDate: {
    type: Date
  }

}, {
  timestamps: true // auto adds createdAt & updatedAt
});

module.exports = mongoose.model('Task', TaskSchema);
