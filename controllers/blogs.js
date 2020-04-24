const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});

    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.author || !request.body.url) {
        response.status(400).end();
    } else {
        const blog = new Blog(request.body);

        const createdBlog = await blog.save();

        response.status(201).json(createdBlog);
    }
});

module.exports = blogsRouter;