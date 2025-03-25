import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import BlogList from '../components/Blog/BlogList';
import TagsFilter from '../components/Blog/TagsFilter';

const Home = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to BlogHub</h1>
          <p className="text-gray-600 text-lg">
            Discover amazing stories, insights, and knowledge from writers around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TagsFilter onFilterChange={handleFilterChange} initialFilters={filters} />
          </div>
          <div className="lg:col-span-3">
            <BlogList filters={filters} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
