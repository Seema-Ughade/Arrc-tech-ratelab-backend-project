const Post = require('../models/blogmodel');
const cloudinary = require('../config/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, description, source, tags } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Feature image is required' });
    }

    const fileUri = getDataUri(req.file);
    const result = await cloudinary.uploader.upload(fileUri.content);

    const newPost = new Post({
      title,
      description,
      featureImage: result.secure_url,
      source,
      tags: tags.split(',').map(tag => tag.trim()),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description, source, tags } = req.body;
    const updates = {
      title,
      description,
      source,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const result = await cloudinary.uploader.upload(fileUri.content);
      updates.featureImage = result.secure_url;
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete image from Cloudinary
    const publicId = post.featureImage.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};