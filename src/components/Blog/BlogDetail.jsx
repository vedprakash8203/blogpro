import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const BlogDetail = ({ blog, onDelete }) => {
  const { user } = useAuth();
  const isAuthor = user && blog.authorId === user._id;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
        
        <div className="flex items-center text-gray-500 mb-6">
          <span>Published: {formatDate(blog.createdAt)}</span>
          {blog.createdAt !== blog.updatedAt && (
            <span className="ml-4">Updated: {formatDate(blog.updatedAt)}</span>
          )}
        </div>
        
        <div className="prose max-w-none mb-6">
          {blog.body.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags && blog.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div>
            <span className="text-sm text-gray-500">
              Category: <span className="font-medium">{blog.category}</span>
            </span>
            {blog.subcategory && blog.subcategory.length > 0 && (
              <span className="text-sm text-gray-500 ml-4">
                Subcategories: 
                <span className="font-medium">
                  {blog.subcategory.join(', ')}
                </span>
              </span>
            )}
          </div>
          
          {isAuthor && (
            <div className="flex space-x-3">
              <Link 
                to={`/edit-blog/${blog._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>
              <button 
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
