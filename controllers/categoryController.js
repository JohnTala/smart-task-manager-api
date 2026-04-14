const mongoose = require('mongoose');
const Category = require('../models/Category');

/* #swagger.tags = ['Categories'] */
const getAllCategories = async (req, res) => {
  /* #swagger.summary = 'Retrieve all categories' */
  try {
    const categories = await Category.find()
      .populate('user', 'username');

    res.status(200).json(categories);
  } catch (err) {
    console.error('getAllCategories Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Categories'] */
const createCategory = async (req, res) => {
  /* #swagger.summary = 'Create a new category' */
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error('createCategory Error:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

/* #swagger.tags = ['Categories'] */
const getSingleCategory = async (req, res) => {
  /* #swagger.summary = 'Get a category by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Category ID' });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error('getSingleCategory Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* #swagger.tags = ['Categories'] */
const updateCategory = async (req, res) => {
  /* #swagger.summary = 'Update a category by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Category ID' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('updateCategory Error:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

/* #swagger.tags = ['Categories'] */
const deleteCategory = async (req, res) => {
  /* #swagger.summary = 'Delete a category by ID' */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Category ID' });
    }

    const removedCategory = await Category.findByIdAndDelete(id);

    if (!removedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({
      category: removedCategory,
      message: 'Category deleted!'
    });

  } catch (err) {
    console.error('deleteCategory Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory
};
