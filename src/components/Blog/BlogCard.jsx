import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Truncate blog body for preview
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{truncateText(blog.body)}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags && blog.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Category: <span className="font-medium">{blog.category}</span>
          </span>
          <Link 
            to={`/blog/${blog._id}`} 
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
