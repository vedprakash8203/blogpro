import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BlogForm from '../components/blog/BlogForm';
import Alert from '../components/common/Alert';
import { createBlog } from '../services/blogService';
import useAuth from '../hooks/useAuth';

const CreateBlog = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (formData) => {
    try {
      // Add authorId to the blog data
      const blogData = {
        ...formData,
        authorId: user._id,
      };
      
      const response = await createBlog(blogData);
      
      if (response.status === 'success') {
        navigate(`/blog/${response.data._id}`, { 
          state: { message: 'Blog created successfully!' } 
        });
      } else {
        throw new Error(response.message || 'Failed to create blog');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while creating the blog. Please try again.');
      throw err; // Re-throw to let the form component handle the error state
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog</h1>
        
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <BlogForm onSubmit={handleSubmit} buttonText="Create Blog" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
