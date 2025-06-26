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

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 1000
    },
    email: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required:true
        
    },
    location: {
        type: String,
        required: true
    },
    year: {
        type:String,
        required: true
    },
    resume:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Intern = mongoose.model('Interns', internSchema);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = {Blog,Intern};