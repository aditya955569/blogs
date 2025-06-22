const Blog=require('./db')
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://adityakandpal2016:Tckandpal123@cluster0.hidiazt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const app = express();

app.use(cors());
app.use(express.json());
app.post('/api/v1/blogs', async (req, res) => {
  try {
    const { topic, content, createdAt,authorName,imageURL } = req.body;

    if (!topic || !content) {
      return res.status(400).json({ error: 'Topic and content are required.' });
    }

    const blog = new Blog({
      title: topic,
      content,
      createdAt,
      authorName,
      imageURL
    });

    await blog.save();
    res.status(201).json({ message: 'Blog saved successfully!', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while saving blog' });
  }
});

// (Optional) Get all blogs
app.get('/api/v1/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

app.listen(3000);