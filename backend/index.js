const { Blog, Intern, Advocate, OurAdvocates } = require('./db')
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://adityakandpal2016:Tckandpal123@cluster0.hidiazt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const app = express();

app.use(cors());
app.use(express.json());
app.post('/api/v1/blogs', async (req, res) => {
  try {
    const { topic, content, createdAt, authorName, imageURL } = req.body;

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

app.put('/api/v1/blogs/', async (req, res) => {
  try {
    const { topic, content, authorName, imageURL, id } = req.body;

    if (!topic || !content) {
      return res.status(400).json({ error: 'Topic and content are required.' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: topic,
        content,
        authorName,
        imageURL,
      },
      { new: true } // return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    res.status(200).json({ message: 'Blog updated successfully!', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Server error while updating blog' });
  }
});

app.delete('/api/v1/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    res.status(200).json({ message: 'Blog deleted successfully!', blog: deletedBlog });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Server error while deleting blog' });
  }
});

app.get('/api/v1/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});



//interns api
app.post('/api/v1/interns', async (req, res) => {
  try {
    const { name, email, college, location, year, resume } = req.body;
    const intern = new Intern({
      name,
      email,
      college,
      location,
      year,
      resume
    });

    await intern.save();
    res.status(201).json({ message: 'Intern data saved successfully!', intern });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while saving intern data' });
  }
})
app.get('/api/v1/interns', async (req, res) => {
  const intern = await Intern.find().sort({ createdAt: -1 });
  res.json(intern);
});

//advocates

app.post('/api/v1/advocates', async (req, res) => {
  try {
    const { name, phoneNumber, email, pincode, bcrn, district, domain } = req.body;
    const advocate = new Advocate({
      name, phoneNumber, email, pincode, bcrn, district, domain
    });

    await advocate.save();
    res.status(201).json({ message: 'Advocate data saved successfully!', advocate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while saving advocate data' });
  }
})
app.get('/api/v1/advocates', async (req, res) => {
  const advocate = await Advocate.find().sort({ createdAt: -1 });
  res.json(advocate);
});

//get all our advocates

app.post('/api/v1/companyAdvocates', async (req, res) => {
  try {
    const { name, domain, imageURL, experience } = req.body;
    const ourAdvocate = new OurAdvocates({
      name, domain, imageURL, experience
    });

    await ourAdvocate.save();
    res.status(201).json({ message: 'Advocate data saved successfully!', ourAdvocate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while saving advocate data' });
  }
})
app.get('/api/v1/companyAdvocates', async (req, res) => {
  const advocate = await OurAdvocates.find().sort({ createdAt: -1 });
  console.log(advocate)
  res.json(advocate);
});
app.put('/api/v1/companyAdvocates/', async (req, res) => {
  try {
    const { name, domain, imageURL, experience,id } = req.body;

    const ourAdvocate = await OurAdvocates.findByIdAndUpdate(
      id,
      {
        name, 
        domain, 
        imageURL, 
        experience
      },
      { new: true } // return the updated document
    );

    if (!ourAdvocate) {
      return res.status(404).json({ error: 'Advocate details not found.' });
    }

    res.status(200).json({ message: 'Advocate details updated successfully!', advocate: ourAdvocate });
  } catch (error) {
    console.error('Error updating Advocate Details:', error);
    res.status(500).json({ error: 'Server error while updating Advocate details' });
  }
});
app.delete('/api/v1/companyAdvocates/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdvocate = await OurAdvocates.findByIdAndDelete(id);

    if (!deletedAdvocate) {
      return res.status(404).json({ error: 'Advocate not found.' });
    }

    res.status(200).json({ message: 'Advocate deleted successfully!', advocate: deletedAdvocate });
  } catch (error) {
    console.error('Error deleting advocate:', error);
    res.status(500).json({ error: 'Server error while deleting advocate' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

app.listen(3000);