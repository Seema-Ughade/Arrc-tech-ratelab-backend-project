const Category = require('../models/category')

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon
  })

  try {
    const newCategory = await category.save()
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' })
    }

    if (req.body.name != null) {
      category.name = req.body.name
    }
    if (req.body.icon != null) {
      category.icon = req.body.icon
    }

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.toggleStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' })
    }

    category.status = category.status === 'Enable' ? 'Disable' : 'Enable'

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' })
    }

    await category.remove()
    res.json({ message: 'Deleted Category' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

