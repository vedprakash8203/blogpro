import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BlogDetailComponent from '../components/blog/BlogDetail';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
import { getBlogById, deleteBlog } from '../services/blogService';
import Modal from '../components/common/Modal';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to load blog. It may have been removed or you do not have permission to view it.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteBlog(id);
      navigate('/', { state: { message: 'Blog deleted successfully' } });
    } catch (err) {
      setError('Failed to delete blog. Please try again.');
      setShowDeleteModal(false);
      console.error(err);
    } finally {
      setDeleteLoading(false);
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
        <BlogDetailComponent 
          blog={blog} 
          onDelete={() => setShowDeleteModal(true)} 
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          title="Delete Blog"
          content="Are you sure you want to delete this blog? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={deleteLoading}
        />
      )}
    </Layout>
  );
};

export default BlogDetailPage;
