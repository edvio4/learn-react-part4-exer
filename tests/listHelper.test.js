const listHelper = require('../utils/list_helper');

describe('total like', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
});

describe('favorite blog', () => {
    const blogs = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        },
        {
            title: 'Test 2',
            author: 'Author 2',
            likes: 8
        }
    ];

    test('should return blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual(blogs[1]);
    });
});

describe('most blogs', () => {
    const blogs = [
        { author: 'Edsger W. Dijkstra' },
        { author: 'Edsger W. Dijkstra' },
        { author: 'Author 2' }
    ];

    test('should return author object with most blogs', () => {
        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2
        });
    });
});

describe('most likes', () => {
    const blogs = [
        { author: 'Edsger W. Dijkstra', likes: 2 },
        { author: 'Edsger W. Dijkstra', likes: 20 },
        { author: 'Author 2', likes: 10 }
    ];

    test('should return author object with most blogs', () => {
        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 22
        });
    });
});