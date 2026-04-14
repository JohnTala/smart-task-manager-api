const router = require('express').Router();
const Task = require('../models/Task');
const Comment = require('../models/Comment');

const authCheck = (req, res, next) => {
  if (!req.user) return res.redirect('/auth/login');
  next();
};

router.get('/', authCheck, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
      .populate('userId', 'username')
      .populate('category', 'name');

    const comments = await Comment.find({ user: req.user._id })
      .populate('task', 'title description')
      .populate('user', 'username');

    res.render('profile', {
      user: req.user,
      tasks,
      comments,
    });
  } catch (err) {
    console.error('[PROFILE ERROR]:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
