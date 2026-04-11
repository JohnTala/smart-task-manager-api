const mongoose = require('mongoose');
const Comment = require('../models/Comment');

/* #swagger.tags = ['Comments'] */
const getAllComments = async (req, res) => {
  /* #swagger.summary = 'Retrieve all comments' */
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    console.error('getAllComments Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Comments'] */
const createComment = async (req, res) => {
  /* #swagger.summary = 'Create a new comment' */
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error('createComment Error:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

/* #swagger.tags = ['Comments'] */
const getSingleComment = async (req, res) => {
  /* #swagger.summary = 'Get a comment by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Comment ID' });
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (err) {
    console.error('getSingleComment Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Comments'] */
const updateComment = async (req, res) => {
  /* #swagger.summary = 'Update a comment by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Comment ID' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    console.error('updateComment Error:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

/* #swagger.tags = ['Comments'] */
const deleteComment = async (req, res) => {
  /* #swagger.summary = 'Delete a comment by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Comment ID' });
    }

    const removedComment = await Comment.findByIdAndDelete(id);
    if (!removedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ comment: removedComment, message: 'Comment deleted!' });
  } catch (err) {
    console.error('deleteComment Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllComments,
  createComment,
  getSingleComment,
  updateComment,
  deleteComment
};
