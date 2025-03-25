import { useState, useEffect } from 'react';

const useBlog = (initialBlogId = null) => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single blog by ID
  const fetchBlogById = async (blogId) => {
    if (!blogId) return;
    
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/blogs/${blogId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      const data = await response.json();
      setCurrentBlog(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new blog
  const createBlog = async (blogData) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      
      const newBlog = await response.json();
      setBlogs(prevBlogs => [...prevBlogs, newBlog]);
      return newBlog;
    } catch (err) {
      setError(err.message);
      console.error('Error creating blog:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing blog
  const updateBlog = async (blogId, blogData) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update blog');
      }
      
      const updatedBlog = await response.json();
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => blog.id === blogId ? updatedBlog : blog)
      );
      
      if (currentBlog && currentBlog.id === blogId) {
        setCurrentBlog(updatedBlog);
      }
      
      return updatedBlog;
    } catch (err) {
      setError(err.message);
      console.error('Error updating blog:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (blogId) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
      
      if (currentBlog && currentBlog.id === blogId) {
        setCurrentBlog(null);
      }
      
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting blog:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchBlogs();
    if (initialBlogId) {
      fetchBlogById(initialBlogId);
    }
  }, [initialBlogId]);

  return {
    blogs,
    currentBlog,
    loading,
    error,
    fetchBlogs,
    fetchBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    setCurrentBlog
  };
};

export default useBlog;
