const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        required: true
    },
    author: {
        type: String,
        minlength: 1,
        required: true
    },
    url: {
        type: String,
        minlength: 1,
        required: true
    },
    likes: {
        type: Number,
        minlength: 1,
        required: false,
        default: 0
    },
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);