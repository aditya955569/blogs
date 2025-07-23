import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditBlog from './EditBlog';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState();
    const [loading, setLoading] = useState(true);
    async function fetchData() {
        try {
            const response = await axios.get("https://blogs-ooi1.onrender.com/api/v1/blogs");
            console.log(response);
            setBlogs(response.data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteBlog(id) {
        try {
            const response = await axios.delete(`https://blogs-ooi1.onrender.com/api/v1/blogs/${id}`);
            alert("Blog deleted successfully!")
            setBlogs();
            fetchData();
        } catch (error) {
            alert("Failed to delete blog");
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            {!blogs ? <>Loading.....</> :

                <>

                    <button onClick={() => {
                        navigate('/addBlog')
                    }}>Add Blog</button>
                    {blogs.map((blog, id) => {
                        const maxLength = 100; // max content characters to display
                        const trimmedContent = blog.content.length > maxLength
                            ? blog.content.slice(0, maxLength) + "..."
                            : blog.content;

                        return (
                            <div
                                key={blog._id}
                                className="card"
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '16px',
                                    margin: '12px 0',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{blog.title}</h2>
                                <p style={{ fontSize: '14px', color: '#555' }}>{trimmedContent}</p>
                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>By: {blog.authorName}</p>
                                <button style={{ fontSize: '20px', marginBottom: '8px' }} onClick={() => {
                                    navigate(`/editBlog/${blog._id}`, { state: blog });
                                }}>Edit</button>
                                <button style={{ fontSize: '20px', marginBottom: '8px' }} onClick={() => deleteBlog(blog._id)}>Delete Blog</button>
                            </div>
                        );
                    })}


                </>}
        </div>
    )
}

export default AllBlogs