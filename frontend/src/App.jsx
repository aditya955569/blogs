import React, { useState, useRef } from 'react';
import { marked } from 'marked';
import axios from 'axios';
const App = () => {
  const [topic, setTopic] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [authorName,setAuthorName]=useState('');  
  const textareaRef = useRef(null);
  const handleSubmit = async () => {
    if (!topic.trim() || !blogContent.trim()) {
      alert('Please fill in both topic and content.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/blogs', {
        topic,
        content: blogContent,
        createdAt: new Date().toISOString(),
        authorName:authorName
      });

      if (response.status === 200 || response.status === 201) {
        alert('Blog uploaded successfully!');
        setTopic('');
        setBlogContent('');
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading blog.');
    }
  };

  // Function to insert markdown at cursor
  const insertMarkdown = (before, after = '') => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = blogContent.substring(start, end);
    const newText =
      blogContent.substring(0, start) +
      before +
      selectedText +
      after +
      blogContent.substring(end);

    setBlogContent(newText);

    // Focus back and move cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📝 Upload Blog</h1>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Topic</label>
        <input
          type="text"
          placeholder="Enter blog topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Tell your story</label>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <button onClick={() => insertMarkdown('**', '**')} style={styles.button}>Bold</button>
          <button onClick={() => insertMarkdown('*', '*')} style={styles.button}>Italic</button>
          <button onClick={() => insertMarkdown('- ')} style={styles.button}>Bullet</button>
          <button onClick={() => insertMarkdown('1. ')} style={styles.button}>Numbered</button>
          <button onClick={() => insertMarkdown('> ')} style={styles.button}>Quote</button>
          <button onClick={() => insertMarkdown('```\n', '\n```')} style={styles.button}>Code</button>
        </div>

        <textarea
          ref={textareaRef}
          placeholder="Write your blog here..."
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          style={styles.textarea}
        />
      </div>

      <div style={styles.previewContainer}>
        <h2 style={styles.previewHeading}>📄 Live Preview</h2>
        <div
          style={styles.preview}
          dangerouslySetInnerHTML={{ __html: marked(blogContent) }}
        />
      </div>
      <h1 style={styles.header}>Author Name</h1>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Author</label>
        <input
          type="text"
          placeholder="Enter Author's Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleSubmit} style={styles.uploadButton}>
        🚀 Upload Blog
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
    fontFamily: `'Segoe UI', sans-serif`,
  },
  header: {
    fontSize: '32px',
    marginBottom: '24px',
    textAlign: 'center',
    color: '#333',
  },
  fieldContainer: {
    marginBottom: '32px',
  },
  label: {
    display: 'block',
    fontSize: '20px',
    marginBottom: '8px',
    fontWeight: 600,
    color: '#222',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  toolbar: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '6px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    minHeight: '300px',
    padding: '18px',
    fontSize: '18px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    lineHeight: '1.6',
    resize: 'vertical',
    outline: 'none',
    caretColor: '#000',
    backgroundColor: '#fffefc',
    color: '#222',
    boxSizing: 'border-box',
  },
  previewContainer: {
    marginTop: '40px',
  },
  previewHeading: {
    fontSize: '24px',
    marginBottom: '12px',
    color: '#444',
  },
  preview: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    fontSize: '18px',
    lineHeight: '1.6',
  },
  uploadButton: {
    marginTop: '20px',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'block',
  },

};

export default App;
