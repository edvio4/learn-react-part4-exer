const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

describe('get all blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('a specific blog is within the returned blogs with id', async () => {
        const response = await api.get('/api/blogs');

        const titles = response.body.map(r => r.title);

        expect(titles).toContain(helper.initialBlogs[1].title);
        expect(response.body[0].id).toBeDefined();
    });
});

describe('create a blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Test title 3',
            author: 'Test author 3',
            url: 'http://www.testurl23.com',
            likes: 0
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = await helper.blogsInDb();

        const titles = blogs.map(n => n.title);

        expect(blogs).toHaveLength(helper.initialBlogs.length+1);
        expect(titles).toContain(newBlog.title);
    });

    test('a blog without likes defaults to zero likes', async () => {
        const newBlog = {
            title: 'Test title 3',
            author: 'Test author 3',
            url: 'http://www.testurl23.com'
        };

        const result = await api
            .post('/api/blogs')
            .send(newBlog);

        expect(result.body.likes).toBe(0);
    });

    test('a blog without a title can\'t be added', async () => {
        const newBlog = {
            author: 'Test author 3',
            url: 'http://www.testurl23.com'
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400);
    });

    test('a blog without a author can\'t be added', async () => {
        const newBlog = {
            title: 'Test title 3',
            url: 'http://www.testurl23.com'
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400);
    });

    test('a blog without a url can\'t be added', async () => {
        const newBlog = {
            author: 'Test author 3',
            title: 'Test title 3'
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400);
    });
});

describe('delete a blog', () => {
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        );

        const titles = blogsAtEnd.map(r => r.title);

        expect(titles).not.toContain(blogToDelete.title);
    });
});

describe('update a blog', () => {
    test('a blog\'s likes can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb();
        let blogToUpdate = blogsAtStart[0];
        blogToUpdate.likes += 10;
        const updatedLikes = blogToUpdate.likes;

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200);

        const blogs = await helper.blogsInDb();
        const updatedBlog = blogs.find(blog => blog.id === blogToUpdate.id);

        expect(updatedBlog.likes).toBe(updatedLikes);
    });
});

afterAll(() => {
    mongoose.connection.close();
});