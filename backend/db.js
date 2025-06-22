// backend/db.js
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 1000
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    authorName: {
        type: String,
        required: true
    },
    imageURL: {
        type:String,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;