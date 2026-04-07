const Task = require('../models/Task');

/* #swagger.tags = ['Tasks'] */
const getAllTasks = async (req, res) => {
  /* #swagger.summary = 'Retrieve all tasks' */
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Tasks'] */
const createTask = async (req, res) => {
  /* #swagger.summary = 'Create a new task' */
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

/* #swagger.tags = ['Tasks'] */
const getSingleTask = async (req, res) => {
  /* #swagger.summary = 'Get a task by ID' */
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Tasks'] */
const updateTask = async (req, res) => {
  /* #swagger.summary = 'Update a task by ID' */
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'No task found!' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false, message: err.message || 'Invalid Data' });
  }
};

/* #swagger.tags = ['Tasks'] */
const deleteTask = async (req, res) => {
  /* #swagger.summary = 'Delete a task by ID' */
  try {
    const id = req.params.id;
    const removedTask = await Task.findByIdAndDelete(id);
    if (!removedTask) {
      res.status(400).json({ success: false, message: 'No task found' });
    } else {
      res.status(200).json({ task: removedTask, message: 'Task deleted!' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'No valid data' });
  }
};

module.exports = { getAllTasks, createTask, getSingleTask, updateTask, deleteTask };
