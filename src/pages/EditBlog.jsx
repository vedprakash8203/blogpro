import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BlogForm from '../components/blog/BlogForm';
import Alert from '../components/common/Alert';
import Loader from '../components/common/Loader';
import { getBlogById, updateBlog } from '../services/blogService';
import useAuth from '../hooks/useAuth';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        
        // Check if the user is the author of the blog
        if (response.data.authorId !== user._id) {
          navigate('/');
          return;
        }
        
        setBlog(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load blog. It may have been removed or you do not have permission to edit it.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const response = await updateBlog(id, formData);
      
      if (response.status === 'success') {
        navigate(`/blog/${id}`, { 
          state: { message: 'Blog updated successfully!' } 
        });
      } else {
        throw new Error(response.message || 'Failed to update blog');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while updating the blog. Please try again.');
      throw err;
    }
  };

  if (loading) return (
    <Layout>
      <Loader />
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Alert type="error" message={error} />
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Blog</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <BlogForm 
              initialData={blog} 
              onSubmit={handleSubmit} 
              buttonText="Update Blog" 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditBlog;
