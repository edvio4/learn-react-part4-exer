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

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

    response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;