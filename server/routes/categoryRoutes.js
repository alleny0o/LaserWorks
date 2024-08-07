// Backend (category.js)
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../models/Category.js';

const router = express.Router();

// Create Category
const createCategory = expressAsyncHandler(async (req, res) => {
  const { name, slug } = req.body;

  const categoryExists = await Category.findOne({ $or: [{ name }, { slug }] });

  if (categoryExists) {
    res.status(400);
    throw new Error('Category with this name or slug already exists.');
  }

  const category = await Category.create({ name, slug });
  res.status(201).json(category);
});

// Update Category
const updateCategory = expressAsyncHandler(async (req, res) => {
  const { name, slug } = req.body;
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  category.name = name || category.name;
  category.slug = slug || category.slug;

  const updatedCategory = await category.save();
  res.status(200).json(updatedCategory);
});

// Delete Category
const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json({ message: 'Category removed' });
});

// Get Specific Category
const getCategory = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json(category);
});

// Get All Categories
const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

router.route('/').post(createCategory).get(getCategories);
router.route('/:categoryId').get(getCategory).put(updateCategory).delete(deleteCategory);

export default router;