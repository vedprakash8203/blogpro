import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
import { getAllBlogs, deleteBlog } from '../services/blogService';
import useAuth from '../hooks/useAuth';
import Modal from '../components/common/Modal';

const Dashboard = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        setLoading(true);
        const response = await getAllBlogs({ authorId: user._id });
        setBlogs(response.data || []);
      } catch (err) {
        setError('Failed to load your blogs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [user._id]);

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteBlog(blogToDelete._id);
      
      // Update the blogs list
      setBlogs(blogs.filter(blog => blog._id !== blogToDelete._id));
      setSuccessMessage('Blog deleted successfully');
      
      // Reset state
      setBlogToDelete(null);
    } catch (err) {
      setError('Failed to delete blog. Please try again.');
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setBlogToDelete(null);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
          <Link
            to="/create-blog"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Create New Blog
          </Link>
        </div>

        {successMessage && (
          <Alert 
            type="success" 
            message={successMessage} 
            onClose={() => setSuccessMessage('')} 
          />
        )}
        
        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError('')} 
          />
        )}

        {loading ? (
          <Loader />
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">You haven't created any blogs yet.</p>
            <Link
                           to="/create-blog"
                           className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
                         >
                           Create Your First Blog
                         </Link>
                       </div>
                     ) : (
                       <div className="bg-white rounded-lg shadow-md overflow-hidden">
                         <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                             <tr>
                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Title
                               </th>
                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Category
                               </th>
                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Created At
                               </th>
                               <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Actions
                               </th>
                             </tr>
                           </thead>
                           <tbody className="bg-white divide-y divide-gray-200">
                             {blogs.map((blog) => (
                               <tr key={blog._id} className="hover:bg-gray-50">
                                 <td className="px-6 py-4 whitespace-nowrap">
                                   <div className="text-sm font-medium text-gray-900">
                                     {blog.title}
                                   </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                   <div className="text-sm text-gray-500">{blog.category}</div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                   <div className="text-sm text-gray-500">
                                     {new Date(blog.createdAt).toLocaleDateString()}
                                   </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                   <Link
                                     to={`/blog/${blog._id}`}
                                     className="text-blue-600 hover:text-blue-900 mr-4"
                                   >
                                     View
                                   </Link>
                                   <Link
                                     to={`/edit-blog/${blog._id}`}
                                     className="text-indigo-600 hover:text-indigo-900 mr-4"
                                   >
                                     Edit
                                   </Link>
                                   <button
                                     onClick={() => handleDeleteClick(blog)}
                                     className="text-red-600 hover:text-red-900"
                                   >
                                     Delete
                                   </button>
                                 </td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     )}
                   </div>
             
                   {/* Delete Confirmation Modal */}
                   {blogToDelete && (
                     <Modal
                       title="Delete Blog"
                       content={`Are you sure you want to delete "${blogToDelete.title}"? This action cannot be undone.`}
                       confirmText="Delete"
                       cancelText="Cancel"
                       onConfirm={confirmDelete}
                       onCancel={cancelDelete}
                       isLoading={deleteLoading}
                     />
                   )}
                 </Layout>
               );
             };
             
             export default Dashboard;
             




             