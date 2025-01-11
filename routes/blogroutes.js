const express = require('express');
const router = express.Router();
const postController = require('../controllers/blogcontroller');
const upload = require('../middlewares/multer');

router.get('/', postController.getAllPosts);
router.post('/', upload.single('featureImage'), postController.createPost);
router.put('/:id', upload.single('featureImage'), postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/:id', postController.getPostById);

module.exports = router;