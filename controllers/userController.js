const mongoose = require('mongoose');
const User = require('../models/User');

/* #swagger.tags = ['Users'] */
const getAllUsers = async (req, res) => {
  /* #swagger.summary = 'Retrieve all users' */
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('getAllUsers Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Users'] */
const createUser = async (req, res) => {
  /* #swagger.summary = 'Create a new user' */
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('createUser Error:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

/* #swagger.tags = ['Users'] */
const getSingleUser = async (req, res) => {
  /* #swagger.summary = 'Get a user by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('getSingleUser Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Users'] */
const updateUser = async (req, res) => {
  /* #swagger.summary = 'Update a user by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('updateUser Error:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid Data' });
  }
};

/* #swagger.tags = ['Users'] */
const deleteUser = async (req, res) => {
  /* #swagger.summary = 'Delete a user by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }

    const removedUser = await User.findByIdAndDelete(id);
    if (!removedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ user: removedUser, message: 'User deleted!' });
  } catch (err) {
    console.error('deleteUser Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getAllUsers, createUser, getSingleUser, updateUser, deleteUser };
