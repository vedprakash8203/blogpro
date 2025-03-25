import apiRequest from './api';
import { getToken } from './authService';

export const getAllBlogs = async (filters = {}) => {
  let queryString = '';
  
  if (Object.keys(filters).length > 0) {
    queryString = '?' + new URLSearchParams(filters).toString();
  }
  
  return await apiRequest(`/blogs${queryString}`);
};

export const getBlogById = async (id) => {
  return await apiRequest(`/blogs/${id}`);
};

export const createBlog = async (blogData) => {
  const token = getToken();
  return await apiRequest('/blogs', 'POST', blogData, token);
};

export const updateBlog = async (id, blogData) => {
  const token = getToken();
  return await apiRequest(`/blogs/${id}`, 'PUT', blogData, token);
};

export const deleteBlog = async (id) => {
  const token = getToken();
  return await apiRequest(`/blogs/${id}`, 'DELETE', null, token);
};

export const deleteAuthorBlogs = async (authorId) => {
  const token = getToken();
  return await apiRequest(`/blogs?authorId=${authorId}`, 'DELETE', null, token);
};
