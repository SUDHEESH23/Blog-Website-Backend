const express = require('express');
const router = express.Router();
const { validateBlogInput } = require('../middleware/validationMiddleware');
const authenticate = require('../middleware/authMiddleware');

const Blog = require('../models/Blog');

// Get all blogs
router.get('/', authenticate, async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ blogs });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch blogs" });
    }
});

// Create a new blog
router.post('/', authenticate, validateBlogInput, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = await Blog.create({ title, content, author: req.user.id });
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (err) {
        res.status(500).json({ message: "Failed to create blog" });
    }
});

// Get blog by author ID
router.get('/:authorId', authenticate, async (req, res) => {
    const authorId = req.params.authorId;
    try {
        const blog = await Blog.findOne({ author: authorId });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ authorId, blog });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch blog" });
    }
});


module.exports = router;
