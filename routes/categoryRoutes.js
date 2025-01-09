const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getCategories)
router.post('/', categoryController.createCategory)
router.put('/:id', categoryController.updateCategory)
router.patch('/:id/toggle-status', categoryController.toggleStatus)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router

