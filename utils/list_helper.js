const totalLikes = blogs => {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = blogs => {
    let favorite = { likes: -1 };
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog;
        }
    });
    return favorite;
};

const mostBlogs = blogs => {
    let blogsByAuthor = {};
    let most = {};
    let max = 0;
    blogs.forEach(blog => {
        if (!blogsByAuthor[blog.author]) {
            blogsByAuthor[blog.author] = {
                author: blog.author,
                blogs: 1
            };
        } else {
            blogsByAuthor[blog.author].blogs += 1;
        }

        if (blogsByAuthor[blog.author].blogs > max) {
            max = blogsByAuthor[blog.author].blogs;
            most = blogsByAuthor[blog.author];
        }
    });
    return most;
};

const mostLikes = blogs => {
    let blogsByAuthor = {};
    let most = {};
    let max = 0;
    blogs.forEach(blog => {
        if (!blogsByAuthor[blog.author]) {
            blogsByAuthor[blog.author] = {
                author: blog.author,
                likes: blog.likes
            };
        } else {
            blogsByAuthor[blog.author].likes += blog.likes;
        }

        if (blogsByAuthor[blog.author].likes > max) {
            max = blogsByAuthor[blog.author].likes;
            most = blogsByAuthor[blog.author];
        }
    });
    return most;
};

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};