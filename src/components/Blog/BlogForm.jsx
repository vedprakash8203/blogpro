import React, { useState } from 'react';

const BlogForm = ({ initialData = {}, onSubmit, buttonText = "Submit" }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    body: initialData.body || '',
    category: initialData.category || '',
    tags: initialData.tags ? initialData.tags.join(', ') : '',
    subcategory: initialData.subcategory ? initialData.subcategory.join(', ') : '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Process tags and subcategories into arrays
      const processedData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        subcategory: formData.subcategory.split(',').map(sub => sub.trim()).filter(sub => sub),
      };
      
      await onSubmit(processedData);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        form: error.message || 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.form}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          rows="10"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.body ? 'border-red-500' : 'border-gray-300'
          }`}
        ></textarea>
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. technology, programming, web development"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
    Subcategories (comma separated)
  </label>
  <input
    type="text"
    id="subcategory"
    name="subcategory"
    value={formData.subcategory}
    onChange={handleChange}
    placeholder="e.g. react, javascript, frontend"
    className="w-full px-3 py-2 border border-gray-300 rounded-md"
  />
</div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;